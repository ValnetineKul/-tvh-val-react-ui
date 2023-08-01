import React from 'react';
import TableCell from '../TableCell';
import TableBody from './TableBody';
import Table from '../Table';
import TableRow from '../TableRow';
import { createMeta } from '../../../story-utils';

export const Primitive = () => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Clutch</TableCell>
          <TableCell>TVH</TableCell>
          <TableCell numeric>3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Brake Pads</TableCell>
          <TableCell>JCB</TableCell>
          <TableCell numeric>2</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Window</TableCell>
          <TableCell>Linde</TableCell>
          <TableCell numeric>55</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

Primitive.storyName = 'TableBody';

export default createMeta({
  component: TableBody,
  title: 'Components/Tables/TableBody',
  argTypes: {},
  parameters: {
    componentSubtitle: '',
  },
});
