// src/utilities/storage.ts
import { z } from 'zod';

// Type for storage items
type StorageItem = string | number | boolean | object | null;

// Type for storage events
type StorageListener = (key: string, newValue: any, oldValue: any) => void;

class LocalStorageUtil {
  private static listeners: Map<string, Set<StorageListener>> = new Map();

  /**
   * Set item in localStorage with validation
   */
  static async set(key: string, value: StorageItem): Promise<void> {
    try {
      const oldValue = await this.get(key);
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      localStorage.setItem(key, stringValue);
      
      // Notify listeners
      this.notifyListeners(key, value, oldValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }

  /**
   * Get item from localStorage with type validation
   */
  static async get<T extends StorageItem>(key: string, schema?: z.ZodType<T>): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      
      if (item === null) return null;

      // Try to parse JSON if it looks like JSON
      let parsed: T;
      try {
        parsed = JSON.parse(item);
      } catch {
        parsed = item as T;
      }

      // Validate with schema if provided
      if (schema) {
        return schema.parse(parsed);
      }

      return parsed;
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  static async remove(key: string): Promise<void> {
    try {
      const oldValue = await this.get(key);
      localStorage.removeItem(key);
      
      // Notify listeners
      this.notifyListeners(key, null, oldValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }

  /**
   * Clear all items from localStorage
   */
  static async clear(): Promise<void> {
    try {
      localStorage.clear();
      
      // Notify all listeners
      this.listeners.forEach((listeners, key) => {
        this.notifyListeners(key, null, this.get(key));
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if key exists in localStorage
   */
  static async has(key: string): Promise<boolean> {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Subscribe to changes for a specific key
   */
  static subscribe(key: string, listener: StorageListener): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    
    this.listeners.get(key)?.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.get(key)?.delete(listener);
      if (this.listeners.get(key)?.size === 0) {
        this.listeners.delete(key);
      }
    };
  }

  /**
   * Notify listeners of changes
   */
  private static notifyListeners(key: string, newValue: any, oldValue: any): void {
    this.listeners.get(key)?.forEach(listener => {
      listener(key, newValue, oldValue);
    });
  }
}

export default LocalStorageUtil;