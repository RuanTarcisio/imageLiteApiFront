import { Template } from "@/components/Templates";

export default function Home() {
  return (
    <div>
      <Template>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Bem-vindo ao ImageLite
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Gerencie suas imagens de forma simples e eficiente.
            </p>
          </header>

          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Funcionalidades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload de Imagens
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Faça upload de suas imagens de forma rápida e segura.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Galeria Organizada
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Visualize e organize suas imagens em uma galeria intuitiva.
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Comece Agora
            </h2>
            <div className="flex justify-center gap-4">
              <a
                href="/upload"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Fazer Upload
              </a>
              <a
                href="/galeria"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Ver Galeria
              </a>
            </div>
          </section>
        </div>
      </Template>
    </div>
  );
}
