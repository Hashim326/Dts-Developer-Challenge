import { CanActivateFn } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

export const authGuard: CanActivateFn = () => {
const tokenExists = !!localStorage.getItem('token'); 

  if (tokenExists) {
    try {
      const token: string = localStorage.getItem('token')!
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwtDecode(token);
      
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {

        localStorage.removeItem('authToken');
        return authFailed();
      }
      
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      return authFailed();
    }

  } else {
    return authFailed();
  }
};

function authFailed(): boolean {
  window.location.href = '/login';    
  return false;
}
