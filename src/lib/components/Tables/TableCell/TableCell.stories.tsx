import type { ComponentProps } from 'react';
import React from 'react';
import TableCell from './TableCell';
import TableHead from '../TableHead';
import Table from '../Table';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import { createMeta } from '../../../story-utils';

type Props = ComponentProps<typeof TableCell>;

export const Primitive = (args: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell {...args}>N Header</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell {...args}>321</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

Primitive.args = {
  numeric: false,
};

Primitive.storyName = 'TableCell';

export default createMeta({
  component: TableCell,
  title: 'Components/Tables/TableCell',
  argTypes: {
    numeric: {
      table: {
        type: { detail: 'If set to true the text is aligned to the right' },
      },
    },
    editColWidth: {
      table: {
        type: { detail: 'Used to set the column width, in  order to restrict columns from changing widths.' },
      },
    },
  },
  parameters: {
    componentSubtitle: '',
  },
});
