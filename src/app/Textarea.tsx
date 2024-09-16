'use client'
import { TextareaHTMLAttributes } from 'react'

export const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        {...props}
        className="resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
    />
)
