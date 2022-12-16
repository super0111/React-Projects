import { jsonQuery, query, setLocalToken, getLocalToken, setUserId } from './common';
import jwtDecode from 'jwt-decode';

export async function signupWithAPI(data) {
  const res = await jsonQuery(`/register`, 'POST', data, false);
  return res;
}

export async function loginWithAPI(data) {
  const res = await jsonQuery(`/login/`, 'POST', data, false);
  if (res.token) {
    setLocalToken(JSON.stringify(res));
  }
  return res;
}

export async function logoutWithAPI(data) {

  return await query(`/logout/`);

}

export function getCurrentUser() {

  try {

    const info = getLocalToken();
    const data = jwtDecode(info.token);

    if (data.exp <= Date.now()) {
      setUserId(data.sub);
      return data.sub;
    } else {
      return null;
    }

  } catch (ex) {
    return null;
  }

}
