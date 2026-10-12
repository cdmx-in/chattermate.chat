import { test, expect, env, seedOrg } from '@e2e'

// Changes the org's AI provider, so it runs in the serial `org` project.

const fakeModel = { baseUrl: `${env.fakeLlmUrl}/v1`, model: seedOrg.llmModel }

test.describe('AI configuration', () => {
  test('a key the provider rejects is reported and the agents keep working @settings', async ({ aiConfigPage, agent, widget, llm }) => {
    await aiConfigPage.goto()
    await aiConfigPage.useOpenAiCompatible({ ...fakeModel, apiKey: 'e2e-invalid-key' })
    await expect(aiConfigPage.error).toContainText('invalid')

    // The rejected key was not saved: a customer still gets answers.
    await llm.script(agent, (s) => s.otherwise().reply('Still here to help.'))
    await widget.embed()
    await widget.open()
    await widget.send('Hello?')
    await expect(widget.lastAgentMessage()).toHaveText('Still here to help.')
  })

  test('a working key is saved @settings', async ({ aiConfigPage }) => {
    await aiConfigPage.goto()
    await aiConfigPage.useOpenAiCompatible({ ...fakeModel, apiKey: 'e2e-fake-key-rotated' })
    await expect(aiConfigPage.error).toBeHidden()

    await aiConfigPage.goto()
    await expect(aiConfigPage.page.getByLabel('Base URL')).toHaveValue(fakeModel.baseUrl)
  })
})
