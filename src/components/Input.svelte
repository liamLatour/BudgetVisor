<script lang="ts">
	// import { spring } from 'svelte/motion';
	import { auth, expensesCollection } from "../firebase";
	import { addDoc, serverTimestamp } from 'firebase/firestore/lite';

	let expense = {
		name: "Name",
		category: "Food",
		amount: 10.34,
		date: "today",
	};

	async function add_expense(){
		await addDoc(expensesCollection, {...expense, owner: auth.currentUser.uid, timestamp: serverTimestamp()});
		alert("Done !");
	}
</script>

<div class="text-center">
	<div class="flex flex-col gap-2">
		<input class="p-2 rounded" bind:value={expense.name}>
		<input class="p-2 rounded" bind:value={expense.category}>
		<input class="p-2 rounded" bind:value={expense.amount} type="number">
		<input class="p-2 rounded" bind:value={expense.date} type="date">
	</div>

	<button on:click={add_expense} class="p-2 bg-blue-500 rounded-md m-2 text-white font-bold">
		Add it !
	</button>
</div>
