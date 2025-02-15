'use client'

import * as React from 'react'
import { X, Maximize2 } from 'lucide-react'
import { FaRegWindowMinimize } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import AIChatForm from '@/components/forms/AIChatForm'
import { ChatMessage } from '@/types/chat'
import ErrorMessage from '@/components/ErrorMessage'
import { chatWindowSizes } from '@/lib/constants'
import { ChatWindowSizeType } from '@/types/chat'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [isMaximized, setIsMaximized] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const constraintsRef = React.useRef(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message])
  }

  const getCurrentSize = (): ChatWindowSizeType => {
    if (isMinimized) return chatWindowSizes.minimized
    if (isMaximized) return chatWindowSizes.maximized
    return chatWindowSizes.default
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
    setIsMaximized(false)
  }

  if (!isOpen) return null
  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
      <motion.div
        drag={true}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0}
        initial={{ y: 0 }}
        animate={{
          width: getCurrentSize().width,
          height: getCurrentSize().height,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed pointer-events-auto right-3 top-14",
        )}
      >
        <Card className="h-full flex flex-col shadow-lg">
          <CardHeader
            className="flex flex-row items-center justify-between space-y-0 bg-black text-white p-4 cursor-move"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">AI Tutor</h4>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-zinc-700"
                onClick={handleMinimize}
              >
                <FaRegWindowMinimize className="h-4 w-4 mb-2" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-zinc-700"
                onClick={handleMaximize}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-zinc-700"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <div className="flex flex-col flex-1 overflow-hidden">
              <CardContent className="flex-1 p-4 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold">👋 Hello, I'm  Nazneen</h2>
                    <p className="text-lg sm:text-xl">Your AI Tutor</p>
                    <div className="space-y-4 max-w-sm">
                      <p className="text-muted-foreground">
                        Ask me any doubts related to your notes, and I will help you resolve them.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex w-max max-w-[80%] rounded-lg px-4 py-2",
                          msg.role === 'user'
                            ? "ml-auto bg-black text-white"
                            : "bg-muted"
                        )}
                      >
                        {msg?.parts[0]?.text}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}

                {isLoading && (
                  <div className="flex items-center space-x-2 bg-muted rounded-lg px-4 py-2 w-max mt-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  </div>
                )}
                {error && <ErrorMessage error={error} />}
              </CardContent>

              <div className="p-4 border-t">
                <AIChatForm onMessage={handleMessage} history={messages} setIsLoading={setIsLoading} setError={setError} />
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}