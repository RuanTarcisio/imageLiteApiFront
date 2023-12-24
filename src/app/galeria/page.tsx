'use client'

import { Template, ImageCard } from '@/components'
import { useImageService } from '../resource/images/image.service';
import { useState } from 'react'
import { Image } from '../resource/images/image.resource';

export default function GaleriaPage(){

    const image1 = 'https://caracteristicas.pt/wp-content/uploads/2021/10/selva.jpg';
    const image2 = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/DirkvdM_cloudforest-jungle.jpg';
    const nome1 = 'Natureza';
    const nome2 = 'Selva';
    const [codigoImage, setCodigoImage] = useState<number>(1);
    const [urlImage, setUrlImage] = useState<string>(image2);
    const [nomeImage, setNomeImage] = useState<string>(nome1);
    const image = useState();

    function mudarImagem(){
        if(codigoImage == 1){
            setCodigoImage(2)
            setUrlImage(image1)
            setNomeImage(nome1)
        }
        else{
            setCodigoImage(1)
            setUrlImage(image2)
            setNomeImage(nome2)
        }
    }

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    
    async function searchImages(){
        const result = await useService.buscar();
        setImages(result);
        console.table(result);
    }

    return(
        <Template>  
            <button className='bg-gray-500' onClick={searchImages}>Clique para mudar</button>
            <section className='grid grid-cols-4 gap-8'>
           
            <ImageCard nome={nomeImage} dataUpload= '01/01/2024' src= {urlImage} />
            
            

                
            </section>
        </Template>
    )
    
}