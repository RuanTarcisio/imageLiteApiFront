import React from "react";

interface InputTextProps{
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string;
}

export const InputText: React.FC<InputTextProps> = ({
    style, placeholder, onChange
}: InputTextProps) => {
    return (
        <input type="text" 
        onChange={onChange}
        placeholder={placeholder}        
        className= {`${style} border px-3 py-2 ronded-lg text-gray-900`}/>
    )

}