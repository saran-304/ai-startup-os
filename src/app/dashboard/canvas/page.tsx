'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';
import { AIService } from '@/services/ai-service';
import { GhostProtocol } from '@/services/ghost-protocol';
import { FileText, Sparkles, Loader2, Save, Download, Plus, X } from 'lucide-react';

interface CanvasData {
  valueProposition: string;
  customerSegments: string[];
  channels: string[];
  customerRelationships: string[];
  revenueStreams: string[];
  keyResources: string[];
  keyActivities: string[];
  keyPartnerships: string[];
  costStructure: string[];
}

export default function BusinessCanvasPage() {
  const { user } = useAuth();
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [canvas, setCanvas] = useState<CanvasData | null>(null);
  const [editing, setEditing] = useState(false);

  const handleGenerate = async () => {
    if (!idea.trim() || !user) return;

    try {
      setLoading(true);
      const aiService = new AIService(
        user.uid,
        process.env.NEXT_PUBLIC_AI_API_KEY || '',
        process.env.AI_MODEL || 'gemini-pro'
      );

      const generatedCanvas = await aiService.generateBusinessCanvas(idea);
      setCanvas(generatedCanvas);

      // Store as memory
      const ghostProtocol = new GhostProtocol(user.uid);
      await ghostProtocol.addMemory('document', `Business Model Canvas for: ${idea}`, {
        type: 'business_canvas',
        data: generatedCanvas,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error generating canvas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!canvas || !user) return;

    try {
      const ghostProtocol = new GhostProtocol(user.uid);
      await ghostProtocol.addMemory('document', 'Updated Business Model Canvas', {
        type: 'business_canvas',
        data: canvas,
        timestamp: new Date().toISOString(),
      });
      setEditing(false);
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
  };

  const updateArrayField = (field: keyof CanvasData, index: number, value: string) => {
    if (!canvas) return;
    setCanvas({
      ...canvas,
      [field]: Array.isArray(canvas[field])?canvas[field].map((item, i) => (i === index ? value : item)):canvas[field],
    });
  };

  const addArrayItem = (field: keyof CanvasData) => {
    if (!canvas) return;
    setCanvas({
      ...canvas,
      [field]: [...canvas[field], ''],
    });
  };

  const removeArrayItem = (field: keyof CanvasData, index: number) => {
    if (!canvas) return;
    setCanvas({
      ...canvas,
      [field]: canvas[field].filter((_, i) => i !== index),
    });
  };

  const ArrayInput = ({
    label,
    field,
    items,
  }: {
    label: string;
    field: keyof CanvasData;
    items: string[];
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => updateArrayField(field, index, e.target.value)}
              disabled={!editing}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {editing && items.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(field, index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {editing && (
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(field)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Business Model Canvas</h1>
          <p className="text-muted-foreground">
            Create and manage your business model with AI assistance
          </p>
        </div>
        {canvas && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(!editing)}>
              {editing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
            {editing && (
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        )}
      </div>

      {!canvas ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generate Business Model Canvas
            </CardTitle>
            <CardDescription>
              Enter your startup idea and AI will generate a complete business model canvas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idea">Your Startup Idea</Label>
                <textarea
                  id="idea"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe your startup idea..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button onClick={handleGenerate} disabled={loading || !idea.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Canvas
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {/* Value Proposition */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Value Proposition</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={canvas.valueProposition}
                onChange={(e) => setCanvas({ ...canvas, valueProposition: e.target.value })}
                disabled={!editing}
              />
            </CardContent>
          </Card>

          {/* Customer Segments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput
                label="Customer Segments"
                field="customerSegments"
                items={canvas.customerSegments}
              />
            </CardContent>
          </Card>

          {/* Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput label="Channels" field="channels" items={canvas.channels} />
            </CardContent>
          </Card>

          {/* Customer Relationships */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput
                label="Relationships"
                field="customerRelationships"
                items={canvas.customerRelationships}
              />
            </CardContent>
          </Card>

          {/* Revenue Streams */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput
                label="Revenue Streams"
                field="revenueStreams"
                items={canvas.revenueStreams}
              />
            </CardContent>
          </Card>

          {/* Key Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput label="Resources" field="keyResources" items={canvas.keyResources} />
            </CardContent>
          </Card>

          {/* Key Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput label="Activities" field="keyActivities" items={canvas.keyActivities} />
            </CardContent>
          </Card>

          {/* Key Partnerships */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Partnerships</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput
                label="Partnerships"
                field="keyPartnerships"
                items={canvas.keyPartnerships}
              />
            </CardContent>
          </Card>

          {/* Cost Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cost Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <ArrayInput label="Costs" field="costStructure" items={canvas.costStructure} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
