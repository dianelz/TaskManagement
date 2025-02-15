import { writable } from 'svelte/store';
import type { Task } from '$lib/types'; // Assure-toi que types.ts existe

export const tasks = writable<Task[]>([]);