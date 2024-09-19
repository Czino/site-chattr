import { ButtonHTMLAttributes } from 'react'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        {...props}
        className={[
            'bg-gradient-purple text-white p-4 text-xl uppercase font-bold rounded hover:bg-gradient-purple-dark',
            props.className,
        ].join(' ')}
    ></button>
)
