import decode from 'jwt-decode'
import { handleErrors } from './errors'

export const isAuth = () => {
  const token = localStorage.getItem('accessToken');
  if (!token)
    return false;

  return parse();
}

export const parse = () => {
  const token = localStorage.getItem('accessToken');
  try {
    const decoded = decode(token);
    if (decoded.exp > Date.now() / 1000) {
      return decoded;
    }
    else
      return null;
  }
  catch (err) {
    return null;
  }
}