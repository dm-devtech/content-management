import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from '../App';
import AllContent from '../Pages/AllContent';
jest.mock('../Helpers/getAllContent');
import getAllContent from '../Helpers/getAllContent';

describe('test all content view', () => {
  test('renders without crashing', () => {
    render(<App />, { wrapper: BrowserRouter });
  });

  test('check page title exists', () => {
    const {getByText} = render(<AllContent/>, { wrapper: BrowserRouter })
    const title = getByText(/Content View/i)
    expect(title).toBeInTheDocument();
  });

  test('check no content title', () => {
    const {getByText} = render(<AllContent/>, { wrapper: BrowserRouter })
    const title = getByText(/No Content/i)
    expect(title).toBeInTheDocument();
  });

  test('Home button exists', () => {
    const {getByText} = render(<AllContent/>, { wrapper: BrowserRouter })
    expect(getByText("Home")).toBeInTheDocument();
  });

  test('adding content', async () => {
    getAllContent.mockImplementation(() => [{title:"test header", content:"test body", date_created:"2021-09-03"}])

    const {getByTestId} = render(<AllContent/>, { wrapper: BrowserRouter })
    const user = getByTestId('content')
    
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Title: test header"))
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Content: test body"))
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Date Created: 2021-09-03"))
  })

  test('deleting record', async () => {
    getAllContent.mockImplementation(() => [{title:"test header", content:"test body", date_created:"2021-09-03"}])

    const {getByTestId} = render(<AllContent/>, { wrapper: BrowserRouter })
    const user = getByTestId('content')

    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Title: test header"))
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Content: test body"))
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Date Created: 2021-09-03"))

    const deleteButton = getByTestId("delete-button")
    fireEvent.click(deleteButton);

    const {getByText} = render(<AllContent/>, { wrapper: BrowserRouter })
    const title = getByText(/No Content/i)

    await waitFor(() => expect(title).toBeInTheDocument())
  })
})
