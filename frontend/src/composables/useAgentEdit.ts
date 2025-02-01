import { ref } from 'vue'
import type { Agent } from '@/types/agent'
import { agentService } from '@/services/agent'
import { useAgentStorage } from '@/utils/storage'

export function useAgentEdit(agent: Agent) {
  const agentStorage = useAgentStorage()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Basic state
  const displayName = ref<string>(agent.display_name || agent.name)
  const isActive = ref<boolean>(agent.is_active)
  const instructions = ref<string[]>(
    Array.isArray(agent.instructions) ? [...agent.instructions] : [agent.instructions || ''],
  )

  // Instructions handlers
  const addInstruction = () => {
    instructions.value.push('')
  }

  const removeInstruction = (index: number) => {
    instructions.value.splice(index, 1)
  }

  // Save handler
  const handleSave = async () => {
    try {
      isLoading.value = true
      error.value = null

      const updatedData = {
        display_name: displayName.value,
        is_active: isActive.value,
        instructions: instructions.value.filter((i) => i.trim()),
      }

      const updatedAgent = await agentService.updateAgent(agent.id, updatedData)
      agentStorage.updateAgent(updatedAgent)

      return updatedAgent
    } catch (err) {
      error.value = 'Failed to update agent'
      console.error('Save error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    displayName,
    isActive,
    instructions,
    isLoading,
    error,
    addInstruction,
    removeInstruction,
    handleSave,
  }
}
