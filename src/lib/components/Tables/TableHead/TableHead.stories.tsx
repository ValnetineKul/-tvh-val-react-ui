import React from 'react';
import TableCell from '../TableCell';
import TableHead from './TableHead';
import Table from '../Table';
import TableRow from '../TableRow';
import { createMeta } from '../../../story-utils';

export const Primitive = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Part</TableCell>
          <TableCell>Make</TableCell>
          <TableCell numeric>N Header</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
};

Primitive.storyName = 'TableHead';

export default createMeta({
  component: TableHead,
  title: 'Components/Tables/TableHead',
  argTypes: {},
  parameters: {
    componentSubtitle: '',
  },
});
