'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GradientStrokeInfoIcon from './icons/InfoIcon'
import GradientStrokeIdeaIcon from './icons/IdeaIcon'
import GradientStrokePhoneIcon from './icons/PhoneIcon'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { sanitizeMarkdown } from '@/lib/stringify'

type Message = {
  sender: 'user' | 'assistant'
  text: string
}

const quickActions = [
  { text: 'Who is Meisha Putradewan?', icon: <GradientStrokeInfoIcon /> },
  { text: 'What solutions are offered?', icon: <GradientStrokeIdeaIcon /> },
  { text: 'How to contact Meisha?', icon: <GradientStrokePhoneIcon /> },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior,
    })
  }

  const horizontalScrollRef = useRef<HTMLDivElement | null>(null)
  const scrollHorizontal = useCallback((direction: 'left' | 'right') => {
    if (!horizontalScrollRef.current) return

    horizontalScrollRef.current.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }, [])

  const handleQuickAction = (actionText: string) => {
    setShowQuickActions(false)
    sendMessage(actionText)
  }

  useEffect(() => {
    if (isOpen) {
      setShowButton(false)
      setTimeout(() => setIsVisible(true), 50)
    } else {
      setTimeout(() => setIsVisible(false), 200)
      setTimeout(() => setShowButton(true), 200)
    }
  }, [isOpen])

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom('auto')
    }
  }, [messages, loading])

  useEffect(() => {
    if (!isVisible) return

    const el = scrollRef.current
    if (!el) return

    const thresholdPx = 80

    const onScroll = () => {
      const distanceFromBottom = el.scrollHeight - (el.scrollTop + el.clientHeight)
      const atBottom = distanceFromBottom <= thresholdPx

      setIsAtBottom(atBottom)
      setShowScrollToBottom(!atBottom)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      el.removeEventListener('scroll', onScroll)
    }
  }, [isVisible])

  async function sendMessage(messageText?: string) {
    const messageToSend = messageText || input
    if (!messageToSend.trim()) return

    const userMsg: Message = { sender: 'user', text: messageToSend }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setShowQuickActions(false)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend }),
      })

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      const assistantMsg: Message = { sender: 'assistant', text: '' }

      setMessages((prev) => [...prev, assistantMsg])

      setLoading(false)

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const words = chunk.split(/(\s+)/)

        for (const w of words) {
          assistantMsg.text += w
          setMessages((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { ...assistantMsg }
            return copy
          })
          await new Promise((r) => setTimeout(r, 50))
        }
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'assistant', text: '⚠️ Error connecting to AI' }])
      console.error('⚠️ Error streaming response', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showButton && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`p-4 rounded-xl bg-linear-to-tr shadow-lg flex items-center justify-center text-white font-semibold gap-2 drop-shadow-gray-500 drop-shadow-md from-gray-950 to-gray-600 from-55% transition duration-300 ease-in-out hover:from-[#FE4409] hover:to-[#FFDACE] ${!isOpen ? 'animate-fade-in-scale' : 'animate-fade-out-scale'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 fill-current"
          >
            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Z" />
          </svg>
          Chatbot
        </button>
      )}

      {isVisible && (
        <div
          className={`w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-128 lg:w-lg lg:h-156 bg-white rounded-2xl shadow border overflow-hidden flex flex-col ${isOpen ? 'animate-fade-in-scale' : 'animate-fade-out-scale'}`}
        >
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="text-lg">Meisha&apos;s Personal Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black rounded-full hover:bg-gray-200 p-2 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-5 h-5 lg:w-8 lg:h-8 fill-current"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="relative flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            <div className="relative max-w-[75%] p-2 lg:p-4 lg:text-lg whitespace-pre-line rounded-2xl bg-gray-100 text-black">
              <span
                className="absolute -left-1 top-2 h-3 w-3 bg-gray-100 rotate-45 rounded-sm"
                aria-hidden="true"
              />
              Ask anything you want to know about Meisha here.
            </div>

            {showQuickActions && messages.length === 0 && (
              <div className="flex flex-col items-end gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickAction(action.text)}
                    disabled={loading}
                    className={clsx(
                      'relative max-w-[75%] w-full',
                      'p-2 lg:p-4 lg:text-lg',
                      'rounded-2xl rounded-br-md',
                      'border border-gray-700',
                      'bg-linear-to-r from-gray-100 to-gray-200',
                      'hover:from-gray-200 hover:to-gray-300',
                      'active:scale-[0.99]',
                      'transition-all',
                      'flex items-center gap-2 text-left whitespace-normal',
                      loading && 'opacity-50 cursor-not-allowed',
                    )}
                  >
                    <span className="shrink-0">{action.icon}</span>
                    <span className="flex-1 text-xs lg:text-sm">{action.text}</span>
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => {
              const isUser = msg.sender === 'user'
              const isAssistant = msg.sender === 'assistant'

              const prev = messages[i - 1]
              const next = messages[i + 1]

              const isPrevSame = prev?.sender === msg.sender
              const isNextSame = next?.sender === msg.sender

              const showAssistantTail = isAssistant && !isNextSame

              return (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={clsx(
                      'relative max-w-[75%] p-2 lg:p-4 lg:text-lg rounded-2xl',
                      isUser
                        ? 'bg-blue-500 text-white ml-auto rounded-br-md'
                        : 'bg-gray-100 text-black rounded-bl-md',
                    )}
                  >
                    {showAssistantTail && (
                      <span
                        className="absolute -left-1 top-2 h-3 w-3 bg-gray-100 rotate-45 rounded-xs"
                        aria-hidden="true"
                      />
                    )}

                    {isAssistant ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-xl lg:text-2xl font-bold mb-2 mt-3">{children}</h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg lg:text-xl font-bold mb-2 mt-3">{children}</h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base lg:text-lg font-bold mb-2 mt-2">{children}</h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="text-sm lg:text-base font-bold mb-1 mt-2">{children}</h4>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold">{children}</strong>
                          ),
                          em: ({ children }) => <em className="italic">{children}</em>,
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-2 space-y-1 ml-2">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-2 space-y-1 ml-2">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-sm lg:text-base">{children}</li>
                          ),
                          hr: () => <hr className="my-3 border-t border-gray-300" />,
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-300 pl-3 italic my-2">
                              {children}
                            </blockquote>
                          ),
                          code: (props) => {
                            const { inline, children, ...rest } = props as {
                              inline?: boolean
                              children?: React.ReactNode
                              [key: string]: unknown
                            }
                            return inline ? (
                              <code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...rest}>
                                {children}
                              </code>
                            ) : (
                              <code
                                className="block bg-gray-200 p-2 rounded text-sm my-2 overflow-x-auto"
                                {...rest}
                              >
                                {children}
                              </code>
                            )
                          },
                          pre: ({ children }) => (
                            <pre className="bg-gray-200 p-2 rounded text-sm my-2 overflow-x-auto">
                              {children}
                            </pre>
                          ),
                          img: ({ ...props }) => (
                            <Image
                              src={typeof props.src === 'string' ? props.src : ''}
                              alt={props.alt || 'Chatbot media'}
                              width={400}
                              height={300}
                              className="rounded-lg my-2"
                            />
                          ),
                          a: ({ href, children }) => {
                            if (!href) return <span>{children}</span>
                            const isInternal =
                              href.startsWith('/') || href.startsWith(window.location.origin)

                            if (isInternal) {
                              return (
                                <Link
                                  href={href}
                                  className="text-blue-600 underline hover:text-blue-800"
                                >
                                  {children}
                                </Link>
                              )
                            }

                            return (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                              >
                                {children}
                              </a>
                            )
                          },
                        }}
                      >
                        {sanitizeMarkdown(msg.text)}
                      </ReactMarkdown>
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                </div>
              )
            })}

            {loading && (
              <div className="text-gray-400 text-xs md:text-sm lg:text-lg animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          <div className="relative flex flex-col gap-2 border-t bg-white p-2 lg:p-4">
            {showScrollToBottom && (
              <button
                type="button"
                onClick={() => scrollToBottom('smooth')}
                className={clsx(
                  'absolute -top-12 right-4 z-20 h-9 w-9 rounded-full border border-gray-200 bg-white text-black shadow-md transition-all lg:-top-14 lg:h-10 lg:w-10',
                  'flex items-center justify-center hover:bg-gray-50 animate-fade-in-scale',
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="currentColor"
                >
                  <path d="M12 16.5a1 1 0 0 1-.7-.29l-5-5a1 1 0 1 1 1.4-1.42L12 13.67l4.3-3.88a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-.7.29Z" />
                </svg>
              </button>
            )}

            {messages.length > 0 && (
              <div className="flex w-full items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => scrollHorizontal('left')}
                  className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black bg-white text-black shadow-sm transition-all hover:bg-gray-50 lg:h-8 lg:w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-px mt-[0.5px] h-4 w-4 lg:h-5 lg:w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  ref={horizontalScrollRef}
                  className="scrollbar-none flex flex-1 items-center gap-2 overflow-x-auto py-1.5 snap-x"
                >
                  {quickActions.map((action, index) => (
                    <button
                      key={`${action.text}-${index}`}
                      type="button"
                      onClick={() => sendMessage(action.text)}
                      disabled={loading}
                      className={clsx(
                        'shrink-0 snap-start whitespace-nowrap rounded-xl bg-gray-200 px-3 py-1.5 text-xs transition-all',
                        'flex items-center gap-1.5 hover:bg-gray-400 lg:px-4 lg:py-2 lg:text-sm',
                        loading && 'cursor-not-allowed opacity-50',
                      )}
                    >
                      <span className="flex shrink-0 items-center justify-center scale-75 lg:scale-100">
                        {action.icon}
                      </span>
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollHorizontal('right')}
                  className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black bg-white text-black shadow-sm transition-all hover:bg-gray-50 lg:h-8 lg:w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-px mt-[0.5px] h-4 w-4 lg:h-5 lg:w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && !loading && sendMessage()}
                maxLength={500}
                disabled={loading}
                className="flex-1 rounded-lg border-2 border-gray-200 px-3 py-1 text-sm transition-all focus:border-black focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 lg:py-3 lg:text-lg"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="ml-2 rounded-lg bg-linear-to-tr from-gray-950 to-gray-600 hover:from-[#FE4409] hover:to-[#FFDACE] from-55% px-3 py-1 text-sm text-white transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 lg:py-3 lg:text-lg"
              >
                {loading ? '...' : 'Send'}
              </button>
            </div>

            {input.length > 450 && (
              <span className="text-right text-xs text-gray-500">
                {input.length}/500 characters
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
