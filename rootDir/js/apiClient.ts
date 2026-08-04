import { User } from './types.js';
export async function fetchUser(id: number) {
  const response = await fetch(`https://example.com${id}`);
  if (!response.ok) throw new Error('HTTP Error');
  return response.json() as Promise<User>;
}
