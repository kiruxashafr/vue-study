<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Toast from 'primevue/toast'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isLoading = ref(false)
const serverError = ref('')

const paiload = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  isLoading.value = true
  serverError.value = ''

  try {
    await authStore.login(paiload)

    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Вы вошли в систему!',
      life: 3000,
    })
  } catch (err: any) {
    console.error('Ошибка:', err)
    serverError.value = err.response?.data?.message || 'Ошибка авторизации'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <Toast />
    <div class="login-card">
      <h2>Вход в систему</h2>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="field">
          <label for="login_email">Логин</label>
          <InputText id="login_email" v-model="paiload.email" :disabled="isLoading" fluid />
        </div>

        <div class="field">
          <label for="login_pass">Пароль</label>
          <Password
            inputId="login_pass"
            v-model="paiload.password"
            :disabled="isLoading"
            :feedback="false"
            toggleMask
            fluid
          />
        </div>

        <Message v-if="serverError" severity="error" variant="simple">
          {{ serverError }}
        </Message>

        <Button type="submit" label="Войти" :loading="isLoading" class="submit-btn" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.submit-btn {
  width: 100%;
}
</style>
