import { ProductGroup } from '@/types/productGroup';
import { Retailer } from '@/types/retailer';

export interface JoinGroupResult {
  success: boolean;
  message: string;
  updatedGroup?: ProductGroup;
}

/**
 * Join a product group
 */
export function joinProductGroup(
  group: ProductGroup,
  retailer: Retailer
): JoinGroupResult {
  // Validation checks
  if (group.spotsLeft <= 0) {
    return {
      success: false,
      message: 'This group is already full',
    };
  }

  if (group.memberIds.includes(retailer.id)) {
    return {
      success: false,
      message: 'You are already a member of this group',
    };
  }

  // Check if retailer sells this category
  const hasMatchingCategory = retailer.storeType === group.category;
  if (!hasMatchingCategory) {
    return {
      success: false,
      message: `This group is for ${group.category} stores. Your store type is ${retailer.storeType}`,
    };
  }

  // Add member to group
  const updatedGroup: ProductGroup = {
    ...group,
    currentMembers: group.currentMembers + 1,
    spotsLeft: group.spotsLeft - 1,
    memberIds: [...group.memberIds, retailer.id],
    isAlmostFull: group.spotsLeft - 1 <= 5,
  };

  return {
    success: true,
    message: `Successfully joined ${group.productName} Group!`,
    updatedGroup,
  };
}

/**
 * Leave a product group
 */
export function leaveProductGroup(
  group: ProductGroup,
  retailerId: string
): JoinGroupResult {
  if (!group.memberIds.includes(retailerId)) {
    return {
      success: false,
      message: 'You are not a member of this group',
    };
  }

  const updatedGroup: ProductGroup = {
    ...group,
    currentMembers: group.currentMembers - 1,
    spotsLeft: group.spotsLeft + 1,
    memberIds: group.memberIds.filter(id => id !== retailerId),
    isAlmostFull: group.spotsLeft + 1 <= 5,
  };

  return {
    success: true,
    message: `Left ${group.productName} Group`,
    updatedGroup,
  };
}

/**
 * Check if user can join group
 */
export function canJoinGroup(group: ProductGroup, retailer: Retailer): {
  canJoin: boolean;
  reason?: string;
} {
  if (group.spotsLeft <= 0) {
    return { canJoin: false, reason: 'Group is full' };
  }

  if (group.memberIds.includes(retailer.id)) {
    return { canJoin: false, reason: 'Already a member' };
  }

  if (retailer.storeType !== group.category) {
    return { canJoin: false, reason: 'Wrong store type' };
  }

  return { canJoin: true };
}

/**
 * Get urgency badge for group
 */
export function getGroupUrgencyBadge(group: ProductGroup): {
  text: string;
  color: 'red' | 'yellow' | 'green' | 'blue';
} | null {
  if (group.spotsLeft <= 2) {
    return {
      text: `Only ${group.spotsLeft} spots left!`,
      color: 'red',
    };
  }

  if (group.spotsLeft <= 5) {
    return {
      text: `${group.spotsLeft} spots left`,
      color: 'yellow',
    };
  }

  if (group.isNewGroup) {
    return {
      text: '\u{1F195} New Group',
      color: 'blue',
    };
  }

  return null;
}

/**
 * Format next order date
 */
export function formatNextOrderDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`;
  } else {
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  }
}

