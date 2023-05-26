<script>
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import { auth, userDoc } from '../../../firebase';
  import { setDoc } from 'firebase/firestore/lite';
  import { goto } from '$app/navigation';

  let email = "test@domain.com";
  let password = "Password";
  let username = "Liam";

  let errors;

  async function signUp() {
    try {
      let user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user.user, { displayName: username });
      await setDoc(userDoc(auth.currentUser.uid), {
        username: user.user.displayName,
        email: user.user.email
      });
      await goto('/');
    } catch (e) {
      console.log('error from creating user', e);
    }
  }
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Register your account" />
</svelte:head>

<section class="flex flex-col justify-center items-center grow">
  <div class="flex flex-col gap-2">
		<input class="p-2 rounded" bind:value={username}>
		<input class="p-2 rounded" bind:value={email} type="email">
		<input class="p-2 rounded" bind:value={password} type="password">
	</div>

	<button on:click={signUp} class="p-2 bg-blue-500 rounded-md m-2 text-white font-bold">
		Register
	</button>
</section>