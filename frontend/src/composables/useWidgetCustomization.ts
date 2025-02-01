import { ref } from 'vue'
import type { AgentCustomization, Customer } from '../types/widget'
import WebFont from 'webfontloader'

export function useWidgetCustomization() {
    const customization = ref<AgentCustomization>({})
    const agentName = ref('')

    const applyCustomization = (newCustomization: AgentCustomization, newAgentName: string, newCustomer: Customer) => {
        customization.value = newCustomization
 

        agentName.value = newCustomer.full_name ? newCustomer.full_name : newAgentName
        if (newCustomer.profile_pic) {
            customization.value.photo_url = newCustomer.profile_pic
        }

        // Load font if specified
        if (newCustomization.font_family) {
            WebFont.load({
                google: {
                    families: [newCustomization.font_family]
                },
                active: () => {
                    const chatContainer = document.querySelector('.chat-container') as HTMLElement
                    if (chatContainer) {
                        chatContainer.style.fontFamily = `"${newCustomization.font_family}", system-ui, sans-serif`
                    }
                }
            })
        }

        // Send customization update to parent
        window.parent.postMessage({
            type: 'CUSTOMIZATION_UPDATE',
            data: {
                chat_bubble_color: newCustomization.chat_bubble_color || '#f34611'
            }
        }, '*')
    }

    // Initialize from window.__INITIAL_DATA__
    const initializeFromData = () => {
        const initialData = window.__INITIAL_DATA__
        if (initialData) {
            applyCustomization(initialData.customization || {}, initialData.agentName || '', initialData.customer || '')
        }
    }

    return {
        customization,
        agentName,
        applyCustomization,
        initializeFromData
    }
} 