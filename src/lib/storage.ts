import { z } from 'zod';
import { Retailer, BuyingGroup, GeneratedEmail } from '@/types/retailer';

const KEYS = {
  USER: 'bulkbridge_user',
  GROUPS: 'bulkbridge_groups',
  EMAILS: 'bulkbridge_emails',
};

// Zod schemas for runtime validation
const RetailerSchema = z.object({
  id: z.string(),
  storeName: z.string(),
  storeType: z.enum(['Medical', 'Kirana', 'Restaurant', 'Stationery', 'Electronics']),
  location: z.object({
    address: z.string(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }),
  }),
  products: z.array(z.string()),
  monthlyBudget: z.number(),
  phone: z.string(),
  joinedDate: z.string(),
  languagePreference: z.string().optional(),
}).passthrough();

const BuyingGroupMemberSchema = z.object({
  retailerId: z.string(),
  storeName: z.string(),
  joinedAt: z.string(),
}).passthrough();

const BuyingGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  products: z.array(z.string()),
  members: z.array(BuyingGroupMemberSchema),
  createdAt: z.string(),
}).passthrough();

const GeneratedEmailSchema = z.object({
  id: z.string(),
  subject: z.string(),
  body: z.string(),
  createdAt: z.string(),
}).passthrough();

function safeParse<T>(key: string, schema: z.ZodType<T>, raw: string | null): T | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return schema.parse(parsed);
  } catch (e) {
    console.error(`Invalid data in localStorage key "${key}", clearing:`, e);
    localStorage.removeItem(key);
    return null;
  }
}

function safeParseArray<T>(key: string, schema: z.ZodType<T>, raw: string | null): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(key);
      return [];
    }
    return parsed
      .map((item: unknown) => {
        try { return schema.parse(item); }
        catch { return null; }
      })
      .filter((item: T | null): item is T => item !== null);
  } catch (e) {
    console.error(`Invalid data in localStorage key "${key}", clearing:`, e);
    localStorage.removeItem(key);
    return [];
  }
}

export function saveUser(user: Retailer) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function getUser(): Retailer | null {
  return safeParse(KEYS.USER, RetailerSchema, localStorage.getItem(KEYS.USER)) as unknown as Retailer | null;
}

export function clearUser() {
  localStorage.removeItem(KEYS.USER);
}

export function saveGroup(group: BuyingGroup) {
  const groups = getGroups();
  groups.push(group);
  localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
}

export function getGroups(): BuyingGroup[] {
  return safeParseArray(KEYS.GROUPS, BuyingGroupSchema, localStorage.getItem(KEYS.GROUPS)) as unknown as BuyingGroup[];
}

export function saveEmail(email: GeneratedEmail) {
  const emails = getEmails();
  emails.push(email);
  localStorage.setItem(KEYS.EMAILS, JSON.stringify(emails));
}

export function getEmails(): GeneratedEmail[] {
  return safeParseArray(KEYS.EMAILS, GeneratedEmailSchema, localStorage.getItem(KEYS.EMAILS)) as unknown as GeneratedEmail[];
}
