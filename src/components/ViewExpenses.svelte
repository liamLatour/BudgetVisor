<script lang="ts">
	// import { spring } from 'svelte/motion';
  import { deleteDoc, getDocs, query, where } from 'firebase/firestore/lite';
	import { expensesCollection } from "../firebase";
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import authStore from '../authStore';

  let expenses = [] as Array<object>;
  let finished = false;

	authStore.subscribe(async ({ isLoggedIn, user, firebaseControlled }) => {
		if (isLoggedIn && firebaseControlled) {
      const q = query(expensesCollection, where("owner", "==", user.uid));

      getDocs(q)
      .then(querySnapshot => {
        querySnapshot.forEach(expense => {
          expenses.push({...expense.data(), id: expense.id});
        });
        expenses = expenses;
      });
		}
    finished = true;

	});
</script>

<!-- Date -->
<!-- Cat; Name; Amount -->

<div class="h-4/5 w-4/5 rounded text-white bg-slate-500 p-2">
  {#if !finished}
    <p>Getting data...</p>
  {:else}
  <VirtualList items={expenses} let:item>
    <div class="p-3 ">
      <span>{ item.date }</span>
      <div class="flex justify-between items-center gap-3">
        <i class="fa-solid fa-cat text-xl"></i>
        <div class="grow">
          <h2 class="">{ item.name}</h2>
          <span class="opacity-60">{ item.category }</span>
        </div>
        <span class:text-cyan-400="{item.amount > 0}">{ item.amount }</span>
      </div>
      <hr/>
    </div>
  </VirtualList>
  {/if}
</div>
