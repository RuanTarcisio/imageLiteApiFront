import React from "react"

interface TemplateProps{
    children: React.ReactNode
    loading?: boolean;
}


export const Template: React.FC<TemplateProps> = ({children, loading}) =>{

    return (

        <>
           <Header/>
            <div className="container mx-auto mt-8 px-4">
                {loading && <div className="bg-black">...Carregando</div>}
                {!loading && children}
            </div>
           <Footer/>
        </>

    )
}

const Header: React.FC = () => {
    return (
        <header className="bg-red-500 text-white py-3" >
            <div className="contaniner mx-auto flex justify-between itens-center px4">
                <h1 className="text-4x1 font-bold">  ImageLite</h1>
            </div>
        </header>
    )
}

const Footer: React.FC = () => {
    return(
        <footer className=" bg-indigo-950 text-white py-4 mt-8">
            <div className="contaniner mx-auto text-center">
                Make by Ruan Tarcisio
            </div>
        </footer>
    )
}