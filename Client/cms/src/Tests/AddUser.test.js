import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import AddUser from '../Pages/AddUser';

describe('<AddContent />', () => {
  test('renders without crashing', () => {
    render(<AddUser />, { wrapper: BrowserRouter });
  });

  test('check page title exists', () => {
    const {getByText} = render(<AddUser/>, { wrapper: BrowserRouter })
    expect(getByText("User View")).toBeInTheDocument();
  });

  test('When previous user button clicked moveContent function called', () => {
    const switchUserSpy = jest.spyOn(AddUser.prototype, 'switchUser');
    const { getByText } = render(<AddUser/>, { wrapper: BrowserRouter });
    const prevUserButton = getByText("Previous User")
    fireEvent.click(prevUserButton)
    expect(switchUserSpy).toHaveBeenCalledTimes(1);
    AddUser.prototype.switchUser.mockRestore();
  });

  test('When next user button clicked moveUser function called', () => {
    const switchUserSpy = jest.spyOn(AddUser.prototype, 'switchUser');
    const { getByText } = render(<AddUser/>, { wrapper: BrowserRouter });
    const nextUserButton = getByText("Next User")
    fireEvent.click(nextUserButton)
    expect(switchUserSpy).toHaveBeenCalledTimes(1);
    AddUser.prototype.switchUser.mockRestore();
  });

  test('When delete button clicked deleteUser function called', () => {
    const deleteUserSpy = jest.spyOn(AddUser.prototype, 'deleteUser');
    const { getByText } = render(<AddUser/>, { wrapper: BrowserRouter });
    const deleteUserButton = getByText("Delete User")
    fireEvent.click(deleteUserButton)
    expect(deleteUserSpy).toHaveBeenCalledTimes(1);
    AddUser.prototype.deleteUser.mockRestore();
  });

  test('When submit button clicked addNewUser function called', () => {
    const submitButtonSpy = jest.spyOn(AddUser.prototype, 'addNewUser');
    const { getByTestId } = render(<AddUser/>, { wrapper: BrowserRouter });
    const submitButton = getByTestId("Submit")
    fireEvent.click(submitButton)
    expect(submitButtonSpy).toHaveBeenCalledTimes(1);
    AddUser.prototype.addNewUser.mockRestore();
  });

  test('Home button exists', () => {
    const {getByText} = render(<AddUser/>, { wrapper: BrowserRouter })
    expect(getByText("Home")).toBeInTheDocument();
  });
})
