import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { GhostMemory, MemoryType } from '@/types';

const COLLECTION_NAME = 'ghost_memories';

export class GhostProtocol {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async addMemory(
    type: MemoryType,
    content: string,
    metadata?: Record<string, any>,
    tags: string[] = []
  ): Promise<string> {
    try {
      const memoryData = {
        userId: this.userId,
        type,
        content,
        metadata: metadata || {},
        tags,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), memoryData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding memory:', error);
      throw error;
    }
  }

  async updateMemory(
    memoryId: string,
    updates: Partial<Pick<GhostMemory, 'content' | 'metadata' | 'tags'>>
  ): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, memoryId), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating memory:', error);
      throw error;
    }
  }

  async deleteMemory(memoryId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, memoryId));
    } catch (error) {
      console.error('Error deleting memory:', error);
      throw error;
    }
  }

  async getMemory(memoryId: string): Promise<GhostMemory | null> {
    try {
      const docSnap = await getDoc(doc(db, COLLECTION_NAME, memoryId));
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          userId: data.userId,
          type: data.type,
          content: data.content,
          metadata: data.metadata,
          tags: data.tags,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting memory:', error);
      throw error;
    }
  }

  async getAllMemories(): Promise<GhostMemory[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', this.userId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          type: data.type,
          content: data.content,
          metadata: data.metadata,
          tags: data.tags,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
    } catch (error) {
      console.error('Error getting all memories:', error);
      throw error;
    }
  }

  async getMemoriesByType(type: MemoryType): Promise<GhostMemory[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', this.userId),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          type: data.type,
          content: data.content,
          metadata: data.metadata,
          tags: data.tags,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
    } catch (error) {
      console.error('Error getting memories by type:', error);
      throw error;
    }
  }

  async searchMemories(queryText: string): Promise<GhostMemory[]> {
    try {
      // Simple text search - in production, this would use vector embeddings
      const allMemories = await this.getAllMemories();
      const lowerQuery = queryText.toLowerCase();

      return allMemories.filter(
        (memory) =>
          memory.content.toLowerCase().includes(lowerQuery) ||
          memory.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          JSON.stringify(memory.metadata).toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching memories:', error);
      throw error;
    }
  }

  async getMemoriesByTag(tag: string): Promise<GhostMemory[]> {
    try {
      const allMemories = await this.getAllMemories();
      return allMemories.filter((memory) =>
        memory.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    } catch (error) {
      console.error('Error getting memories by tag:', error);
      throw error;
    }
  }

  async getMemorySummary(): Promise<{
    total: number;
    byType: Record<MemoryType, number>;
    recentMemories: GhostMemory[];
  }> {
    try {
      const allMemories = await this.getAllMemories();
      const byType: Record<MemoryType, number> = {} as Record<MemoryType, number>;

      allMemories.forEach((memory) => {
        byType[memory.type] = (byType[memory.type] || 0) + 1;
      });

      return {
        total: allMemories.length,
        byType,
        recentMemories: allMemories.slice(0, 5),
      };
    } catch (error) {
      console.error('Error getting memory summary:', error);
      throw error;
    }
  }
}
