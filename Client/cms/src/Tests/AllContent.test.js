import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from '../App';
import AllContent from '../Pages/AllContent';

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
    const fakeApi = [{title:"test header", content:"test body", date_created:"2021-09-03"}]

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
        status: 200
      };
      return Promise.resolve(fetchResponse);
    })

    const {getByTestId} = render(<AllContent/>, { wrapper: BrowserRouter })
    const user = getByTestId('content')
    
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Title: test header"))
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Content: test body"))
    await waitFor(() => expect(screen.getByTestId('content')).toHaveTextContent("Date Created: 2021-09-03"))
  })

  test('deleting record', async () => {
    const fakeApi = [{title:"test header", content:"test body", date_created:"2021-09-03"}]

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
        status: 200
      };
      return Promise.resolve(fetchResponse);
    })

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
