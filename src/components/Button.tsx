import { ButtonHTMLAttributes } from 'react'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={[
            'bg-gradient-purple text-white p-2 rounded hover:bg-gradient-purple-dark',
            props.className || '',
        ].join(' ')}
        {...props}
    ></button>
)
