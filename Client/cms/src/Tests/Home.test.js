import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Home from '../Pages/Home';

describe('<Home />', () => {
  it('renders without crashing', () => {
    render(<Home />, { wrapper: BrowserRouter });
  });

  test('check page title exists', () => {
    const {getByText} = render(<Home/>, { wrapper: BrowserRouter })
    expect(getByText("Content Manager")).toBeInTheDocument();
  });

  test('renders All content button with correct text content', () => {
    const {getByText} = render(<Home/>, { wrapper: BrowserRouter })
    expect(getByText("All Content")).toHaveTextContent("All Content")
  })

  test('renders add content button with correct text content', () => {
    const {getByText} = render(<Home/>, { wrapper: BrowserRouter })
    expect(getByText("Add Content")).toHaveTextContent("Add Content")
  })

  test('renders All users button with correct text content', () => {
    const {getByText} = render(<Home/>, { wrapper: BrowserRouter })
    expect(getByText("All Users")).toHaveTextContent("All Users")
  })

  test('renders add user button with correct text content', () => {
    const {getByText} = render(<Home/>, { wrapper: BrowserRouter })
    expect(getByText("Add User")).toHaveTextContent("Add User")
  })

  test('All Content button when clicked goes to true', () => {
    const click = jest.fn();
    const { getByText } = render(<Home props={click} />, { wrapper: BrowserRouter });
    const allContentButton = getByText("All Content")
    fireEvent.click(allContentButton)
    expect(click).toHaveBeenCalled();
  });

  test('Add content button when clicked goes to true', () => {
    const click = jest.fn();
    const { getByText } = render(<Home props={click} />, { wrapper: BrowserRouter });
    const addContentButton = getByText("Add Content")
    fireEvent.click(addContentButton)
    expect(click).toHaveBeenCalled();
  });

  test('All Users button when clicked goes to true', () => {
    const click = jest.fn();
    const { getByText } = render(<Home props={click} />, { wrapper: BrowserRouter });
    const allUsersButton = getByText("All Users")
    fireEvent.click(allUsersButton)
    expect(click).toBeCalled();
  });

  test('Add User button when clicked goes to true', () => {
    const click = jest.fn();
    const { getByText } = render(<Home props={click} />, { wrapper: BrowserRouter });
    const addUserButton = getByText("Add User")
    fireEvent.click(addUserButton)
    expect(click).toHaveBeenCalled();
  });
})
