import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { MessageSquare, Pin, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatItem {
    id: string
    title: string
    isPinned: boolean
    createdAt: Date
}

interface ChatListItemProps {
    chat: ChatItem
    isActive: boolean
    onDelete: () => void
    onTogglePin: () => void
}

export function ChatListItem({ chat, isActive, onDelete, onTogglePin }: ChatListItemProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link
                to="/chat/$chatId"
                params={{ chatId: chat.id }}
                className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors relative overflow-hidden',
                    isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
                style={{ paddingRight: '4.5rem' }}
            >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{chat.title.slice(0, 20)}</span>
            </Link>

            {/* Action buttons - only visible when THIS item is hovered */}
            {isHovered && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 z-10">
                    {/* Pin button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onTogglePin()
                        }}
                        className={cn(
                            'p-1.5 rounded-md transition-colors',
                            chat.isPinned
                                ? 'text-primary hover:text-primary/70'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-label={chat.isPinned ? 'Unpin chat' : 'Pin chat'}
                        title={chat.isPinned ? 'Unpin' : 'Pin'}
                    >
                        <Pin className={cn('h-3.5 w-3.5', chat.isPinned && 'fill-current')} />
                    </button>

                    {/* Delete button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (confirm(`Delete "${chat.title}"?`)) {
                                onDelete()
                            }
                        }}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Delete chat"
                        title="Delete"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}
        </div>
    )
}
