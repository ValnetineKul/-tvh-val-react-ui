import React from 'react';
import { render } from '../../../test-utils';
import TableCell from '../TableCell';
import TableFixedColumn from './TableFixedColumn';

describe('TableFixedColumn', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableFixedColumn>
              <TableCell>Children</TableCell>
              <TableCell>Children</TableCell>
            </TableFixedColumn>
          </tr>
        </tbody>
      </table>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should render position end correctly', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableFixedColumn position="end">
              <TableCell>Children</TableCell>
              <TableCell>Children</TableCell>
            </TableFixedColumn>
          </tr>
        </tbody>
      </table>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
