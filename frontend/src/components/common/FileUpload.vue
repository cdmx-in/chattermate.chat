<!--
ChatterMate - File Upload Component
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { widgetEnv } from '../../webclient/widget-env'

const props = defineProps<{
  token?: string
  authorization?: string
  maxFiles?: number
  acceptTypes?: string
}>()

const emit = defineEmits<{
  (e: 'filesUploaded', files: Array<{url: string, filename: string, type: string}>): void
  (e: 'error', error: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const uploadedFiles = ref<Array<{url: string, signedUrl: string, filename: string, type: string, size: number}>>([])
const uploading = ref(false)
const dragOver = ref(false)

const maxFiles = computed(() => props.maxFiles || 5)
const acceptTypes = computed(() => props.acceptTypes || 'image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls')

const canUploadMore = computed(() => uploadedFiles.value.length < maxFiles.value)

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    await uploadFiles(Array.from(target.files))
  }
}

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = false
  
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    await uploadFiles(Array.from(event.dataTransfer.files))
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
}

const handlePaste = async (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  if (!items) return
  
  const files: File[] = []
  for (const item of Array.from(items)) {
    if (item.kind === 'file') {
      const file = item.getAsFile()
      if (file) {
        files.push(file)
      }
    }
  }
  
  if (files.length > 0) {
    event.preventDefault()
    await uploadFiles(files)
  }
}

const uploadFiles = async (files: File[]) => {
  if (!canUploadMore.value) {
    emit('error', `Maximum ${maxFiles.value} files allowed`)
    return
  }
  
  const remainingSlots = maxFiles.value - uploadedFiles.value.length
  const filesToUpload = files.slice(0, remainingSlots)
  
  if (files.length > remainingSlots) {
    emit('error', `Only ${remainingSlots} more file(s) can be uploaded`)
  }
  
  uploading.value = true
  
  for (const file of filesToUpload) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const headers: Record<string, string> = {}
      if (props.authorization) {
        headers['Authorization'] = props.authorization
      }
      if (props.token) {
        headers['X-Conversation-Token'] = props.token
      }
      
      const response = await fetch(`${widgetEnv.API_URL}/files/upload`, {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include'  // Send cookies for authentication
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const data = await response.json()
      uploadedFiles.value.push({
        url: data.file_url,
        signedUrl: data.signed_url,
        filename: data.filename,
        type: data.content_type || 'application/octet-stream',
        size: data.size
      })
    } catch (error) {
      console.error('Upload error:', error)
      emit('error', `Failed to upload ${file.name}`)
    }
  }
  
  uploading.value = false
  
  // Emit the uploaded files
  if (uploadedFiles.value.length > 0) {
    emit('filesUploaded', uploadedFiles.value.map(f => ({
      url: f.url,
      filename: f.filename,
      type: f.type,
      size: f.size
    })))
  }
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
  emit('filesUploaded', uploadedFiles.value.map(f => ({
    url: f.url,
    filename: f.filename,
    type: f.type,
    size: f.size
  })))
}

const openFilePicker = () => {
  fileInput.value?.click()
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const isImage = (type: string | undefined | null): boolean => {
  return type ? type.startsWith('image/') : false
}

defineExpose({
  uploadedFiles,
  clearFiles: () => { uploadedFiles.value = [] },
  handlePaste
})
</script>

<template>
  <div class="file-upload-container">
    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      :accept="acceptTypes"
      multiple
      style="display: none"
      @change="handleFileSelect"
    />
    
    <!-- Upload button -->
    <button
      v-if="canUploadMore"
      type="button"
      class="upload-button"
      :disabled="uploading"
      @click="openFilePicker"
      :title="'Attach files (or paste screenshots)'"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    
    <!-- Drop zone overlay -->
    <div
      v-if="dragOver"
      class="drop-zone-overlay"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <div class="drop-zone-content">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p>Drop files here</p>
      </div>
    </div>
    
    <!-- File previews -->
    <div v-if="uploadedFiles.length > 0" class="file-previews">
      <div
        v-for="(file, index) in uploadedFiles"
        :key="index"
        class="file-preview"
      >
        <div class="file-preview-content">
          <img
            v-if="isImage(file.type)"
            :src="file.signedUrl"
            :alt="file.filename"
            class="file-preview-image"
          />
          <div v-else class="file-preview-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          </div>
        </div>
        <div class="file-preview-info">
          <div class="file-preview-name">{{ file.filename }}</div>
          <div class="file-preview-size">{{ formatFileSize(file.size) }}</div>
        </div>
        <button
          type="button"
          class="file-preview-remove"
          @click="removeFile(index)"
          :title="'Remove file'"
        >
          ×
        </button>
      </div>
    </div>
    
    <!-- Upload progress -->
    <div v-if="uploading" class="upload-progress">
      <div class="upload-spinner"></div>
      <span>Uploading...</span>
    </div>
  </div>
</template>

<style scoped>
.file-upload-container {
  position: relative;
}

.upload-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  padding: 0;
}

.upload-button:hover:not(:disabled) {
  background: #f0f0f0;
  color: #333;
}

.upload-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.drop-zone-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.drop-zone-content {
  background: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  color: #333;
}

.drop-zone-content svg {
  margin-bottom: 16px;
}

.drop-zone-content p {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.file-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 8px;
  max-width: 100%;
}

.file-preview-content {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.file-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-preview-icon {
  color: #666;
}

.file-preview-info {
  flex: 1;
  min-width: 0;
}

.file-preview-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-preview-size {
  font-size: 11px;
  color: #666;
}

.file-preview-remove {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: white;
  color: #666;
  cursor: pointer;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.file-preview-remove:hover {
  background: #ff4444;
  color: white;
}

.upload-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  color: #666;
  font-size: 13px;
}

.upload-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
