export function useErrorHandler(addNotification) {
  const handleError = (error, customMessage) => {    
    if (!error) {
      if (!customMessage) return;
      showError('Error', customMessage || 'An unknown error occurred.');
      return;
    }

    const errorMessage =
      error?.response?.data?.message || 
      error?.message || 
      error?.statusText || 
      customMessage ||
      'An unknown error occurred.'; 

    if (error._handled) return;
    error._handled = true;

    if (error?.status && typeof error.status === 'number') {
      const status = error.status;

      switch (status) {
        case 400:
          showError('Bad Request', errorMessage);
          break;
        case 401:
          showError('Unauthorized', 'Please log in.');
          break;
        case 403:
          showError('Forbidden', 'You do not have access to this resource.');
          break;
        case 404:
          showError('Not Found', 'The requested resource does not exist.');
          break;
        case 500:
          showError('Server Error', 'Please try again later.');
          break;
        default:
          showError('HTTP Error', errorMessage);
      }
      return;
    }

    // Firebase specific error handling
    if (error?.code) {
      switch (error.code) {
        case 'auth/invalid-credential':
          showError('Invalid Credentials', 'The provided email or password is invalid. Please try again.');
          break;
        case 'auth/user-not-found':
          showError('User Not Found', 'No account found with this email. Please register or try again.');
          break;
        case 'auth/wrong-password':
          showError('Wrong Password', 'The password you entered is incorrect. Please try again.');
          break;
        case 'auth/email-already-in-use':
          showError('Email Already In Use', 'This email is already registered. Please log in or use a different email.');
          break;
        case 'auth/weak-password':
          showError('Weak Password', 'Your password is too weak. Password should be 6 characters.');
          break;
        case 'auth/too-many-requests':
          showError('Too Many Attempts', 'You have made too many attempts. Please try again later.');
          break;
        case 'auth/network-request-failed':
          showError('Network Error', 'A network error occurred. Please check your connection and try again.');
          break;
        default:
          showError('Authentication Error', 'An unexpected error occurred. Please try again.');
      }
      return;
    }

    // Generic error handling
    showError('Error', errorMessage);
  };

  const showError = (title, description) => {
    addNotification("error", `${title}: ${description}`);
  };

  return { handleError };
}
