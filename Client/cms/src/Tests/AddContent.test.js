import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  test('When previous content button clicked moveContent function called', () => {
    const spy = jest.spyOn(AddContent.prototype, 'moveContent');
    const { getByText } = render(<AddContent/>, { wrapper: BrowserRouter });
    const prevContentButton = getByText("Previous Content")
    fireEvent.click(prevContentButton)
    expect(spy).toHaveBeenCalled();
    AddContent.prototype.moveContent.mockRestore();
  });

  test('When next content button clicked moveContent function called', () => {
    const spy = jest.spyOn(AddContent.prototype, 'moveContent');
    const { getByText } = render(<AddContent/>, { wrapper: BrowserRouter });
    const nextContentButton = getByText("Next Content")
    fireEvent.click(nextContentButton)
    expect(spy).toHaveBeenCalled();
    AddContent.prototype.moveContent.mockRestore();
  });

  test('When delete button clicked deleteContent function called', () => {
    const spy = jest.spyOn(AddContent.prototype, 'deleteContent');
    const { getByText } = render(<AddContent/>, { wrapper: BrowserRouter });
    const deleteContentButton = getByText("Delete Content")
    fireEvent.click(deleteContentButton)
    expect(spy).toHaveBeenCalled();
    AddContent.prototype.deleteContent.mockRestore();
  });

  test('When submit button clicked postNewContent function called', () => {
    const spy = jest.spyOn(AddContent.prototype, 'postNewContent');
    const { getByTestId } = render(<AddContent/>, { wrapper: BrowserRouter });
    const submitButton = getByTestId("Submit")
    fireEvent.click(submitButton)
    expect(spy).toHaveBeenCalled();
    AddContent.prototype.postNewContent.mockRestore();
  });

})
