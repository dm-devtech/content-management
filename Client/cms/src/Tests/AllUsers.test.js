import { render, screen } from '@testing-library/react';
import App from './App';
import AllUsers from './Pages/AllUsers';

it('renders without crashing', () => {
  render(<App />);
});

test('check page title exists', () => {
  render(<AllUsers />);
  const linkElement = screen.getByText(/Content View/i);
  expect(linkElement).toBeInTheDocument();
});

test('renderse the word title in page', () => {
  render(<AllUsers />);
  const title = screen.getByText(/email:/i);
  expect(title).toBeInTheDocument();
});

test('renders the word content', () => {
  render(<AllUsers />);
  const content = screen.getByText(/role/i);
  expect(content).toBeInTheDocument();
});
