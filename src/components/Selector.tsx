import { ButtonHTMLAttributes } from 'react'

type Props<T> = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onClick'> & {
    value: T
    selected: T
    onClick: (value: T) => void
}
export const Selector = <T,>({ value, selected, onClick, children, ...props }: Props<T>) => (
    <button
        {...props}
        className="relative p-4 w-full font-bold text-center uppercase bg-purple-50"
        onClick={() => onClick(value)}
    >
        {children}
        {value === selected && <div className="absolute right-0 bottom-0 left-0 w-full h-1 bg-highlight"></div>}
    </button>
)
