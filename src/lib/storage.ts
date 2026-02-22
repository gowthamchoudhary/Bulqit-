import { Retailer, BuyingGroup, GeneratedEmail } from '@/types/retailer';

const KEYS = {
  USER: 'bulkbridge_user',
  GROUPS: 'bulkbridge_groups',
  EMAILS: 'bulkbridge_emails',
};

export function saveUser(user: Retailer) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function getUser(): Retailer | null {
  const data = localStorage.getItem(KEYS.USER);
  return data ? JSON.parse(data) : null;
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
  const data = localStorage.getItem(KEYS.GROUPS);
  return data ? JSON.parse(data) : [];
}

export function saveEmail(email: GeneratedEmail) {
  const emails = getEmails();
  emails.push(email);
  localStorage.setItem(KEYS.EMAILS, JSON.stringify(emails));
}

export function getEmails(): GeneratedEmail[] {
  const data = localStorage.getItem(KEYS.EMAILS);
  return data ? JSON.parse(data) : [];
}
