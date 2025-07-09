import type { App } from 'vue'
import MessageNodeEditor from './MessageNodeEditor.vue'
import LlmNodeEditor from './LlmNodeEditor.vue'

export default {
  install(app: App) {
    app.component('message-node-editor', MessageNodeEditor)
    app.component('llm-node-editor', LlmNodeEditor)
  }
} 