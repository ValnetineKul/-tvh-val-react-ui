import type { ComponentProps } from 'react';
import React, { useState, useMemo } from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '../../../themes/core';
import Button from '../Buttons/Button';
import Checkbox from '../Checkbox';
import { User, Pen } from '../Icon/icons/functional';
import Icon from '../Icon';
import TextField from '../TextField';

import Table from './Table';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';

import StatusTag from '../Tags/StatusTag';
import Tooltip from '../Tooltip';
import { createMeta } from '../../story-utils';
import Typography from '../Typography';
import TableFixedColumn from './TableFixedColumn';

import MenuItem from '../Menus/MenuItem';
import OverflowAction from '../../patterns/OverflowAction';

const menuItems = [
  <MenuItem label="item_1" onClick={action('onItemClick')} />,
  <MenuItem label="item_2" onClick={action('onItemClick')} />,
  <MenuItem label="item_3" onClick={action('onItemClick')} />,
];

const useStyles = makeStyles()(() => ({
  width: {
    maxWidth: 400,
  },
  fixedCellWidth: {
    maxWidth: 600,
  },
  height: {
    height: 400,
  },
  makeCell: {
    width: 204,
    maxWidth: 204,
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  visuallyHidden: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
  input: {
    height: '32px',
    minWidth: '80px',
  },
  iconCell: {
    width: '56px',
    color: '#000000',
  },
  headerTooltip: {
    width: '100%',
  },
  tagColumn: {
    minWidth: 105,
  },
  transparentButtonSurface: {
    backgroundColor: 'transparent',
  },
}));

interface Basket {
  id: string;
  icon: React.ReactElement;
  text: string;
  subText: string;
  numberOfSpares: number;
  status: React.ReactElement;
}

const rows: Basket[] = [
  {
    id: '1',
    icon: <Icon icon={User} />,
    text: 'Spare parts',
    subText: 'Updates: jul 3, 2021',
    numberOfSpares: 5,
    status: <StatusTag label="Success" />,
  },
  {
    id: '2',
    icon: <Icon icon={User} />,
    text: 'Empty list - with a long name, Nullam id dolor',
    subText: 'Updated: jun 20, 2021',
    numberOfSpares: 4,
    status: <StatusTag label="Success" />,
  },
  {
    id: '3',
    icon: <Icon icon={User} />,
    text: 'Commercial orders - stock refull 1',
    subText: 'Updated: jun 8, 2021',
    numberOfSpares: 5,
    status: <StatusTag label="Success" />,
  },
  {
    id: '4',
    icon: <Icon icon={User} />,
    text: 'Weekly order - warehouse South',
    subText: 'Updated: may 27, 2021',
    numberOfSpares: 0,
    status: <StatusTag label="Success" />,
  },
  {
    id: '5',
    icon: <Icon icon={User} />,
    text: 'Monthly general stock order',
    subText: 'Updated: dec 15, 2020',
    numberOfSpares: 1,
    status: <StatusTag label="Success" />,
  },
  {
    id: '6',
    icon: <Icon icon={User} />,
    text: 'John Deere - wheels',
    subText: 'Updated: nov 5, 2020',
    numberOfSpares: 2,
    status: <StatusTag label="Success" />,
  },
  {
    id: '7',
    icon: <Icon icon={User} />,
    text: 'Spare parts1',
    subText: 'Updates: jul 3, 2021',
    numberOfSpares: 0,
    status: <StatusTag label="Success" />,
  },
  {
    id: '8',
    icon: <Icon icon={User} />,
    text: 'Spare parts2',
    subText: 'Updates: jul 3, 2021',
    numberOfSpares: 1,
    status: <StatusTag label="Success" />,
  },
  {
    id: '9',
    icon: <Icon icon={User} />,
    text: 'Spare parts3',
    subText: 'Updates: jul 3, 2021',
    numberOfSpares: 2,
    status: <StatusTag label="Success" />,
  },
];

type Props = ComponentProps<typeof Table>;

export const Primitive = (args: Props) => {
  // Checkboxes
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.text);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const selectedIndex = selected.indexOf(name);

    if (selectedIndex === -1) {
      setSelected([...selected, name]);
    } else {
      setSelected(selected.filter((_, index) => index !== selectedIndex));
    }
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const numSelected = selected.length;
  const rowCount = rows.length;

  const { classes, cx } = useStyles();

  return (
    <div style={{ maxWidth: 934 }}>
      <Table {...args} tableContainerClassName={classes.height}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.iconCell}>
              <Checkbox
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={(event) => handleSelectAllClick(event)}
              />
            </TableCell>
            <TableCell className={classes.iconCell}>
              <span className={classes.visuallyHidden}>Header</span>
            </TableCell>
            <TableCell className={cx(classes.makeCell)}>
              <Tooltip className={classes.headerTooltip} label="Very long header for table cell">
                <Typography variant="body500" weight="emphasis" className={classes.ellipsis}>
                  Very long header for table cell
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell>Inputs</TableCell>
            <TableCell numeric>N Header</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell className={classes.iconCell}>
              <span className={classes.visuallyHidden}>EllipsisH</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((basket) => {
            const isItemSelected = isSelected(basket.text);
            return (
              <TableRow hover key={basket.text} selected={isItemSelected}>
                <TableCell className={classes.iconCell}>
                  <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, basket.text)} />
                </TableCell>
                <TableCell className={classes.iconCell}>{basket.icon}</TableCell>
                <TableCell className={classes.makeCell}>
                  <span style={{ display: 'block' }}>{basket.text}</span>
                  <span style={{ display: 'block', fontSize: 12, lineHeight: '16px' }}>{basket.subText}</span>
                </TableCell>
                <TableCell>
                  <TextField
                    label=""
                    maxLength={100}
                    onChange={action('onInputChange')}
                    inputClassName={classes.input}
                  />
                </TableCell>
                <TableCell>{basket.status}</TableCell>
                <TableCell numeric>{basket.numberOfSpares}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    label="Edit"
                    onClick={action('onEditClick')}
                    startIcon={<Icon icon={Pen} />}
                    variant="tertiary"
                    surfaceClassName={classes.transparentButtonSurface}
                  />
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <OverflowAction menuItems={menuItems} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

Primitive.args = {
  disabledStickyHeader: false,
};

Primitive.storyName = 'VerticalScrollTable';

export const HorizontalScrollTable = (args: Props) => {
  const shortData = rows.slice(0, 3);

  const { classes } = useStyles();

  return (
    <Table {...args} tableContainerClassName={classes.width}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.iconCell}>
            <span className={classes.visuallyHidden}>Icon</span>
          </TableCell>
          <TableCell>Spares</TableCell>
          <TableCell className={classes.tagColumn}>Status</TableCell>
          <TableCell numeric>Number</TableCell>
          <TableCell>Header</TableCell>
          <TableCell>
            <span className={classes.visuallyHidden}>EllipsisH</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {shortData.map((basket) => {
          return (
            <TableRow hover key={basket.text}>
              <TableCell className={classes.iconCell}>{basket.icon}</TableCell>
              <TableCell>
                <span style={{ display: 'block' }}>{basket.text}</span>
                <span style={{ display: 'block', fontSize: 12, lineHeight: '16px' }}>{basket.subText}</span>
              </TableCell>
              <TableCell className={classes.tagColumn}>{basket.status}</TableCell>
              <TableCell numeric>{basket.numberOfSpares}</TableCell>
              <TableCell>
                <Button
                  label="Label"
                  onClick={action('onButtonClick')}
                  startIcon={<Icon icon={Pen} />}
                  variant="tertiary"
                  surfaceClassName={classes.transparentButtonSurface}
                />
              </TableCell>
              <TableCell>
                <OverflowAction menuItems={menuItems} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

HorizontalScrollTable.args = {
  disabledStickyHeader: true,
};

HorizontalScrollTable.storyName = 'HorizontalScrollTable';

export const FixedColumnTable = (args: Props) => {
  const { classes, cx } = useStyles();

  return (
    <Table {...args} tableContainerClassName={cx(classes.fixedCellWidth, classes.height)}>
      <TableHead>
        <TableRow>
          <TableFixedColumn>
            <TableCell className={classes.iconCell}>
              <span className={classes.visuallyHidden}>Icon</span>
            </TableCell>
            <TableCell>Spares</TableCell>
          </TableFixedColumn>
          <TableCell>Inputs</TableCell>
          <TableCell className={classes.tagColumn}>Status</TableCell>
          <TableCell numeric>Number</TableCell>
          <TableCell>Header</TableCell>
          <TableFixedColumn position="end">
            <TableCell>
              <span className={classes.visuallyHidden}>EllipsisH</span>
            </TableCell>
          </TableFixedColumn>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((basket) => {
          return (
            <TableRow key={basket.text}>
              <TableFixedColumn>
                <TableCell className={classes.iconCell}>{basket.icon}</TableCell>
                <TableCell>
                  <span style={{ display: 'block' }}>{basket.text}</span>
                  <span style={{ display: 'block', fontSize: 12, lineHeight: '16px' }}>{basket.subText}</span>
                </TableCell>
              </TableFixedColumn>
              <TableCell>
                <TextField label="" maxLength={100} onChange={action('onInputChange')} inputClassName={classes.input} />
              </TableCell>
              <TableCell className={classes.tagColumn}>{basket.status}</TableCell>
              <TableCell numeric>{basket.numberOfSpares}</TableCell>
              <TableCell>
                <Button
                  label="Label"
                  onClick={action('onButtonClick')}
                  startIcon={<Icon icon={Pen} />}
                  variant="tertiary"
                />
              </TableCell>
              <TableFixedColumn position="end">
                <TableCell>
                  <OverflowAction menuItems={menuItems} />
                </TableCell>
              </TableFixedColumn>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

FixedColumnTable.args = {
  disabledStickyHeader: false,
};

FixedColumnTable.storyName = 'FixedColumnTable';

type Order = 'asc' | 'desc';

const compare = (a: Basket, b: Basket, by: keyof Basket, direction: Order) => {
  const dir = direction === 'asc' ? 1 : -1;
  if (a[by] > b[by]) return 1 * dir;

  if (a[by] < b[by]) return -1 * dir;

  return 0;
};

export const SortableHeaderTable = (args: Props) => {
  const { classes } = useStyles();

  const [sortBy, setSortBy] = useState<keyof Basket>('text');
  const [sortDirection, setSortDirection] = useState<Order>('asc');

  const sortedData = useMemo(() => {
    if (sortBy) {
      return [...rows].slice(0, 5).sort((a, b) => compare(a, b, sortBy, sortDirection));
    }
    return rows.slice(0, 5);
  }, [sortBy, sortDirection]);

  const handleSort = (by: keyof Basket, direction: Order) => {
    setSortBy(by);
    setSortDirection(direction);
  };

  return (
    <Table {...args} tableContainerClassName={classes.fixedCellWidth}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.iconCell}>
            <span className={classes.visuallyHidden}>Icon</span>
          </TableCell>
          <TableCell onSortClick={handleSort} sortBy={sortBy} sortDirection={sortDirection} sortProperty="text">
            Spares
          </TableCell>
          <TableCell
            onSortClick={handleSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            sortProperty="numberOfSpares"
            numeric
          >
            Number
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((basket) => {
          return (
            <TableRow key={basket.text}>
              <TableCell className={classes.iconCell}>{basket.icon}</TableCell>
              <TableCell>{basket.text}</TableCell>
              <TableCell numeric>{basket.numberOfSpares}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

SortableHeaderTable.args = {
  disabledStickyHeader: false,
};

SortableHeaderTable.storyName = 'SortableHeaderTable';

export const EditableTable = (args: Props) => {
  const { classes } = useStyles();
  const [shortData, setShortData] = useState(rows.slice(0, 5));
  const [numberErrorMessage, setNumberErrorMessage] = useState<string>();
  const [textErrorMessage, setTextErrorMessage] = useState<string>();

  const handleEditSave = (value: Basket) => {
    setShortData(shortData.map((item) => (item.id === value.id ? value : item)));
  };

  const handleOnBlurNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > 0) {
      setNumberErrorMessage(undefined);
    } else {
      setNumberErrorMessage('Number should be greater than 0');
    }
  };

  const handleOnBlurText = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setTextErrorMessage(undefined);
    } else {
      setTextErrorMessage('Spares should not be empty');
    }
  };

  const resetErrorMessages = () => {
    setTextErrorMessage(undefined);
    setNumberErrorMessage(undefined);
  };

  return (
    <Table {...args} tableContainerClassName={classes.fixedCellWidth}>
      <TableHead>
        <TableRow hasEditingRow>
          <TableCell className={classes.iconCell}>
            <span className={classes.visuallyHidden}>Icon</span>
          </TableCell>
          <TableCell>Spares</TableCell>
          <TableCell numeric>Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {shortData.map((basket) => {
          return (
            <TableRow rowData={basket} onEdit={resetErrorMessages} onEditSave={handleEditSave} key={basket.id}>
              <TableCell className={classes.iconCell}>{basket.icon}</TableCell>
              <TableCell editProperty="text" errorMessage={textErrorMessage} onBlur={handleOnBlurText}>
                {basket.text}
              </TableCell>
              <TableCell
                editProperty="numberOfSpares"
                editColWidth="140px"
                errorMessage={numberErrorMessage}
                onBlur={handleOnBlurNumber}
                numeric
              >
                {basket.numberOfSpares}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

EditableTable.args = {
  disabledStickyHeader: false,
};

EditableTable.storyName = 'EditableTable';

export default createMeta({
  component: Table,
  title: 'Components/Tables/Table',
  argTypes: {
    disabledStickyHeader: {
      table: {
        type: { detail: 'Disable the sticky header' },
      },
    },
    tableContainerClassName: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'Class name for the table container' },
      },
    },
  },
  parameters: {
    componentSubtitle: '',
  },
});
