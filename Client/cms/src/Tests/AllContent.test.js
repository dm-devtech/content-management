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

  // test.only('check delete button available', async done => {
  //   const mockData = jest.fn({title: "test email", content: "password", date_created: "2021-05-12"})
  //   const getContentSpy = jest.spyOn(AllContent.prototype, 'getContentData').mockReturnValue(mockData)
  //   const deleteContentSpy = jest.spyOn(AllContent.prototype, 'deleteContent')
  //   const { getByText } = render(<AllContent/>, { wrapper: BrowserRouter });
  //   const deleteButton = waitFor(() => { getByText("Delete") });
  //   fireEvent.click(deleteButton)
  //   expect(getContentSpy).toHaveBeenCalled();
  //   expect(deleteContentSpy).toHaveBeenCalled();
  //   AllContent.prototype.getContentData.mockRestore();
  // });

  test('data is retrieved when page loads', () => {
    const spy = jest.spyOn(AllContent.prototype, 'getContentData')
    const { getByText } = render(<AllContent/>, { wrapper: BrowserRouter });
    expect(spy).toHaveBeenCalled();
    AllContent.prototype.getContentData.mockRestore();
  });

})
