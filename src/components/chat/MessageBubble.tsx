import type { Message } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === 'user'

    if (isUser) {
        return (
            <div className="flex justify-end">
                <div className="rounded-2xl px-4 py-3 max-w-[80%] text-sm bg-primary text-primary-foreground">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
            </div>
        )
    }

    // Assistant message with Markdown rendering
    return (
        <div className="max-w-[85%]">
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                        p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
                        li: ({ ...props }) => <li className="ml-2" {...props} />,
                        code: ({ className, children, ...props }: any) => {
                            const isInline = !className
                            return isInline ? (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className="block bg-muted p-3 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props}>
                                    {children}
                                </code>
                            )
                        },
                        pre: ({ ...props }) => <pre className="my-4" {...props} />,
                        blockquote: ({ ...props }) => (
                            <blockquote className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground" {...props} />
                        ),
                    }}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export function TypingIndicator() {
    return (
        <div className="flex items-center gap-2 py-2">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
    )
}

export function StreamingMessage({ content }: { content: string }) {
    return (
        <div className="max-w-[85%]">
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                        p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
                        li: ({ ...props }) => <li className="ml-2" {...props} />,
                        code: ({ className, children, ...props }: any) => {
                            const isInline = !className
                            return isInline ? (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className="block bg-muted p-3 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props}>
                                    {children}
                                </code>
                            )
                        },
                        pre: ({ ...props }) => <pre className="my-4" {...props} />,
                        blockquote: ({ ...props }) => (
                            <blockquote className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground" {...props} />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary/70 animate-pulse" />
            </div>
        </div>
    )
}
