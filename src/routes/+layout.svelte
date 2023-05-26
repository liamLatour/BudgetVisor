<script >
	import Navbar from '../components/Navbar.svelte';
	import './styles.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '../firebase';
	import authStore from '../authStore';

	onMount(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				authStore.set({
					isLoggedIn: user !== null,
					user,
					firebaseControlled: true,
				});
			},
			(error) => {
				authStore.set({
					isLoggedIn: false,
					firebaseControlled: false,
				});
				console.log(error);
			}
		);
	});
</script>

<div class="flex flex-col min-h-screen">
	<main class="flex w-full">
		<Navbar />
		<slot />
	</main>
</div>

