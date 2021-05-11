import { render, screen } from '@testing-library/react';
import App from './App';
import AllContent from './Pages/AllContent';

it('renders without crashing', () => {
  render(<App />);
});

test('check page title exists', () => {
  render(<AllContent />);
  const linkElement = screen.getByText(/Content View/i);
  expect(linkElement).toBeInTheDocument();
});

test('renderse the word title in page', () => {
  render(<AllContent />);
  const title = screen.getByText(/Title:/i);
  expect(title).toBeInTheDocument();
});

test('renders the word content', () => {
  render(<AllContent />);
  const content = screen.getByText(/Content/i);
  expect(content).toBeInTheDocument();
});
