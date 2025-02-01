import { ref, onMounted } from 'vue'
import { aiService, type AIConfig } from '@/services/ai'

export function useAISetup() {
  const isLoading = ref(false)
  const error = ref<string>('')
  const setupConfig = ref<{
    provider: string
    model: string
    apiKey: string
  }>({
    provider: '',
    model: '',
    apiKey: '',
  })

  const providers = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'deepseek', label: 'DeepSeek' },
    { value: 'google', label: 'Google Gemini' },
    { value: 'googlevertex', label: 'Google Vertex AI' },
    { value: 'groq', label: 'Groq' },
    { value: 'mistral', label: 'Mistral' },
    { value: 'huggingface', label: 'HuggingFace' },
    { value: 'ollama', label: 'Ollama' },
    { value: 'xai', label: 'xAI' }
  ]

  const loadExistingConfig = async () => {
    try {
      isLoading.value = true
      error.value = ''
      const config = await aiService.getOrganizationConfig()
      setupConfig.value = {
        provider: config.model_type.toLowerCase(),
        model: config.model_name,
        apiKey: config.api_key
      }
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: { detail?: { details?: string; error?: string } } } } ).response?.data?.detail;
      if (apiError?.error !== 'AI configuration not found') {
        error.value = apiError?.details || apiError?.error || 'Failed to load configuration'
      }
    } finally {
      isLoading.value = false
    }
  }
  

  const saveAISetup = async (): Promise<boolean> => {
    try {
      error.value = ''
      isLoading.value = true
      await aiService.setupAI({
        model_type: setupConfig.value.provider.toUpperCase(),
        model_name: setupConfig.value.model,
        api_key: setupConfig.value.apiKey,
      })
      return true
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: { detail?: { details?: string; error?: string } } } }).response?.data?.detail;
      error.value = apiError?.details || apiError?.error || 'Setup failed. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadExistingConfig()
  })

  return {
    isLoading,
    error,
    setupConfig,
    providers,
    saveAISetup,
    loadExistingConfig
  }
}
