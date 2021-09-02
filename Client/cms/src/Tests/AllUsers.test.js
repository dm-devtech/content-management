import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from '../App';
import AllUsers from '../Pages/AllUsers';

describe('test all Users view', () => {
  test('renders without crashing', () => {
    render(<App />, { wrapper: BrowserRouter });
  });

  test('check page title exists', () => {
    const {getByText} = render(<AllUsers/>, { wrapper: BrowserRouter })
    const title = getByText(/User View/i)
    expect(title).toBeInTheDocument();
  });

  test('check no users title', () => {
    const {getByText} = render(<AllUsers/>, { wrapper: BrowserRouter })
    const title = getByText(/No Users/i)
    expect(title).toBeInTheDocument();
  });

  test('Home button exists', () => {
    const {getByText} = render(<AllUsers/>, { wrapper: BrowserRouter })
    expect(getByText("Home")).toBeInTheDocument();
  });

  test('adding a user', async () => {
    const fakeApi = [{email:"testemail@test.com", password:"12345678", role:"admin", date_created:"2021-09-02"}]

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
        status: 200
      };
      return Promise.resolve(fetchResponse);
    })

    const {getByTestId} = render(<AllUsers/>, { wrapper: BrowserRouter })
    const user = getByTestId('user')
    
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent("User email: testemail@test.com"))
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent("User Role: admin"))
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent("Date Created: 2021-09-02"))
  })

  test('deleting user', async () => {
    const fakeApi = [{email:"testemail@test.com", password:"12345678", role:"admin", date_created:"2021-09-02"}]
    
    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
        status: 200
      };
      return Promise.resolve(fetchResponse);
    })

    const {getByTestId} = render(<AllUsers/>, { wrapper: BrowserRouter })
    const user = getByTestId('user')

    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent("User email: testemail@test.com"))
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent("User Role: admin"))
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent("Date Created: 2021-09-02"))

    const deleteButton = getByTestId("delete-button")
    fireEvent.click(deleteButton);

    const {getByText} = render(<AllUsers/>, { wrapper: BrowserRouter })
    const title = getByText(/No Users/i)

    await waitFor(() => expect(title).toBeInTheDocument())
  })
})


