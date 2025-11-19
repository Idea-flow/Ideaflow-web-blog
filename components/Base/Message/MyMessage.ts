import { createVNode, render, type App } from 'vue'
import Message from './Message.vue'

interface MessageOptions {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

let messageInstance: any = null

let container: HTMLElement | null = null

const createMessage = (options: MessageOptions | string) => {
  if (import.meta.server) return
  if (!container) {
    container = document.createElement('div')
    container.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none'
    document.body.appendChild(container)
  }
  
  const props = typeof options === 'string' ? {
    content: options,
    type: 'info',
    duration: 3000
  } : {
    content: options.message,
    type: options.type || 'info',
    duration: options.duration ?? 3000
  }

  const vnode = createVNode(Message)
  render(vnode, container)
  
  messageInstance = vnode.component?.exposed
  return messageInstance?.show(props.content, props.type, props.duration)
}

const MyMessage = (options: MessageOptions | string) => createMessage(options)

MyMessage.success = (message: string, duration?: number) => {
  return createMessage({ message, type: 'success', duration })
}

MyMessage.error = (message: string, duration?: number) => {
  return createMessage({ message, type: 'error', duration })
}

MyMessage.warning = (message: string, duration?: number) => {
  return createMessage({ message, type: 'warning', duration })
}

MyMessage.info = (message: string, duration?: number) => {
  return createMessage({ message, type: 'info', duration })
}

export default MyMessage