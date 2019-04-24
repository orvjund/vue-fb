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
    if (!auth.currentUser) {
      this.$router.push('/login');
    }
  },
};
</script>
