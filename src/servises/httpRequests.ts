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
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(body),
  };
  return completedFetch(url, options);
};

export const get = (url: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
  };

  return completedFetch(url, options);
}

export const patch = (url: string, body: object) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(body),
  };

  return completedFetch(url, options);
}

export const put = (url: string, body: object) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(body),
  };

  return completedFetch(url, options);
}

export const deleteRequest = (url: string) => {
  const options = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
  };

  return completedFetch(url, options);
}
