import { toast } from 'react-toastify';

export const ApiError = (error: any) => {
  if (error.status === 'FETCH_ERROR') {
    toast.error(error.error, { theme: 'colored' });
  } else if (error.status === 'PARSING_ERROR') {
    if (error.originalStatus === 401) {
      toast.error(error.data, { theme: 'colored' });
      localStorage.removeItem('auth');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } else {
      toast.error(error.data, { theme: 'colored' });
    }
  } else if (error.data.error) {
    if (error.status === 400) {
      toast.info(error.data.error, { theme: 'colored' });
    } else {
      toast.error(error.data.error, { theme: 'colored' });
    }
  } else {
    toast.error('Unknown error', { theme: 'colored' });
  }
};
