import { memo, useEffect, useState } from 'react';

function NetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [message, setMessage] = useState('');

  useEffect(() => {
    function handleOnline() {
      setOnline(true);
      setMessage('Соединение восстановлено');
    }

    function handleOffline() {
      setOnline(false);
      setMessage('Вы в офлайне');
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setMessage('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <div className={'network-dot ' + (online ? 'network-dot--on' : 'network-dot--off')} title={online ? 'Онлайн' : 'Офлайн'} />
      {message && (
        <div className={'network-toast ' + (online ? 'network-toast--ok' : 'network-toast--off')} role="status">
          {message}
        </div>
      )}
    </>
  );
}

export default memo(NetworkStatus);
