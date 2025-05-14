"use client";

import {
  Template,
  ImageCard,
  Button,
  InputText,
  useNotification,
  AuthenticatedPage,
} from "@/components";
import { useImageService } from "../../resources";
import { useState } from "react";
import { Image } from "../../resources";
import Link from "next/link";

export default function GaleriaPage() {
  const useService = useImageService();
  const notification = useNotification();
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [extension, setExtension] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function searchImages() {
    setLoading(true);
    const result = await useService.buscar(query, extension);
    const imagens = result ?? [];
    setImages(imagens);
    setLoading(false);

    if (!imagens.length) {
      notification.notify("No results found", "warning");
    }
  }

  function renderImageCard(image: Image) {
    return (
      <div key={image.url} className="w-full p-2">
        <ImageCard
          nome={image.name}
          src={image.url}
          tamanho={image.size}
          dataUpload={image.uploadDate}
          extension={image.extension}
        />
      </div>
    );
  }

  function renderImageCards() {
    return images.map(renderImageCard);
  }

  return (
    <AuthenticatedPage>
      <Template loading={loading}>
        {/* Seção de busca responsiva */}
        <section className="flex flex-col items-center justify-center my-5 px-4">
          <div className="flex flex-col md:flex-row w-full max-w-4xl gap-3">
            <InputText
              style="flex-grow border px-5 py-2 rounded-md text-gray-900"
              placeholder="Digite nome ou tag"
              onChange={(event) => setQuery(event.target.value)}
            />
            
            <select
              onChange={(event) => setExtension(event.target.value)}
              className="border px-4 py-2 rounded-lg text-gray-900 hover:bg-green-100"
            >
              <option value="">All formats</option>
              <option value="PNG">PNG</option>
              <option value="JPEG">JPEG</option>
              <option value="GIF">GIF</option>
            </select>

            <div className="flex gap-3">
              <Button
                className="bg-blue-500 hover:bg-blue-300 px-4 py-2 rounded-lg"
                label="Search"
                onClick={searchImages}
              />

              <Link href="/upload" className="flex">
                <Button
                  className="bg-yellow-500 hover:bg-yellow-300 px-4 py-2 rounded-lg"
                  label="Add new"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Galeria de imagens responsiva */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          {renderImageCards()}
        </section>

        {/* Mensagem quando não há imagens */}
        {!loading && images.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Nenhuma imagem encontrada</p>
            <p className="text-gray-400">Tente alterar seus critérios de busca</p>
          </div>
        )}
      </Template>
    </AuthenticatedPage>
  );
}