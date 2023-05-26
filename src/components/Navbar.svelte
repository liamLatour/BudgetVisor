<script>
	import { page } from '$app/stores';
	import { signOut } from 'firebase/auth';
	import { auth } from '../firebase';
	import { goto } from '$app/navigation';
	import authStore from '../authStore';

	let isLogged = false;

	authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
		if (isLoggedIn && firebaseControlled) {
			isLogged = true;
		}else{
			isLogged = false;
		}
	});

	async function logOut() {
		await signOut(auth);
		await goto('/');
	}
</script>

<nav class="flex flex-col items-center w-20 bg-slate-500 h-screen">
	<ul class="flex flex-col gap-5 m-4 h-full">
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/" class="flex flex-col justify-center items-center hover:text-blue-400">
				<i class="fa-solid fa-house text-xl"></i>
				<span>Home</span>
			</a>
		</li>
		<li aria-current={$page.url.pathname === '/history' ? 'page' : undefined}>
			<a href="/history" class="flex flex-col justify-center items-center hover:text-blue-400">
				<i class="fa-solid fa-receipt text-xl"></i>
				<span>Activities</span>
			</a>
		</li>
		<li class="grow"></li>
		{#if isLogged == true}
			<li>
				<button on:click={logOut} class="flex flex-col m-auto justify-center items-center hover:text-blue-400 text-white">
					<i class="fa-solid fa-right-from-bracket text-xl "></i>
				</button>
			</li>
		{:else}
			<li aria-current={$page.url.pathname === '/auth/login' ? 'page' : undefined}>
				<a href="/auth/login" class="flex flex-col justify-center items-center hover:text-blue-400">
					<i class="fa-solid fa-right-to-bracket text-xl"></i>
				</a>
			</li>
			<li aria-current={$page.url.pathname === '/auth/register' ? 'page' : undefined}>
				<a href="/auth/register" class="flex flex-col justify-center items-center hover:text-blue-400">
					<i class="fa-solid fa-user-plus text-xl"></i>
				</a>
			</li>
		{/if}
	</ul>
</nav>