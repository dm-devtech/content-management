import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import AddContent from '../Pages/AddContent';
jest.mock('../Helpers/deleteContent');
import deleteContent from '../Helpers/deleteContent';
jest.mock('../Helpers/getAllContent');
import getAllContent from '../Helpers/getAllContent';
jest.mock('../Helpers/getContentById');
import getContentById from '../Helpers/getContentById';
jest.mock('../Helpers/postContent');
import postContent from '../Helpers/postContent';

describe('<AddContent />', () => {
  test('renders without crashing', () => {
    render(<AddContent />, { wrapper: BrowserRouter });
  });

  test('check page title exists', () => {
    const {getByText} = render(<AddContent/>, { wrapper: BrowserRouter })
    expect(getByText("Content View")).toBeInTheDocument();
  });

  test('Home button exists', () => {
    const {getByText} = render(<AddContent/>, { wrapper: BrowserRouter })
    expect(getByText("Home")).toBeInTheDocument();
  });

  test('testing getting all content', async () => {
    getAllContent.mockImplementation(() => [{title:"test header", content:"test body", date_created:"2021-09-03"}])

    const {getByTestId} = render(<AddContent/>, { wrapper: BrowserRouter })
    const user = getByTestId('info')

    await waitFor(() => expect(screen.getByTestId('info')).toHaveTextContent("Title: test header"))
    await waitFor(() => expect(screen.getByTestId('info')).toHaveTextContent("Content: test body"))
    await waitFor(() => expect(screen.getByTestId('info')).toHaveTextContent("Date Created: 2021-09-03"))
  })

  test('testing undefined response', async () => {
    getAllContent.mockImplementation(() => undefined)

    const {getByTestId} = render(<AddContent/>, { wrapper: BrowserRouter })
    const user = getByTestId('info')

    await waitFor(() => expect(screen.getByTestId('info')).toHaveTextContent("Title: -"))
    await waitFor(() => expect(screen.getByTestId('info')).toHaveTextContent("Content: -"))
    await waitFor(() => expect(screen.getByTestId('info')).toHaveTextContent("Date Created: -"))
  })

   test('testing deleting content', async () => {
    getAllContent.mockImplementation(() => [{title:"test header", content:"test body", date_created:"2021-09-03"}])

    const {getByTestId} = render(<AddContent/>, { wrapper: BrowserRouter })

    await waitFor(() => expect(screen.getByTestId('header-title')).toHaveTextContent("Title: test header"))
    await waitFor(() => expect(screen.getByTestId('header-body')).toHaveTextContent("Content: test body"))
    await waitFor(() => expect(screen.getByTestId('header-date')).toHaveTextContent("Date Created: 2021-09-03"))

    const deleteButton = getByTestId("delete-button")
    fireEvent.click(deleteButton);

    const {getByText} = render(<AddContent/>, { wrapper: BrowserRouter })
    const title = getByText("Title: -")
    const body = getByText("Content: -")
    const date = getByText('Date Created: -')

    await waitFor(() => expect(title).toBeInTheDocument())
    await waitFor(() => expect(body).toBeInTheDocument())
    await waitFor(() => expect(date).toBeInTheDocument())
  })

  // test.only('testing deleting content', async () => {
  //   retrieveUserData.mockImplementation(() => 1)

  //   const { getByText, getByTestId } = render(<Home />);
  //   const submitButton = getByTestId("Submit")

  //   fireEvent.change(getByTestId("input-field"), { target: { value: 'otherUser' } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => expect(getByTestId("")).toBeInTheDocument())
  // })

})
