<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { LoginPayload, RegisterPayload } from '@/types/auth'
import { reactive } from 'vue'

import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const registerForm = reactive<RegisterPayload>({
  name: '',
  email: '',
  password: '',
})

const onRegister = async () => {
  const success = await authStore.register({ ...registerForm })
  if (success) {
    router.push('/list')
  }
}
</script>

<template>
  <div class="register-container">
    <h1>Регистрация</h1>

    <form @submit.prevent="onRegister" class="auth-form">
      <div class="field">
        <label>Имя:</label>
        <input v-model="registerForm.name" type="text" required placeholder="Введите имя" />
      </div>

      <div class="field">
        <label>Email:</label>
        <input v-model="registerForm.email" type="email" required placeholder="example@mail.com" />
      </div>

      <div class="field">
        <label>Пароль:</label>
        <input v-model="registerForm.password" type="password" required placeholder="********" />
      </div>

      <button type="submit">Создать аккаунт</button>

      <p v-if="authStore.error" class="error-message">
        {{ authStore.error }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  text-align: left;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #42b883;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #a8d6c1;
}

.error-message {
  color: #e74c3c;
  font-weight: bold;
}
</style>
