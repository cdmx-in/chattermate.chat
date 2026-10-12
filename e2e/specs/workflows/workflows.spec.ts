import { test, expect, expectUnchanged, publishWorkflow, AI_REPLY } from '@e2e'

// A published workflow runs instead of the model: scripted steps, no AI calls.

test.describe('workflows', () => {
  test('a one-message workflow greets once on load and answers each message once, without the AI @workflows', async ({ agent, adminApi, widget, llm }) => {
    await publishWorkflow(adminApi, agent.id, {
      nodes: [{ id: 'msg-1', node_type: 'message', name: 'Greeting', config: { message_text: 'Hello from our workflow.' } }],
    })

    await widget.embed()
    await widget.open()
    await expect(widget.agentMessages).toHaveText(['Hello from our workflow.'], AI_REPLY)

    await widget.send('hi')
    await expect(widget.agentMessages).toHaveText(['Hello from our workflow.', 'Hello from our workflow.'], AI_REPLY)
    await expectUnchanged('agent messages', () => widget.agentMessages.allTextContents())
    expect(await llm.requests(agent)).toHaveLength(0)
  })

  test('a workflow asks a question and branches on the answer @workflows', async ({ agent, adminApi, widget }) => {
    await publishWorkflow(adminApi, agent.id, {
      nodes: [
        { id: 'ask', node_type: 'user_input', name: 'Ask Plan', config: { prompt_message: 'Which plan are you on? (pro/basic)', confirmation_message: 'Thanks — {{ask_plan_input}} it is.' } },
        { id: 'is-pro', node_type: 'condition', name: 'Is Pro', config: { condition_expression: '{{ask_plan_input}} === pro' } },
        { id: 'pro', node_type: 'message', name: 'Pro', config: { message_text: 'Pro customers get priority support.' } },
        { id: 'basic', node_type: 'message', name: 'Basic', config: { message_text: 'Basic customers can upgrade any time.' } },
      ],
      connections: [
        { id: 'c1', source_node_id: 'ask', target_node_id: 'is-pro' },
        { id: 'c2', source_node_id: 'is-pro', target_node_id: 'pro', label: 'true' },
        { id: 'c3', source_node_id: 'is-pro', target_node_id: 'basic', label: 'false' },
      ],
    })

    await widget.embed()
    await widget.open()
    await expect(widget.lastAgentMessage()).toHaveText('Which plan are you on? (pro/basic)', AI_REPLY)

    await widget.send('pro')
    await expect(widget.lastAgentMessage()).toHaveText('Pro customers get priority support.', AI_REPLY)
    await expect(widget.agentMessages).toContainText(['Thanks — pro it is.'])
    await expect(widget.agentMessages.filter({ hasText: 'Basic customers' })).toHaveCount(0)
  })
})
