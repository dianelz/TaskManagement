import { writable } from 'svelte/store';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const user = writable<User | null>(null);

export function setUser(userData: User) {
  user.set(userData);
}

export function clearUser() {
  user.set(null);
  localStorage.removeItem('token');
}
