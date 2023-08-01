import React from 'react';
import { render, screen, userEvent } from '../../../test-utils';
import TableCell from './TableCell';

describe('TableCell', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Children</TableCell>
          </tr>
          <tr>
            <TableCell numeric>Children</TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('sortable', () => {
    it('Should render sort icon', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell onSortClick={jest.fn} sortBy="field" sortDirection="desc" sortProperty="field">
                Children
              </TableCell>
            </tr>
          </tbody>
        </table>
      );
      expect(screen.getByText(/arrowDown.svg/)).toBeInTheDocument();
    });

    it('Should trigger onSort', () => {
      const handleSortClick = jest.fn();
      render(
        <table>
          <tbody>
            <tr>
              <TableCell onSortClick={handleSortClick} sortBy="" sortDirection="asc" sortProperty="field">
                Children
              </TableCell>
            </tr>
          </tbody>
        </table>
      );

      const sortButton = screen.getByText(/arrowDownArrowUp.svg/);

      userEvent.click(sortButton);

      expect(handleSortClick).toBeCalledWith('field', 'asc');
    });

    it('Should reset sort', () => {
      const handleSortClick = jest.fn();
      render(
        <table>
          <tbody>
            <tr>
              <TableCell onSortClick={handleSortClick} sortBy="field" sortDirection="desc" sortProperty="field">
                Children
              </TableCell>
            </tr>
          </tbody>
        </table>
      );

      const sortButton = screen.getByText(/arrowDown.svg/);

      userEvent.click(sortButton);

      expect(handleSortClick).toBeCalledWith(null, 'asc');
    });
  });

  describe('editable', () => {
    it('Should render Edit field', () => {
      const handleEdit = jest.fn();
      const rowData = { text: 'text', number: 3 };
      render(
        <table>
          <tbody>
            <tr>
              <TableCell isEditActive editProperty="text" onEdit={handleEdit} rowData={rowData}>
                text
              </TableCell>
            </tr>
          </tbody>
        </table>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input).toBeInTheDocument();
    });

    it('Should trigger onEdit', () => {
      const handleEdit = jest.fn();
      const rowData = { text: 'text', number: 3 };
      render(
        <table>
          <tbody>
            <tr>
              <TableCell isEditActive editProperty="text" onEdit={handleEdit} rowData={rowData}>
                text
              </TableCell>
            </tr>
          </tbody>
        </table>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      userEvent.type(input, 't');
      expect(handleEdit).toHaveBeenCalled();
    });

    it('Should not render inner container', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell hasInnerContainer={false}>text</TableCell>
            </tr>
          </tbody>
        </table>
      );

      const cell = screen.getByText('text') as HTMLInputElement;

      expect(cell.className).not.toMatch('TableCell-innerRoot');
    });
  });
});
