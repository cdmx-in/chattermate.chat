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

import api from '@/services/api'

export type SetupStep = 'create' | 'teach' | 'test' | 'launch' | 'live'

export interface SetupProgress {
  step: SetupStep
  agent_id: string | null
  widget_id: string | null
  hidden: boolean
}

export const onboardingService = {
  async getProgress(): Promise<SetupProgress> {
    const response = await api.get('/onboarding/progress')
    return response.data
  },

  async hide(): Promise<void> {
    await api.post('/onboarding/progress/hide')
  },
}
