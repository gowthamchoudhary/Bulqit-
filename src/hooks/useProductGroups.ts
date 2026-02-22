import { useState, useEffect } from 'react';
import { ProductGroup } from '@/types/productGroup';
import { mockProductGroups } from '@/data/mockProductGroups';

const STORAGE_KEY = 'bulkbridge_product_groups';
const USER_GROUPS_KEY = 'bulkbridge_user_groups';

export function useProductGroups() {
  const [groups, setGroups] = useState<ProductGroup[]>([]);
  const [userGroupIds, setUserGroupIds] = useState<string[]>([]);

  // Load groups from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setGroups(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load groups:', e);
        setGroups(mockProductGroups);
      }
    } else {
      // Initialize with mock data
      setGroups(mockProductGroups);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProductGroups));
    }

    // Load user's joined groups
    const userGroups = localStorage.getItem(USER_GROUPS_KEY);
    if (userGroups) {
      try {
        setUserGroupIds(JSON.parse(userGroups));
      } catch (e) {
        console.error('Failed to load user groups:', e);
      }
    }
  }, []);

  // Save groups to localStorage whenever they change
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    }
  }, [groups]);

  // Save user groups whenever they change
  useEffect(() => {
    localStorage.setItem(USER_GROUPS_KEY, JSON.stringify(userGroupIds));
  }, [userGroupIds]);

  const updateGroup = (groupId: string, updates: Partial<ProductGroup>) => {
    setGroups(prev =>
      prev.map(g => g.id === groupId ? { ...g, ...updates } : g)
    );
  };

  const joinGroup = (groupId: string, userId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return false;

    // Update group
    updateGroup(groupId, {
      currentMembers: group.currentMembers + 1,
      spotsLeft: group.spotsLeft - 1,
      memberIds: [...group.memberIds, userId],
      isAlmostFull: group.spotsLeft - 1 <= 5,
    });

    // Update user's groups
    setUserGroupIds(prev => [...prev, groupId]);

    return true;
  };

  const leaveGroup = (groupId: string, userId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return false;

    // Update group
    updateGroup(groupId, {
      currentMembers: group.currentMembers - 1,
      spotsLeft: group.spotsLeft + 1,
      memberIds: group.memberIds.filter(id => id !== userId),
      isAlmostFull: group.spotsLeft + 1 <= 5,
    });

    // Update user's groups
    setUserGroupIds(prev => prev.filter(id => id !== groupId));

    return true;
  };

  const getGroupById = (groupId: string) => {
    return groups.find(g => g.id === groupId);
  };

  const getUserGroups = () => {
    return groups.filter(g => userGroupIds.includes(g.id));
  };

  const getAvailableGroups = (storeType?: string) => {
    if (!storeType) return groups;
    return groups.filter(g => g.category === storeType && g.spotsLeft > 0);
  };

  const isUserInGroup = (groupId: string) => {
    return userGroupIds.includes(groupId);
  };

  return {
    groups,
    userGroupIds,
    joinGroup,
    leaveGroup,
    updateGroup,
    getGroupById,
    getUserGroups,
    getAvailableGroups,
    isUserInGroup,
  };
}
