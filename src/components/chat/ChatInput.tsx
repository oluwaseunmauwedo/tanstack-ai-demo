import { useForm } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Button } from '../ui/button'
import { ArrowUp } from 'lucide-react'

interface ChatInputProps {
    onSubmit: (message: string) => void
    isLoading: boolean
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
                <div className="px-4 text-sm text-destructive">
                    {field.state.meta.errors.map((error, i) => (
                        <p key={i}>{error}</p>
                    ))}
                </div>
            ) : null}
        </>
    )
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
    const form = useForm({
        defaultValues: {
            message: '',
        },
        onSubmit: async ({ value }) => {
            onSubmit(value.message)
            form.reset()
        },
    })

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            form.handleSubmit()
        }
    }

    return (
        <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4 pb-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="max-w-3xl mx-auto px-4"
            >
                <div className="relative flex flex-col gap-2">
                    {/* Input container with texture and squared design */}
                    <div className="relative">
                        {/* Subtle texture border layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-border/40 via-transparent to-border/40 rounded-xl" />

                        {/* Main input container */}
                        <div className="relative flex items-end gap-3 bg-card/80 backdrop-blur-sm rounded-xl p-1 border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-200">
                            {/* Inner content area */}
                            <div className="flex-1 bg-background/40 rounded-lg p-2">
                                <form.Field
                                    name="message"
                                    validators={{
                                        onChange: ({ value }) =>
                                            !value || value.trim().length === 0
                                                ? 'Message cannot be empty'
                                                : value.length > 4000
                                                    ? 'Message is too long (max 4000 characters)'
                                                    : undefined,
                                    }}
                                >
                                    {(field) => (
                                        <textarea
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your message..."
                                            className="w-full bg-transparent border-0 resize-none focus:ring-0 focus:outline-none min-h-[52px] max-h-[200px] py-2 px-3 text-sm placeholder:text-muted-foreground/50 leading-relaxed"
                                            rows={1}
                                            disabled={isLoading}
                                        />
                                    )}
                                </form.Field>
                            </div>

                            {/* Send button */}
                            <form.Subscribe
                                selector={(state) => ({
                                    canSubmit: state.canSubmit,
                                    isSubmitting: state.isSubmitting,
                                })}
                            >
                                {(state) => (
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={isLoading || !state.canSubmit || state.isSubmitting}
                                        className="shrink-0 rounded-xl h-11 w-11 m-1 shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        <ArrowUp className="h-5 w-5" />
                                    </Button>
                                )}
                            </form.Subscribe>
                        </div>
                    </div>

                    {/* Error display */}
                    <form.Field name="message">
                        {(field) => <FieldInfo field={field} />}
                    </form.Field>
                </div>
            </form>
        </div>
    )
}
