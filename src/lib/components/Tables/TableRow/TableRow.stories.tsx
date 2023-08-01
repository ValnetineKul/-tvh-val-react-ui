import type { ComponentProps } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '../../../../themes/core';
import { User, Pen } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import Button from '../../Buttons/Button';
import TextField from '../../TextField';

import TableCell from '../TableCell';
import Table from '../Table';
import TableBody from '../TableBody';
import TableRow from './TableRow';

import { createMeta } from '../../../story-utils';
import type { StoryTemplate } from '../../../story-utils';

const useStyles = makeStyles()(() => ({
  input: {
    height: '32px',
  },
  transparentButtonSurface: {
    backgroundColor: 'transparent',
  },
}));

type Props = ComponentProps<typeof TableRow>;

const Template = ((args: Props) => {
  return (
    <Table>
      <TableBody>
        <TableRow {...args}>
          <TableCell>
            <Icon icon={User} />
          </TableCell>
          <TableCell>Spare parts</TableCell>
          <TableCell numeric>321</TableCell>
          <TableCell>TVH</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}) as StoryTemplate<Props>;

const ClickableTableRowTemplate = ((args: Props) => {
  const { classes } = useStyles();

  return (
    <Table>
      <TableBody>
        <TableRow {...args}>
          <TableCell>
            <Icon icon={User} />
          </TableCell>
          <TableCell>
            <Button
              label="React router link"
              variant="link"
              surfaceClassName={classes.transparentButtonSurface}
              component={Link}
              target="_blank"
              to="/"
              onClick={(event) => {
                event.stopPropagation();
                action('onLinkClick')(event);
              }}
              onKeyPress={(event) => {
                event.stopPropagation();
              }}
            />
          </TableCell>
          <TableCell>Spare parts</TableCell>
          <TableCell>
            <TextField
              label=""
              maxLength={100}
              onClick={(event) => {
                action('onInputClick')(event);
              }}
              onChange={(event) => {
                action('onInputChange')(event);
              }}
              onFocus={(event) => {
                action('onInputFocus')(event);
              }}
              onKeyPress={(event) => {
                action('onKeyPress')(event);
              }}
              inputClassName={classes.input}
            />
          </TableCell>
          <TableCell>TVH</TableCell>
          <TableCell>
            <Button
              size="sm"
              label="Edit"
              onClick={(event) => {
                event.stopPropagation();
                action('onEditClick')(event);
              }}
              onKeyPress={(event) => {
                event.stopPropagation();
              }}
              startIcon={<Icon icon={Pen} />}
              variant="tertiary"
              surfaceClassName={classes.transparentButtonSurface}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  hover: true,
  selected: false,
};

Primitive.storyName = 'TableRow';

export const ClickableTableRow = ClickableTableRowTemplate.bind({});
ClickableTableRow.args = {
  hover: true,
  selected: false,
  clickable: true,
  onRowClick: action('onRowClick'),
};

ClickableTableRow.storyName = 'ClickableTableRow';

export const ExpandableRow = Template.bind({});
ExpandableRow.args = {
  expandableContent: <div style={{ padding: 16 }}>Any content needed: text, cards, actions, table rows.</div>,
};

ExpandableRow.storyName = 'ExpandableRow';

export default createMeta({
  component: TableRow,
  title: 'Components/Tables/TableRow',
  argTypes: {
    hover: {
      table: {
        type: { detail: 'If set to true the row is highlighted on mouse hover' },
      },
    },
    selected: {
      table: {
        type: { detail: 'It marks the row as selected' },
      },
    },
    clickable: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'If "href" or "to" are filled, it works as a link. Else it works as button with "onRowClick" prop',
        },
      },
    },
    expandableContent: {
      control: {
        disable: true,
      },
    },
    onRowClick: {
      table: {
        type: { detail: 'Callback for clicking the button inside the row (not necessary for link)' },
      },
    },
    component: {
      control: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    componentSubtitle: '',
  },
});
