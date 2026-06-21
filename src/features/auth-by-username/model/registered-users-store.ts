const STORAGE_KEY = 'show_business_registered_users';

interface StoredUser {
  username: string;
  passwordHash: string;
  email: string;
  id: number;
}

async function hashPassword(password: string): Promise<string> {
  const encoded = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export async function saveRegisteredCredentials(credentials: {
  username: string;
  password: string;
  email: string;
  id: number;
}): Promise<void> {
  const users = loadUsers();
  const passwordHash = await hashPassword(credentials.password);
  users.push({
    username: credentials.username,
    passwordHash,
    email: credentials.email,
    id: credentials.id,
  });
  saveUsers(users);
}

export async function findRegisteredUser(
  username: string,
  password: string,
): Promise<StoredUser | undefined> {
  const users = loadUsers();
  const passwordHash = await hashPassword(password);
  return users.find((u) => u.username === username && u.passwordHash === passwordHash);
}
