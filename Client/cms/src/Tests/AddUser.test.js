import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import AddUser from '../Pages/AddUser';

jest.mock('../Helpers/deleteUser');
import deleteUser from '../Helpers/deleteUser';
jest.mock('../Helpers/getAllUsers');
import getAllUsers from '../Helpers/getAllUsers';
jest.mock('../Helpers/getUserById');
import getUserById from '../Helpers/getUserById';
jest.mock('../Helpers/postUser');
import postUser from '../Helpers/postUser';

describe('<AddContent />', () => {
  test('renders without crashing', () => {
    render(<AddUser />, { wrapper: BrowserRouter });
  });

  test('check page title exists', () => {
    const {getByText} = render(<AddUser/>, { wrapper: BrowserRouter })
    expect(getByText("User View")).toBeInTheDocument();
  });

  test('Home button exists', () => {
    const {getByText} = render(<AddUser/>, { wrapper: BrowserRouter })
    expect(getByText("Home")).toBeInTheDocument();
  });

  test('testing getting all content', async () => {
    getAllUsers.mockImplementation(() => [{email: "test email", password: "test password", role: "test role", date_created:"2021-09-03"}])

    const {getByTestId} = render(<AddUser/>, { wrapper: BrowserRouter })
    const email = getByTestId('user-email')
    const role = getByTestId('user-role')
    const date = getByTestId('user-date')

    await waitFor(() => expect(screen.getByTestId('user-email')).toHaveTextContent("User Email: test email"))
    await waitFor(() => expect(screen.getByTestId('user-role')).toHaveTextContent("User Role: test role"))
    await waitFor(() => expect(screen.getByTestId('user-date')).toHaveTextContent("Date Created: 2021-09-03"))
  })

  test('testing undefined response', async () => {
    getAllUsers.mockImplementation(() => undefined)

    const {getByTestId} = render(<AddUser/>, { wrapper: BrowserRouter })

    await waitFor(() => expect(screen.getByTestId('user-email')).toHaveTextContent("User Email: -"))
    await waitFor(() => expect(screen.getByTestId('user-role')).toHaveTextContent("User Role: -"))
    await waitFor(() => expect(screen.getByTestId('user-date')).toHaveTextContent("Date Created: -"))
  })

   test('testing deleting content', async () => {
    getAllUsers.mockImplementation(() => [{email: "test email", password: "test password", role: "test role", date_created:"2021-09-03"}])

    const {getByTestId} = render(<AddUser/>, { wrapper: BrowserRouter })

    await waitFor(() => expect(screen.getByTestId('user-email')).toHaveTextContent("User Email: test email"))
    await waitFor(() => expect(screen.getByTestId('user-role')).toHaveTextContent("User Role: test role"))
    await waitFor(() => expect(screen.getByTestId('user-date')).toHaveTextContent("Date Created: 2021-09-03"))

    const deleteButton = getByTestId("delete-user")
    fireEvent.click(deleteButton);

    const {getByText} = render(<AddUser/>, { wrapper: BrowserRouter })
    const user = getByText("User Email: -")
    const role = getByText("User Role: -")
    const date = getByText('Date Created: -')

    await waitFor(() => expect(user).toBeInTheDocument())
    await waitFor(() => expect(role).toBeInTheDocument())
    await waitFor(() => expect(date).toBeInTheDocument())
  })

  // test('testing cycling content forward', async () => {
  //   getAllContent.mockImplementation(() => [{title:"test header 1", content:"test body 1", date_created:"2021-09-01"}, {title:"test header 2", content:"test body 2", date_created:"2021-09-02"}])

  //   const {getByTestId} = render(<AddContent/>, { wrapper: BrowserRouter })

  //   await waitFor(() => expect(screen.getByTestId('header-title')).toHaveTextContent("Title: test header 1"))
  //   await waitFor(() => expect(screen.getByTestId('header-body')).toHaveTextContent("Content: test body 1"))
  //   await waitFor(() => expect(screen.getByTestId('header-date')).toHaveTextContent("Date Created: 2021-09-01"))

  //   const nextButton = getByTestId("next-button")
  //   fireEvent.click(nextButton);
  //   fireEvent.click(nextButton);
  //   fireEvent.click(nextButton);

  //   const {getByText} = render(<AddContent/>, { wrapper: BrowserRouter })
  //   const title = getByText("Title: test header 2")
  //   const body = getByText("Content: test body 2")
  //   const date = getByText("Date Created: 2021-09-02")

  //   await waitFor(() => expect(title).toBeInTheDocument())
  //   await waitFor(() => expect(body).toBeInTheDocument())
  //   await waitFor(() => expect(date).toBeInTheDocument())
  // })

  test('testing adding content calls post and get', async () => {
    getAllUsers.mockImplementation(() => [{email: "test email", password: "test password", role: "test role", date_created:"2021-09-03"}])
    postUser.mockImplementation(() => {} )

    const { getByTestId } = render(<AddUser/>, { wrapper: BrowserRouter });
    const submitButton = getByTestId("Submit")

    fireEvent.click(submitButton);

    expect(postUser.mock.calls.length).toBe(1);
    expect(getAllUsers.mock.calls.length).toBe(1);
  })
})
