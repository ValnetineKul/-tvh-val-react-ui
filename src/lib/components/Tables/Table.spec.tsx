import React from 'react';
import { render } from '../../test-utils';
import Table from './Table';

describe('Table', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <Table>
        <tbody>
          <tr>
            <td>Children</td>
          </tr>
        </tbody>
      </Table>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
