import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {

  it('should render Spinner correctly', () => {
    render(
      <Spinner />,
    );

    expect(screen.getByTestId('hidden-text')).toBeInTheDocument();
  });

});
