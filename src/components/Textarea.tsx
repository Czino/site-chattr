import { ChangeEvent, TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    onTextChange?: (value: string) => void
}
export const Textarea = ({ onTextChange, className, ...props }: Props) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (onTextChange) onTextChange(event.target.value)
    }
    return (
        <textarea
            {...props}
            onChange={handleChange}
            className={[
                'resize-none border border-gray-300 rounded-md p-2',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                className,
            ].join(' ')}
        />
    )
}
