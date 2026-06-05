import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('показывает текст загрузки', () => {
    render(<Spinner />);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
