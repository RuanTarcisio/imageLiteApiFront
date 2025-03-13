import React from "react";

interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "submit" | "button" | "reset";
    variant?: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    style,
    label,
    type = "button",
    variant,
    disabled,
    className,
    children
}: ButtonProps) => {
    return (
        <button
            className={`${style} ${className} px-4 py-2 rounded-lg transition-colors`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {/* Renderiza children se existir, caso contrário usa label */}
            {children || label}
        </button>
    );
};