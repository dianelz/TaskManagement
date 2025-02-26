<script lang="ts">
	import FullCalendar, { Draggable, type CalendarApi } from 'svelte-fullcalendar';
	import daygridPlugin from '@fullcalendar/daygrid';
	import timegridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import type { Task } from '$lib/types';
    import "../../app.css";
    import { createEventDispatcher } from 'svelte';
    import Layout from "../Layout.svelte";

	// On attend que le parent nous passe un tableau de tâches
	export let tasks: Task[] = [];

	let calendarComponentRef: any | null = null;
    const dispatch = createEventDispatcher();


	$: options = {
        dateClick: (info: any) => {
            const title = prompt("Nouvelle tâche :");
            if (title) {
                dispatch("addTask",info.date);
            }
        },
		droppable: true,
		editable: true,
		events: tasks.map(task => ({
			id: task.id,
			title: task.title,
			start: task.dueDate,
		})),
		initialView: 'dayGridMonth',
		plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay',
		},
		height: '100%',
		weekends: true,
	};

</script>

<Layout>
    <div class="demo-app">
        <div class="demo-app-calendar">
            <FullCalendar bind:this={calendarComponentRef} {options} />
        </div>
    </div>
</Layout>

