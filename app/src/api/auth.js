const REQRES_URL = 'https://reqres.in/api/login';
const DUMMYJSON_URL = 'https://dummyjson.com/auth/login';

const DEMO_EMAIL = 'eve.holt@reqres.in';
const DEMO_PASSWORD = 'cityslicka';

function createDemoToken() {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: DEMO_EMAIL,
      exp: Math.floor(Date.now() / 1000) + 86400
    })
  );
  return `${header}.${payload}.demo`;
}

async function tryReqres(email, password) {
  const apiKey = import.meta.env.VITE_REQRES_API_KEY;
  const headers = { 'Content-Type': 'application/json' };

  if (apiKey) {
    headers['x-api-key'] = apiKey;
    headers['X-Reqres-Env'] = 'prod';
  }

  const response = await fetch(REQRES_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return { token: data.token, user: { email, name: email.split('@')[0] } };
}

async function tryDummyJson(login, password) {
  const response = await fetch(DUMMYJSON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: login, password })
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return {
    token: data.accessToken,
    user: {
      email: data.email,
      name: data.firstName || data.username
    }
  };
}

export async function loginRequest(email, password) {
  const loginName = email.includes('@') ? email.split('@')[0] : email;

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const reqres = await tryReqres(email, password);
    if (reqres) {
      return reqres;
    }
    return {
      token: createDemoToken(),
      user: { email, name: 'eve.holt' }
    };
  }

  const dummy = await tryDummyJson(loginName, password);
  if (dummy) {
    return dummy;
  }

  const reqres = await tryReqres(email, password);
  if (reqres) {
    return reqres;
  }

  throw new Error('Неверный email или пароль');
}
