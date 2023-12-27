'use client'

import { Template, ImageCard, Button } from '@/components'
import { useImageService } from '../resource/images/image.service';
import { useState } from 'react'
import { Image } from '../resource/images/image.resource';
import Link from 'next/link';


export default function GaleriaPage(){

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('')
    const [extension, setExtension] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    
    async function searchImages(){
        setLoading(true)
        const result = await useService.buscar(query, extension);
        setImages(result);
        setLoading(false)
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
        <Template loading={loading}>  

            <section className='flex flex-col items-center justify-center my-5'>
                <div className=' flex space-x-4'>
                    <input type="text" onChange={event => setQuery(event.target.value)}
                        className='border px-5 py2 rounded-md text-gray-900'/>
                    <select onChange={event =>setExtension(event.target.value)} className='bg-green-500 border px-4 py-2 rounded-md text-gray-900 hover:bg-green-300'>
                        <option>All formats</option>
                        <option value = "PNG">PNG</option>
                        <option value = "JPEG">JPEG</option>
                        <option value = "GIF">GIF</option>
                    </select>

                    <Button style='bg-blue-500 hover:bg-gray-300' label='Search' onClick={searchImages} /> 
                    
                    <Link href= '/formulario' >  
                        <Button style='bg-yellow-500 hover:bg-yellow-300' label='Add new'/>
                    </Link>
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