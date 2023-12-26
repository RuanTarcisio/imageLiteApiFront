'use client'

import { Template, ImageCard } from '@/components'
import { useImageService } from '../resource/images/image.service';
import { useState } from 'react'
import { Image } from '../resource/images/image.resource';

export default function GaleriaPage(){

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('')
    const [extension, setExtension] = useState<string>('')
    
    async function searchImages(){
        console.log("valor digitado: ", query)
        const result = await useService.buscar(query);
        setImages(result);
        console.table(result);
    }

    function renderImageCard(image: Image){
        return(
            <ImageCard  key = {image.url}
                        nome ={image.name} 
                        src={image.url}
                        tamanho={image.size} 
                        dataUpload={image.uploadDate}
                        extension={image.extension} />
        )
    }

    function renderImageCards(){
        return images.map(renderImageCard)
    }

    return(
        <Template>  

            <section className='flex flex-col items-center justify-center my-5'>
                <div className=' flex space-x-4'>
                    <input type="text" onChange={event => setQuery(event.target.value)}
                        className='border px-5 py2 rounded-md text-gray-900'/>
                    <select className='bg-green-500 border px-4 py-2 rounded-md text-gray-900'>
                        <option>All formats</option>
                    </select>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={searchImages}>Search</button>
                    <button className='bg-yellow-500 text-white px-4 py-2 rounded-lg' onClick={searchImages}>Add New </button>
                </div>
            </section>
        
            <section className='grid grid-cols-4 gap-8'>
                 {
                    renderImageCards()
                 }              
            </section>
        </Template>
    )
    
}