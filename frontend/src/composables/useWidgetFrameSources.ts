/*
Copyright 2024-2026 ChatterMate

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { ref, watch, type Ref } from 'vue'
import { widgetService } from '@/services/widget'

/**
 * The hosts a site's Content-Security-Policy must let frame this widget, for the
 * note beside the embed code. Empty until loaded, or if it couldn't be: the note
 * just isn't shown then.
 */
export function useWidgetFrameSources(widgetId: Ref<string | undefined>) {
  const frameSources = ref<string[]>([])

  const load = async () => {
    const id = widgetId.value
    frameSources.value = []
    if (!id) return
    try {
      const sources = await widgetService.getFrameSources(id)
      if (id === widgetId.value) frameSources.value = sources
    } catch (err) {
      console.error('Failed to load the widget frame sources:', err)
    }
  }

  watch(widgetId, load, { immediate: true })
  return { frameSources }
}
