import type { FC } from 'react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '../../../themes/core';
import { default as TableUI, TableBody, TableCell, TableHead, TableRow } from '../../components/Tables';
import ListLayout from './ListLayout';
import { default as ToolbarUI } from '../../components/Toolbar';
import SearchField from '../../components/SearchField';
import { default as PaginationUI } from '../../components/Pagination';
import { Card } from '../../components/Card';
import IconButton from '../../components/Buttons/IconButton';
import { EllipsisH, MoneyCheckEdit, User } from '../../components/Icon/icons/functional';
import Icon from '../../components/Icon';
import Typography from '../../components/Typography';
import { createMeta, createTemplate } from '../../story-utils';

const useStyles = makeStyles<void, 'typeIcon'>()((theme, _params, classes) => ({
  listsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardWrapper: {
    padding: theme.layoutSpacing['spacing/400'],
    marginBottom: theme.layoutSpacing['spacing/300'],
    '&:last-child': {
      marginBottom: theme.layoutSpacing['spacing/000'],
    },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderInfo: {
    display: 'flex',
    [`& .${classes.typeIcon}`]: {
      marginRight: theme.layoutSpacing['spacing/300'],
    },
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  typeIcon: {},

  table: { tableLayout: 'fixed' },

  typeCell: { width: 64 },
  descriptionCell: {},
  quoteCell: { width: 84 },
  productsCell: { width: 120 },
  actionsCell: { width: 64 },

  truncatedText: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  centeredPagination: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Cards: FC = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.listsContainer}>
      <Card className={classes.cardWrapper}>
        <div className={classes.cardHeader}>
          <div className={classes.cardHeaderInfo}>
            <Icon className={classes.typeIcon} icon={User} />
            <Typography>Created: Today</Typography>
          </div>
          <IconButton onClick={action('lists action')} icon={<Icon icon={EllipsisH} />} />
        </div>

        <Typography weight="emphasis">List name</Typography>

        <Typography variant="body400">List description</Typography>

        <div className={classes.cardBottom}>
          <Typography variant="body400">4 products</Typography>

          <IconButton onClick={action('Quote link')} icon={<Icon icon={MoneyCheckEdit} />} />
        </div>
      </Card>
      <Card className={classes.cardWrapper}>
        <div className={classes.cardHeader}>
          <div className={classes.cardHeaderInfo}>
            <Icon className={classes.typeIcon} icon={User} />
            <Typography>Created: Today</Typography>
          </div>
          <IconButton onClick={action('lists action')} icon={<Icon icon={EllipsisH} />} />
        </div>

        <Typography weight="emphasis">List name</Typography>

        <Typography variant="body400">List description</Typography>

        <div className={classes.cardBottom}>
          <Typography variant="body400">4 products</Typography>

          <IconButton onClick={action('Quote link')} icon={<Icon icon={MoneyCheckEdit} />} />
        </div>
      </Card>
    </div>
  );
};

const Table: FC = () => {
  const { classes } = useStyles();
  return (
    <TableUI className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Products</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Icon icon={User} />
          </TableCell>
          <TableCell>
            <div>
              <Typography>List name</Typography>
              <Typography variant="body400">Created: Today</Typography>
            </div>
          </TableCell>

          <TableCell>
            <Typography>Description</Typography>
          </TableCell>

          <TableCell>
            <Typography>4 products</Typography>
          </TableCell>

          <TableCell>
            <IconButton onClick={action('list actions')} icon={<Icon icon={EllipsisH} />} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className={classes.typeCell}>
            <Icon icon={User} />
          </TableCell>
          <TableCell>
            <div>
              <Typography className={classes.truncatedText}>List name</Typography>
              <Typography variant="body400">Created: Today</Typography>
            </div>
          </TableCell>

          <TableCell>
            <Typography className={classes.truncatedText}>Description</Typography>
          </TableCell>

          <TableCell className={classes.productsCell}>
            <Typography>4 products</Typography>
          </TableCell>

          <TableCell className={classes.actionsCell}>
            <IconButton onClick={action('list actions')} icon={<Icon icon={EllipsisH} />} />
          </TableCell>
        </TableRow>
      </TableBody>
    </TableUI>
  );
};

const Toolbar: FC = () => (
  <ToolbarUI
    component={<SearchField value="" onChange={(e) => action('Search for')(e.target.value)} placeholder="Search..." />}
    listOptions={[
      {
        label: 'Filter by',
        value: 'all',
        options: [
          { label: 'All lists', value: 'all' },
          { label: 'Private lists', value: 'private' },
        ],
        onChange: (val) => {
          action('Chosen filter')(val);
        },
      },
      {
        label: 'Sort by',
        value: 'name',
        options: [
          { label: 'Name', value: 'name' },
          { label: 'Description', value: 'description' },
        ],
        onChange: (val) => {
          action('Chosen sorting')(val);
        },
      },
    ]}
  />
);

interface PaginationProps {
  isCentered?: boolean;
}

const Pagination: FC<PaginationProps> = ({ isCentered }) => {
  const { classes } = useStyles();

  return (
    <div className={isCentered ? classes.centeredPagination : ''}>
      <PaginationUI
        {...(!isCentered
          ? {
              itemsPerPageLabel: 'Items per page',
              itemsPerPage: 10,
              onItemsPerPageChange: (size) => action('pageSize')(size),
            }
          : {})}
        page={1}
        numberOfPages={3}
        onPageChange={(page) => action('Selected page')(page)}
      />
    </div>
  );
};
const Template = createTemplate(ListLayout);

export const Primitive = Template.bind({});

Primitive.args = {
  Toolbar: <Toolbar />,
  children: <Table />,
  Pagination: <Pagination />,
};
Primitive.storyName = 'Table';

export const PrimitiveCards = Template.bind({});

PrimitiveCards.args = {
  Toolbar: <Toolbar />,
  children: <Cards />,
  Pagination: <Pagination isCentered />,
};
PrimitiveCards.storyName = 'Cards';

export default createMeta({
  component: ListLayout,
  title: 'Patterns/Layouts/ListLayout',
  argTypes: {
    Toolbar: { control: { disable: true } },
    Pagination: { control: { disable: true } },
  },
  parameters: {
    docs: {
      transformSource: (src: string) => src.replace(/ isCentered/, ''),
    },
  },
});
