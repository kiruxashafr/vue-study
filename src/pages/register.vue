<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/authStore'
import type { RegisterPayload } from '@/types/auth'

// PrimeVue компоненты
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Toast from 'primevue/toast'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isLoading = ref(false)
const serverError = ref('')

const registerForm = reactive<RegisterPayload>({
  name: '',
  email: '',
  password: '',
})

const onRegister = async () => {
  isLoading.value = true
  serverError.value = ''

  try {
    await authStore.register({ ...registerForm })

    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Аккаунт создан, добро пожаловать!',
      life: 3000,
    })

    // Небольшая задержка перед редиректом, чтобы юзер увидел тост
    setTimeout(() => {
      router.push('/list')
    }, 1500)
  } catch (err: any) {
    console.error('Ошибка регистрации:', err)
    // Берем сообщение из ответа сервера или пишем стандартное
    serverError.value = err.response?.data?.message || 'Ошибка при регистрации'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-page">
    <Toast />
    <div class="register-card">
      <h2>Регистрация</h2>

      <form @submit.prevent="onRegister" class="auth-form">
        <div class="field">
          <label for="reg_name">Имя</label>
          <InputText
            id="reg_name"
            v-model="registerForm.name"
            :disabled="isLoading"
            required
            fluid
          />
        </div>

        <div class="field">
          <label for="reg_email">Email</label>
          <InputText
            id="reg_email"
            v-model="registerForm.email"
            type="email"
            :disabled="isLoading"
            required
            fluid
          />
        </div>

        <div class="field">
          <label for="reg_pass">Пароль</label>
          <Password
            inputId="reg_pass"
            v-model="registerForm.password"
            :disabled="isLoading"
            toggleMask
            required
            fluid
          />
        </div>

        <Message v-if="serverError" severity="error" variant="simple">
          {{ serverError }}
        </Message>

        <Button type="submit" label="Создать аккаунт" :loading="isLoading" class="submit-btn" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
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
