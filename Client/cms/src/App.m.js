import { render, screen } from '@testing-library/react';
import App from './App';
import List from './Pages/List';

// it('renders without crashing', () => {
//   render(<App />);
// });
//
// test('check page title exists', () => {
//   render(<List />);
//   const linkElement = screen.getByText(/Content View/i);
//   expect(linkElement).toBeInTheDocument();
// });
//
// test('renderse the word title in page', () => {
//   render(<List />);
//   const title = screen.getByText(/Title:/i);
//   expect(title).toBeInTheDocument();
// });
//
// test('renders the word content', () => {
//   render(<List />);
//   const content = screen.getByText(/Content/i);
//   expect(content).toBeInTheDocument();
// });
//
// it('strike button when clicked goes to true - not mocked', () => {
//   let clicked = false;
//   const { getByText } = render(<List />);
//   const deleteButton = getByText(/Delete Content/i)
//   fireEvent.click(deleteButton)
//   expect(clicked).toBe(true)
// });
