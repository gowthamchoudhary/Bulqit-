import { useState, useEffect } from 'react';
import { BuyingGroup } from '@/types/retailer';

const STORAGE_KEY = 'bulkbridge_groups';

export function useGroups() {
  const [groups, setGroups] = useState<BuyingGroup[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setGroups(parsed);
        } else {
          console.error('Invalid groups data in localStorage, clearing');
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.error('Failed to load groups:', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever groups change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  }, [groups]);

  const addGroup = (group: BuyingGroup) => {
    setGroups(prev => [...prev, group]);
  };

  const updateGroup = (groupId: string, updates: Partial<BuyingGroup>) => {
    setGroups(prev =>
      prev.map(g => g.id === groupId ? { ...g, ...updates } : g)
    );
  };

  const deleteGroup = (groupId: string) => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
  };

  const getGroupById = (groupId: string) => {
    return groups.find(g => g.id === groupId);
  };

  const getUserGroups = (retailerId: string) => {
    return groups.filter(g =>
      g.members.some(m => m.retailerId === retailerId)
    );
  };

  return {
    groups,
    addGroup,
    updateGroup,
    deleteGroup,
    getGroupById,
    getUserGroups,
  };
}
