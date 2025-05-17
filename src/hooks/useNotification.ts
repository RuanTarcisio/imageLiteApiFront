import { toast } from 'react-toastify';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const useNotification = () => {
  const showNotification = (
    message: string, 
    type: NotificationType = 'info',
    options?: object
  ) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      ...options,
    });
  };

  return { showNotification };
};

// export const useNotification = () => {
//   const notify = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
//     toast[type](message);
//   };

//   return { notify };
// };