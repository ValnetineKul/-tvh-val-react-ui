import React from 'react';
import { render } from '../../../test-utils';
import TableHead from './TableHead';

describe('TableHeader', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <table>
        <TableHead>
          <tr>
            <td>Children</td>
          </tr>
        </TableHead>
      </table>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
