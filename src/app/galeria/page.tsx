'use client'

import { Template, ImageCard } from '@/components'
import { useImageService } from '../resource/images/image.service';
import { useState } from 'react'
import { Image } from '../resource/images/image.resource';

export default function GaleriaPage(){

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    
    async function searchImages(){
        const result = await useService.buscar();
        setImages(result);
        console.table(result);
    }

    function renderImageCard(image: Image){
        return(
            <ImageCard nome ={image.name} 
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
                    <input type="text" className='border px-5 py2 rounded-md text-gray-900'/>
                    <select className='border px-4 py-2 rounder-md text-gray-900'>
                        <option>All formats</option>
                    </select>
                    <button className='bg-gray-500' onClick={searchImages}>Search</button>

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