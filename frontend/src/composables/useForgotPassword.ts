import { ref, watch } from 'vue'
import api from '@/services/api'
import { validatePassword } from '@/utils/validators'
import type { AxiosError } from 'axios'

interface ErrorResponse {
  detail: string
}

export function useForgotPassword() {
  const isLoading = ref(false)
  const error = ref('')
  const success = ref('')
  const currentStep = ref(1) // 1: email, 2: otp + new password
  
  const email = ref('')
  const otp = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  const passwordValidation = ref({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  })

  // Live update password validation as user types
  watch(newPassword, (val) => {
    passwordValidation.value = validatePassword(val)
  })

  /**
   * Request password reset OTP
   */
  const requestPasswordReset = async () => {
    try {
      isLoading.value = true
      error.value = ''
      success.value = ''

      const response = await api.post('/enterprise/signup/forgot-password/request', {
        email: email.value
      })

      success.value = response.data.message || 'Verification code sent to your email'
      currentStep.value = 2
      return true
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>
      error.value = axiosError.response?.data?.detail || 'Failed to send verification code'
      console.error('Password reset request error:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Verify OTP and reset password
   */
  const verifyAndResetPassword = async () => {
    try {
      isLoading.value = true
      error.value = ''
      success.value = ''

      // Validate passwords match
      if (newPassword.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return false
      }

      // Validate password strength using shared validator
      passwordValidation.value = validatePassword(newPassword.value)
      if (passwordValidation.value.score < 5) {
        error.value = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
        return false
      }

      const response = await api.post('/enterprise/signup/forgot-password/verify', {
        email: email.value,
        otp: otp.value,
        new_password: newPassword.value
      })

      success.value = response.data.message || 'Password reset successful'
      return true
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>
      const errorMessage = axiosError.response?.data?.detail || 'Failed to reset password'
      
      // Directly show backend-provided remaining attempts message when present
      if (errorMessage.includes('Invalid code') && errorMessage.includes('attempt')) {
        error.value = errorMessage
        return false
      }

      // Map terminal states to the exact UX and reset to step 1
      if (
        errorMessage.includes('Maximum attempts reached') ||
        errorMessage.includes('No active OTP found') ||
        errorMessage.includes('OTP has expired')
      ) {
        error.value = 'Maximum no of OTP attempts reached, please retry forgot password'
        setTimeout(() => {
          goBackToEmailStep()
        }, 1500)
        return false
      }

      // Fallback
      error.value = errorMessage
      console.error('Password reset verification error:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Reset the form to initial state
   */
  const resetForm = () => {
    email.value = ''
    otp.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    error.value = ''
    success.value = ''
    currentStep.value = 1
    isLoading.value = false
  }

  /**
   * Go back to previous step
   */
  const goBackToEmailStep = () => {
    currentStep.value = 1
    otp.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    error.value = ''
    success.value = ''
  }

  return {
    // State
    isLoading,
    error,
    success,
    currentStep,
    email,
    otp,
    newPassword,
    confirmPassword,
    passwordValidation,
    
    // Methods
    requestPasswordReset,
    verifyAndResetPassword,
    resetForm,
    goBackToEmailStep
  }
}
