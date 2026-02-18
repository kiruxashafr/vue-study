<script setup lang="ts"></script>

<template>
  <nav>
    <router-link to="/register">Регистрация</router-link> |
    <router-link to="/login">Вход</router-link>
  </nav>

  <hr />

  <router-view />
</template>

<style scoped>
nav {
  padding: 20px;
  font-family: sans-serif;
}
nav a {
  margin: 0 10px;
  color: blue;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
