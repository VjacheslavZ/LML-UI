const completedFetch = (url: string, options: object) => fetch(url, options)
  .then(res => {
    if (res.ok) {
      return res;
    }

    return Promise.reject(res);
  })
  .catch(res => {
    if ((res.status === 401 || res.status === 409) && window.location.pathname !== '/login') {
      localStorage.removeItem('accessToken')
      // window.location = '/login';
    }

    return (res.name === 'AbortError')
      ? Promise.reject()
      : res.json()
        .then((message: any) => Promise.reject(message));
  });

export const post = (url: string, body: object) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return completedFetch(url, options);
};
