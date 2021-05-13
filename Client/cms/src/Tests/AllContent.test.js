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

  test('data is retrieved when page loads', () => {
    const spy = jest.spyOn(AllContent.prototype, 'getContentData')
    const { getByText } = render(<AllContent/>, { wrapper: BrowserRouter });
    expect(spy).toHaveBeenCalled();
    AllContent.prototype.getContentData.mockRestore();
  });

  test('Home button exists', () => {
    const {getByText} = render(<AllContent/>, { wrapper: BrowserRouter })
    expect(getByText("Home")).toBeInTheDocument();
  });
})
