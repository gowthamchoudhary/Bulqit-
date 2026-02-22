import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useProductGroups } from './useProductGroups';

const STORAGE_KEY = 'bulkbridge_product_groups';
const USER_GROUPS_KEY = 'bulkbridge_user_groups';

describe('useProductGroups', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_GROUPS_KEY);
  });

  it('joins pg_001 for r1 and exposes membership/user groups', () => {
    const { result } = renderHook(() => useProductGroups());

    act(() => {
      const ok = result.current.joinGroup('pg_001', 'r1');
      expect(ok).toBe(true);
    });

    expect(result.current.isUserInGroup('pg_001')).toBe(true);

    const userGroups = result.current.getUserGroups();
    expect(userGroups.length).toBe(1);
    expect(userGroups[0].id).toBe('pg_001');
    expect(userGroups[0].memberIds).toContain('r1');
  });
});
