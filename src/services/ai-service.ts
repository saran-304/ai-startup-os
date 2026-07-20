import { GhostProtocol } from './ghost-protocol';

interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  content: string;
  memoriesUsed: string[];
}

export class AIService {
  private ghostProtocol: GhostProtocol;
  private apiKey: string;
  private model: string;

  constructor(userId: string, apiKey: string, model: string = 'gemini-pro') {
    this.ghostProtocol = new GhostProtocol(userId);
    this.apiKey = apiKey;
    this.model = model;
  }

  async chat(userMessage: string, conversationHistory: AIMessage[] = []): Promise<AIResponse> {
    try {
      // Step 1: Retrieve relevant memories using RAG pattern
      const relevantMemories = await this.retrieveRelevantMemories(userMessage);

      // Step 2: Build context from memories
      const memoryContext = this.buildMemoryContext(relevantMemories);

      // Step 3: Construct system prompt with context
      const systemPrompt = this.buildSystemPrompt(memoryContext);

      // Step 4: Call AI API with context
      const aiResponse = await this.callAI(userMessage, conversationHistory, systemPrompt);

      // Step 5: Store conversation as memory
      await this.ghostProtocol.addMemory('conversation', userMessage, {
        type: 'user_message',
        timestamp: new Date().toISOString(),
      });

      await this.ghostProtocol.addMemory('conversation', aiResponse, {
        type: 'ai_response',
        timestamp: new Date().toISOString(),
        memoriesUsed: relevantMemories.map((m) => m.id),
      });

      return {
        content: aiResponse,
        memoriesUsed: relevantMemories.map((m) => m.id),
      };
    } catch (error) {
      console.error('Error in AI chat:', error);
      throw error;
    }
  }

  private async retrieveRelevantMemories(query: string): Promise<any[]> {
    try {
      // Search for relevant memories
      const searchResults = await this.ghostProtocol.searchMemories(query);

      // Get recent memories (last 20)
      const recentMemories = await this.ghostProtocol.getAllMemories();
      const last20 = recentMemories.slice(0, 20);

      // Combine and deduplicate
      const combined = [...searchResults, ...last20];
      const unique = combined.filter(
        (memory, index, self) => index === self.findIndex((m) => m.id === memory.id)
      );

      // Return top 10 most relevant
      return unique.slice(0, 10);
    } catch (error) {
      console.error('Error retrieving relevant memories:', error);
      return [];
    }
  }

  private buildMemoryContext(memories: any[]): string {
    if (memories.length === 0) {
      return 'No relevant memories found.';
    }

    const contextParts = memories.map((memory) => {
      const date = new Date(memory.createdAt).toLocaleDateString();
      return `[${date}] ${memory.type.toUpperCase()}: ${memory.content}`;
    });

    return `Relevant memories from the founder's journey:\n${contextParts.join('\n')}`;
  }

  private buildSystemPrompt(memoryContext: string): string {
    return `You are an AI startup advisor helping founders build their companies. You have access to the founder's complete journey through Ghost Protocol - their ideas, pivots, customer interviews, mentor advice, investor meetings, and all previous conversations.

${memoryContext}

Use this context to provide personalized, relevant advice. Always consider:
1. The founder's current stage and progress
2. Previous decisions and their outcomes
3. Advice they've received from mentors
4. Market validation they've done
5. Their goals and challenges

Be concise, actionable, and supportive. When appropriate, reference specific memories or past decisions to show you understand their journey.`;
  }

  private async callAI(
    userMessage: string,
    conversationHistory: AIMessage[],
    systemPrompt: string
  ): Promise<string> {
    try {
      // Using Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `${systemPrompt}\n\nUser: ${userMessage}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`AI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling AI API:', error);
      throw error;
    }
  }

  async validateIdea(idea: string): Promise<{
    problemScore: number;
    marketScore: number;
    competitionScore: number;
    riskScore: number;
    opportunityScore: number;
    overallScore: number;
    analysis: string;
    recommendations: string[];
  }> {
    try {
      const prompt = `Analyze this startup idea and provide scores (0-100) for:
1. Problem Score - How significant is the problem being solved?
2. Market Score - How large and growing is the target market?
3. Competition Score - How competitive is the space (lower is better)?
4. Risk Score - What are the main risks (lower is better)?
5. Opportunity Score - What's the overall opportunity?

Idea: ${idea}

Provide your response in JSON format with these exact keys: problemScore, marketScore, competitionScore, riskScore, opportunityScore, overallScore, analysis (string), recommendations (array of strings).`;

      const response = await this.callAI(prompt, [], 'You are a startup idea validator. Provide objective, data-driven analysis.');

      // Parse the JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback if JSON parsing fails
      return {
        problemScore: 70,
        marketScore: 65,
        competitionScore: 60,
        riskScore: 50,
        opportunityScore: 70,
        overallScore: 65,
        analysis: response,
        recommendations: ['Conduct customer interviews', 'Analyze competitors', 'Validate market size'],
      };
    } catch (error) {
      console.error('Error validating idea:', error);
      throw error;
    }
  }

  async generateBusinessCanvas(idea: string): Promise<{
    valueProposition: string;
    customerSegments: string[];
    channels: string[];
    customerRelationships: string[];
    revenueStreams: string[];
    keyResources: string[];
    keyActivities: string[];
    keyPartnerships: string[];
    costStructure: string[];
  }> {
    try {
      const prompt = `Generate a Business Model Canvas for this startup idea. Provide:
1. Value Proposition
2. Customer Segments (array)
3. Channels (array)
4. Customer Relationships (array)
5. Revenue Streams (array)
6. Key Resources (array)
7. Key Activities (array)
8. Key Partnerships (array)
9. Cost Structure (array)

Idea: ${idea}

Provide your response in JSON format.`;

      const response = await this.callAI(prompt, [], 'You are a business model expert. Create comprehensive business model canvases.');

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback
      return {
        valueProposition: response,
        customerSegments: ['Early adopters', 'Tech enthusiasts'],
        channels: ['Direct sales', 'Online marketing'],
        customerRelationships: ['Self-service', 'Community'],
        revenueStreams: ['Subscription', 'Freemium'],
        keyResources: ['Technology', 'Team'],
        keyActivities: ['Development', 'Marketing'],
        keyPartnerships: ['Technology partners', 'Distributors'],
        costStructure: ['Development', 'Marketing', 'Operations'],
      };
    } catch (error) {
      console.error('Error generating business canvas:', error);
      throw error;
    }
  }

  async generateRoadmap(idea: string, timeline: string = '6 months'): Promise<{
    milestones: Array<{
      title: string;
      description: string;
      deadline: string;
      priority: 'high' | 'medium' | 'low';
    }>;
  }> {
    try {
      const prompt = `Generate a ${timeline} startup roadmap for this idea. Break it down into milestones with:
1. Title
2. Description
3. Estimated deadline
4. Priority (high/medium/low)

Idea: ${idea}

Provide your response in JSON format with a "milestones" array.`;

      const response = await this.callAI(prompt, [], 'You are a startup planning expert. Create realistic, actionable roadmaps.');

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback
      return {
        milestones: [
          {
            title: 'Market Validation',
            description: 'Conduct customer interviews and validate problem',
            deadline: 'Month 1',
            priority: 'high',
          },
          {
            title: 'MVP Development',
            description: 'Build minimum viable product',
            deadline: 'Month 3',
            priority: 'high',
          },
          {
            title: 'Launch',
            description: 'Launch product to early adopters',
            deadline: 'Month 6',
            priority: 'high',
          },
        ],
      };
    } catch (error) {
      console.error('Error generating roadmap:', error);
      throw error;
    }
  }
}
