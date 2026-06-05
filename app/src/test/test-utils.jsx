import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ShopProvider } from '../context/ShopContext';

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <ShopProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </ShopProvider>
  );
}
