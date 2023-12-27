import React from "react";

interface ButtonProps {
    color?: string;
    label?: string
    onClick: (event: any) => void;
}

export const Button: React.FC = () => {
    return(
<button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300 ' onClick={searchImages}>
    Search</button>
    )
}