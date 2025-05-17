"use client";

import { AuthenticatedPage, Template } from '@/components';
import { useAuthStore } from '@/contexts/AuthStore';
import { useNotification } from '@/hooks/useNotification';

const UserSettingsPage = () => {
  const { logout } = useAuthStore();
  const { showNotification } = useNotification();

  const handleDeleteAccount = async () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      try {
        // await deleteAccount();
        showNotification('Conta excluída com sucesso', 'success');
        await logout();
      } catch (error) {
        showNotification('Falha ao excluir conta', 'error');
      }
    }
  };

  return (
    <Template>
      <AuthenticatedPage>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações da Conta</h2>
            <p className="text-gray-600 dark:text-gray-300">Gerencie suas preferências de conta</p>
          </div>

          <div className="space-y-6">
            {/* Seção de Segurança */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Segurança</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Senha</p>
                    <p className="mt-1 text-gray-900 dark:text-white">Alterada há 3 meses</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300">
                    Alterar Senha
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Autenticação em Dois Fatores</p>
                    <p className="mt-1 text-gray-900 dark:text-white">Desativada</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-all duration-300">
                    Ativar 2FA
                  </button>
                </div>
              </div>
            </div>

            {/* Seção de Notificações */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notificações</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notificações por E-mail</p>
                    <p className="mt-1 text-gray-900 dark:text-white">Receba atualizações por e-mail</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notificações Push</p>
                    <p className="mt-1 text-gray-900 dark:text-white">Receba atualizações no seu dispositivo</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Área de Risco */}
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-100 dark:border-red-900/20">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4">Área de Risco</h3>
                <button 
                  onClick={handleDeleteAccount}
                  className="w-full text-left p-3 text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors flex justify-between items-center"
                >
                  <span>Excluir Conta</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedPage>
    </Template>
  );
};

export default UserSettingsPage;