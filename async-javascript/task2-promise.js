function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === '/api/users') {
        resolve([
          { id: 1, name: 'Алексей' },
          { id: 2, name: 'Ольга' },
          { id: 3, name: 'Дмитрий' }
        ]);
      } else if (url === '/api/users/1') {
        resolve({
          id: 1,
          name: 'Алексей',
          email: 'alexey@example.com',
          city: 'Москва'
        });
      } else {
        reject(new Error('Не удалось загрузить данные: ' + url));
      }
    }, 2000);
  });
}

fetchData('/api/users')
  .then((users) => {
    console.log('Пользователи:', users);
    const firstUser = users[0];
    return fetchData('/api/users/' + firstUser.id);
  })
  .then((userInfo) => {
    console.log('Информация о первом пользователе:', userInfo);
  })
  .catch((error) => {
    console.error('Ошибка:', error.message);
  });
