<template>
  <div class="home">
    Home
  </div>
</template>

<script>
import { auth } from '@/firetools';

export default {
  name: 'Home',
  async created() {
    await auth.signInWithEmailAndPassword('crustyrat271@gmail.com', '321Snail!');

    if (!auth.currentUser) {
      this.$router.push('/login');
    }
  },
};
</script>
