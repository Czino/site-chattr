import { ChangeEvent, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
    onTextChange?: (value: string) => void
}
export const Input = ({ onTextChange, ...props }: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onTextChange) onTextChange(event.target.value)
    }
    return (
        <input
            {...props}
            onChange={handleChange}
            className={[
                'resize-none border border-gray-300 rounded-md p-2 flex-shrink-0',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
            ].join(' ')}
        />
    )
}
