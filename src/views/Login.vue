<template>
  <div class="login-container">
    <wired-card class="login-card">
      <h1>Login with email and password</h1>
      <div class="login-controls-holder">
        <wired-input
          placeholder="Your email"
          type="email"
          name="email"
        />
        <wired-input
          placeholder="Your password"
          type="password"
          name="password"
        />
        <wired-button class="login-button">
          Login
        </wired-button>
      </div>
    </wired-card>
  </div>
</template>

<script>

export default {
  name: 'Login',
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
}
.login-controls-holder {
  margin: auto;
  padding: 1em 0;
  width: 50em;
  max-width: 90%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 1em;
}
</style>
