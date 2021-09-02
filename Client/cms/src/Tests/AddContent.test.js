import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import AddContent from '../Pages/AddContent';

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

  // test.only('testing result', async () => {
  //   const fakeApi = [{title:"test header", content:"test body", date_created:"2021-09-03"}]

  //   const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
  //     const fetchResponse = {
  //       ok: true,
  //       json: () => Promise.resolve(fakeApi),
  //       status: 200
  //     };
  //     return Promise.resolve(fetchResponse);
  //   })

  //   const { getByTestId } = render(<AddContent />, { wrapper: BrowserRouter });
  //   const submitButton = getByTestId("Submit")

  //   fireEvent.change(getByTestId("title"), { target: { value: 'test header' } });
  //   fireEvent.change(getByTestId("body"), { target: { value: 'test body' } });
  //   fireEvent.click(submitButton);

  //   const {getByText} = render(<AddContent/>, { wrapper: BrowserRouter })
  //   const heading = getByText("test header")
  //   const body = getByText("test body")

  //   await waitFor(() => expect(heading).toBeInTheDocument())
  //   await waitFor(() => expect(body).toBeInTheDocument())
  // })

})
