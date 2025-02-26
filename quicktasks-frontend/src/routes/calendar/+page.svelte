<script lang="ts">
    import { onMount } from "svelte";
    import type { Task } from "$lib/types";
    import TaskCalendar from "./TaskCalendar.svelte";

    let tasks: Task[] = [];


    onMount(async () => {
        try {
            const response = await fetch("http://localhost:3000/tasks"); 
            if (!response.ok) throw new Error("Error fetching tasks");
            tasks = await response.json();
            tasks = [...tasks];
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    });


    async function addTask(date: Date) {
		try {
			const response = await fetch(`http://localhost:3000/tasks`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title: "New Task", userId: 1, dueDate: date }),
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`API Error: ${errorText}`);
			}
			const newTask :Task = await response.json();
			tasks = [...tasks, newTask];
		} catch (error) {
			console.error("Error adding task:", error);
		}
	}

    function updateTask(id: number, newDate: Date) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, dueDate: newDate } : task
        );
    }
</script>

<TaskCalendar {tasks} 
on:addTask={e => addTask(e.detail)}
on:updateTask={e => updateTask(e.detail.id, e.detail.newDate)}/>
