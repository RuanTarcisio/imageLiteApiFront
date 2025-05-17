"use client";

import { useRouter } from 'next/navigation';
import { useAuthStore, useUserStore } from '@/contexts';
import { NotAuthenticatedError, UserIdNotAvailableError } from '@/errors/AuthErrors';
import { useEffect, useState } from 'react';
import { ProfileForm, Template } from '@/components';
import { useNotification } from '@/hooks/useNotification';

const UserProfilePage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { user, fetchUser, updateUser } = useUserStore();
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      throw new NotAuthenticatedError();
    }

    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (error) {
        if (error instanceof UserIdNotAvailableError) {
          router.push('/login');
        } else {
          showNotification('Falha ao carregar dados do usuário', 'error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [isAuthenticated, router, fetchUser, showNotification]);

  const handleUpdateProfile = async (values: any) => {
    try {
      await updateUser(values);
      showNotification('Perfil atualizado com sucesso!', 'success');
      setIsEditing(false);
    } catch (error) {
      showNotification('Falha ao atualizar perfil', 'error');
    }
  };

  if (isLoading || !user) {
    return (
      <Template>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      {isEditing ? (
        <ProfileForm 
          user={{
            name: user.name,
            email: user.email,
            birthdate: user.birthdate || null,
            profileImage: user.profileImage
          }}
          onSubmit={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Cabeçalho com foto de capa */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          {/* Seção do perfil */}
          <div className="px-8 py-6 relative">
            {/* Nome e ações */}
            <div className="pt-20 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-indigo-600 dark:text-indigo-400">{user.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Editar Perfil
              </button>
            </div>

            {/* Informações do perfil */}
            <div className="mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações Pessoais</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome Completo</p>
                    <p className="mt-1 text-gray-900 dark:text-white">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">E-mail</p>
                    <p className="mt-1 text-gray-900 dark:text-white">{user.email}</p>
                  </div>

                  {user.birthdate && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Nascimento</p>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {new Date(user.birthdate).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Template>
  );
};

export default UserProfilePage;