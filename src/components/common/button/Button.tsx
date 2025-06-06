import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnStyle?: string;
    label?: string;
    variant?: string;
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            onClick,
            btnStyle,
            label,
            type = "button",
            variant,
            disabled,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={`${btnStyle} ${className} px-4 py-2 rounded-lg transition-colors`}
                type={type}
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {children || label}
            </button>
        );
    }
);

Button.displayName = "Button";