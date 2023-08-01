import React from 'react';
import { render, screen, userEvent } from '../../../test-utils';
import TableCell from '../TableCell';
import TableRow from './TableRow';

describe('TableRow', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow>
            <td>Children</td>
          </TableRow>
        </tbody>
      </table>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should not contain any tabIndex attribute', () => {
    render(
      <table>
        <tbody>
          <TableRow />
        </tbody>
      </table>
    );
    expect(screen.getByRole('row')).not.toHaveAttribute('tabindex');
  });

  describe('with "clickable" prop', () => {
    it('Should exist hidden table cell with ButtonBase component', () => {
      render(
        <table>
          <tbody>
            <TableRow clickable />
          </tbody>
        </table>
      );

      const buttonBaseCell = screen.getByRole('cell');
      expect(buttonBaseCell).toBeInTheDocument();
      expect(buttonBaseCell?.className).toMatch('-TableRow-visuallyHidden');
    });

    it('Should set correct tabIndex', () => {
      render(
        <table>
          <tbody>
            <TableRow clickable />
          </tbody>
        </table>
      );
      expect(screen.getByRole('row')).toHaveAttribute('tabindex', '0');
    });

    it('Should get callback on click', () => {
      const onRowClick = jest.fn();
      render(
        <table>
          <tbody>
            <TableRow clickable onRowClick={onRowClick} />
          </tbody>
        </table>
      );
      userEvent.click(screen.getByRole('row'));
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });

    it('Should activate the row on enter', () => {
      const onRowClick = jest.fn();
      render(
        <table>
          <tbody>
            <TableRow clickable onRowClick={onRowClick} />
          </tbody>
        </table>
      );
      const row = screen.getByRole('row');
      row.focus();
      userEvent.keyboard('{Enter}');

      expect(onRowClick).toHaveBeenCalledTimes(1);
    });

    it('Should activate the row on spacebar', () => {
      const onRowClick = jest.fn();
      render(
        <table>
          <tbody>
            <TableRow clickable onRowClick={onRowClick} />
          </tbody>
        </table>
      );
      const row = screen.getByRole('row');
      userEvent.type(row, '{space}');

      expect(onRowClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('expandable', () => {
    it('Should expand button be present', () => {
      render(
        <table>
          <tbody>
            <TableRow expandableContent={<div>ExpandedContent</div>} />
          </tbody>
        </table>
      );
      const button = screen.getByText(/angleDown.svg/);

      expect(button).toBeInTheDocument();
    });

    it('Should expand on button click', () => {
      render(
        <table>
          <tbody>
            <TableRow expandableContent={<div>ExpandedContent</div>} />
          </tbody>
        </table>
      );

      userEvent.click(screen.getByRole('button'));

      const content = screen.getByText(/ExpandedContent/);

      expect(content).toBeInTheDocument();
    });
  });

  describe('editable', () => {
    it('Should trigger onEdit', () => {
      const handleEdit = jest.fn();
      const handleEditSave = jest.fn();
      const rowData = { text: '2', number: 3 };

      render(
        <table>
          <tbody>
            <TableRow clickable onEdit={handleEdit} onEditSave={handleEditSave} rowData={rowData} />
          </tbody>
        </table>
      );

      userEvent.click(screen.getByText(/Edit/));

      expect(handleEdit).toBeCalled();
    });

    it('Should trigger onEditSave', () => {
      const handleEdit = jest.fn();
      const handleEditSave = jest.fn();
      const rowData = { text: '2', number: 3 };

      render(
        <table>
          <tbody>
            <TableRow clickable onEdit={handleEdit} onEditSave={handleEditSave} rowData={rowData} />
          </tbody>
        </table>
      );

      userEvent.click(screen.getByText(/Edit/));

      userEvent.click(screen.getByText(/Save/));

      expect(handleEditSave).toBeCalledWith(rowData);
    });

    it('Should not trigger onEditSave if cell has errorMessage', () => {
      const handleEdit = jest.fn();
      const handleEditSave = jest.fn();
      const rowData = { text: '2', number: 3 };

      render(
        <table>
          <tbody>
            <TableRow clickable onEdit={handleEdit} onEditSave={handleEditSave} rowData={rowData}>
              <TableCell editProperty="text" errorMessage="error">
                {rowData.text}
              </TableCell>
              <TableCell editProperty="number" numeric>
                {rowData.number}
              </TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      userEvent.click(screen.getByText(/Edit/));

      userEvent.click(screen.getByText(/Save/));

      expect(handleEditSave).not.toBeCalledWith();
    });

    it('Should render edit labels and cancel', () => {
      const handleEdit = jest.fn();
      const handleEditSave = jest.fn();
      const rowData = { text: '2', number: 3 };

      render(
        <table>
          <tbody>
            <TableRow
              clickable
              onEdit={handleEdit}
              onEditSave={handleEditSave}
              rowData={rowData}
              editLabel="editLabel"
              saveLabel="saveLabel"
              cancelLabel="cancelLabel"
            />
          </tbody>
        </table>
      );

      userEvent.click(screen.getByText(/editLabel/));

      expect(screen.getByText(/saveLabel/)).toBeInTheDocument();

      userEvent.click(screen.getByText(/cancelLabel/));

      expect(screen.queryByText(/saveLabel/)).not.toBeInTheDocument();
    });
  });
});
