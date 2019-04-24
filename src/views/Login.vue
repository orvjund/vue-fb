<template>
  <div class="login-container">
    <div
      class="login-card"
      @keyup.enter="attempLogin"
    >
      <h1>Login with email and password</h1>
      <div class="login-controls-holder">
        <input
          v-model="email"
          placeholder="Your email"
          type="email"
          name="email"
        >
        <input
          v-model="password"
          placeholder="Your password"
          type="password"
          name="password"
        >
        <button
          class="login-button"
          elevation="2"
          type="button"
          @click="attempLogin"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firetools';

export default {
  name: 'Login',
  data: () => ({
    email: 'crustyrat271@gmail.com',
    password: '321Snail!',
  }),
  methods: {
    async attempLogin() {
      const { email, password } = this;

      try {
        await auth.signInWithEmailAndPassword(email, password);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #dfe6e9;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  background-color: transparent;
  max-width: 90%;
}
.login-controls-holder {
  margin: auto;
  padding: 1em 0;
  width: 35em;
  max-width: 90%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 1em;
}
.login-button {
  font-weight: bold;
}
</style>
