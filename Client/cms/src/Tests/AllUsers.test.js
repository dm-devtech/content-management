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

  test('data is retrieved when page loads', () => {
    const spy = jest.spyOn(AllUsers.prototype, 'getUserData')
    const { getByText } = render(<AllUsers/>, { wrapper: BrowserRouter });
    expect(spy).toHaveBeenCalled();
    AllUsers.prototype.getUserData.mockRestore();
  });

  test('Home button exists', () => {
    const {getByText} = render(<AllUsers/>, { wrapper: BrowserRouter })
    expect(getByText("Home")).toBeInTheDocument();
  });
})
