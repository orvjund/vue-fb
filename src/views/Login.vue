<template>
  <div class="login-container">
    <wired-card
      class="login-card"
      @keyup.enter="attempLogin"
    >
      <h1>Login with email and password</h1>
      <div class="login-controls-holder">
        <wired-input
          v-model="email"
          placeholder="Your email"
          type="email"
          name="email"
          @input="(e) => email = e.target.value"
        />
        <wired-input
          v-model="password"
          placeholder="Your password"
          type="password"
          name="password"
          @input="(e) => password = e.target.value"
        />
        <wired-button
          class="login-button"
          elevation="2"
          @click="attempLogin"
        >
          Login
        </wired-button>
      </div>
    </wired-card>
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
