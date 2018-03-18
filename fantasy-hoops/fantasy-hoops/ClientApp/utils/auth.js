import decode from 'jwt-decode'
import { handleErrors } from './errors'

export const isAuth = () => {
  const token = localStorage.getItem('accessToken');
  if(!token)
    return false;

  try {
    const decoded = decode(token);
    if (decoded.exp > Date.now() / 1000) {
      return true;
    }
    else
      return false;
  }
  catch (err) {
    return false;
  }
}