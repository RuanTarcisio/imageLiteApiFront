import { FaGithub, FaInstagram, FaLinkedin, FaGoogle, FaRocket } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-base-200 dark:bg-base-800 text-black dark:text-white border-t border-base-300 dark:border-base-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <div className="text-primary dark:text-primary-400">
              <FaRocket className="text-2xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ImageLite
            </span>
          </div>

          {/* Redes Sociais */}
          <div className="flex gap-6">
            <a
              href="https://github.com/RuanTarcisio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="Github"
            >
              <FaGithub className="size-6" />
            </a>
            <a
              href="https://www.instagram.com/dev.correria/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="size-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/ruan-tarcisio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="size-6" />
            </a>
            <a
              href="mailto:dev.correria@gmail.com"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              aria-label="Enviar email"
            >
              <FaGoogle className="size-6" />
            </a>
          </div>
        </div>

        {/* Copyright - Centralizado */}
        <div className="mt-8 text-center text-sm text-base-content/70 dark:text-base-content/50">
          <p>
            © {new Date().getFullYear()} ImageLite. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            Desenvolvido com <span className="text-primary">Next.js</span> e ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};