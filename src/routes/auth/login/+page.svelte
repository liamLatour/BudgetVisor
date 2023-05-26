<script lang="ts">
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth, userDoc } from '../../../firebase';
  import { setDoc } from 'firebase/firestore/lite';
  import { goto } from '$app/navigation';

  let email = "test@domain.com";
  let password = "Password";

  let errors;

  async function signIn() {
    try {
      let user = await signInWithEmailAndPassword(auth, email, password)
      await setDoc(userDoc(auth.currentUser!.uid), { username: user.user.displayName, email: user.user.email })
      await goto("/")
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message

      console.log("error signin in", message)
      errors = message
    }
  }
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to your account" />
</svelte:head>

<section class="flex flex-col justify-center items-center grow">
  <div class="flex flex-col gap-2">
		<input class="p-2 rounded" bind:value={email} type="email">
		<input class="p-2 rounded" bind:value={password} type="password">
	</div>

  <button on:click={signIn} class="p-2 bg-blue-500 rounded-md m-2 text-white font-bold">
		Login
	</button>
</section>