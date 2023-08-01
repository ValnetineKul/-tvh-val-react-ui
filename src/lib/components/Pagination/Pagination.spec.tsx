import React from 'react';
import { render, screen, userEvent, within, initResponsiveTest } from '../../test-utils';
import Pagination from './Pagination';

jest.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}));

describe('Pagination', () => {
  it('Should render correctly', () => {
    const handlePageChange = jest.fn();
    const handleItemsPerPageChange = jest.fn();
    const { container } = render(
      <Pagination
        page={2}
        numberOfPages={3}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each([
    ['page 2', 2],
    ['Go to page 3', 3],
    ['Go to previous page', 1],
    ['Go to next page', 3],
  ])('Should emit the new page on clicking button %s', (buttonRoleName, expectedPage) => {
    const handlePageChange = jest.fn();
    render(<Pagination page={2} numberOfPages={3} onPageChange={handlePageChange} />);

    const button = screen.getByRole('button', { name: buttonRoleName });
    userEvent.click(button);
    expect(handlePageChange).toHaveBeenCalledWith(expectedPage, expect.anything());
  });

  it('Should emit the value on items per page change', () => {
    initResponsiveTest('Desktop');

    const handleItemsPerPageChange = jest.fn();
    const handlePageChange = jest.fn();
    render(
      <Pagination
        page={2}
        numberOfPages={3}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    );

    const dropdown = screen.getByRole('button', { name: '10' });
    expect(dropdown.textContent).toMatch(/10/);
    userEvent.click(dropdown);

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    const fiftyButton = screen.getByRole('button', { name: '50' });
    userEvent.click(fiftyButton);

    expect(handleItemsPerPageChange).toHaveBeenCalledWith(50);
  });

  it.each([
    [2, 3, 2],
    [10, 20, 3],
    [7, 10, 2],
    [5, 10, 3],
    [2, 10, 3],
    [3, 10, 3],
    [5, 7, 2],
  ])('Should render ellipsis at the end when page are infinite', (page, numberOfPages, orderFromEnd) => {
    const handleItemsPerPageChange = jest.fn();
    const handlePageChange = jest.fn();

    render(
      <Pagination
        page={page}
        numberOfPages={numberOfPages}
        itemsPerPage={1}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        isNumberOfPagesUnknown
      />
    );

    const paginationItems = screen.getAllByRole('listitem');
    const infiniteEllipsis = within(paginationItems[paginationItems.length - orderFromEnd]).getByText(/\u2026/i);

    expect(infiniteEllipsis).toBeInTheDocument();
  });
});
