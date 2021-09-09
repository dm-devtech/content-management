import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Footer from '../Pages/Footer';

describe('Testing <Footer />', () => {
  test('Home button when clicked is called', () => {
    const click = jest.fn();
    const { getByText } = render(<Footer props={click} />, { wrapper: BrowserRouter });
    const homeButton = getByText("Home")
    fireEvent.click(homeButton)
    expect(click).toHaveBeenCalled();
  });
})
