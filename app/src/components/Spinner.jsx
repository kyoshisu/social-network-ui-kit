import { memo } from 'react';

function Spinner() {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Загрузка...</p>
    </div>
  );
}

export default memo(Spinner);
