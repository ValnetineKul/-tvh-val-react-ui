import { action } from '@storybook/addon-actions';
import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import Pagination from './Pagination';

type Props = ComponentProps<typeof Pagination>;

type Args = Omit<Props, 'page' | 'numberOfPages' | 'onPageChange'>;

const Template = ((args: Args) => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (v: number) => {
    setPage(v);
    action('onPageChange')(v);
  };

  return <Pagination {...args} page={page} numberOfPages={10} onPageChange={handlePageChange} />;
}) as StoryTemplate<Args>;

const WithItemsPerPageTemplate = ((args: Args) => {
  const numberOfItems = 100;
  const [page, setPage] = useState<number>(1);
  const [currentPageSizeValue, setCurrentPageSizeValue] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(numberOfItems / currentPageSizeValue);

  const handlePageChange = (v: number) => {
    setPage(v);
    action('onPageChange')(v);
  };

  const handleItemsPerPageChange = (v: number) => {
    setPage(1);
    setCurrentPageSizeValue(v);
    setNumberOfPages(numberOfItems / v);
    action('onItemsPerPageChange')(v);
  };

  return (
    <Pagination
      {...args}
      page={page}
      numberOfPages={numberOfPages}
      itemsPerPage={currentPageSizeValue}
      itemsPerPageLabel="Items per page:"
      onPageChange={handlePageChange}
      onItemsPerPageChange={handleItemsPerPageChange}
    />
  );
}) as StoryTemplate<Args>;

const InfinitePages = ((args: Args) => {
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(page);

  const handlePageChange = (v: number) => {
    setPage(v);
    setMaxPages((m) => Math.max(m, v));
    action('onPageChange')(v);
  };

  return (
    <Pagination
      {...args}
      page={page}
      numberOfPages={maxPages < 10 ? maxPages + 1 : 10}
      isNumberOfPagesUnknown={maxPages < 10}
      onPageChange={handlePageChange}
    />
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = { disabled: false };
Primitive.storyName = 'pagination';

export const WithItemsPerPage = WithItemsPerPageTemplate.bind({});
WithItemsPerPage.args = { disabled: false };
WithItemsPerPage.storyName = 'Items per page';

export const WithInfinitePages = InfinitePages.bind({});
WithInfinitePages.args = { disabled: false };
WithInfinitePages.storyName = 'Infinite pages';

export default createMeta({
  component: Pagination,
  title: 'Components/Paginations/Pagination',
  argTypes: {
    page: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'The current page',
        },
      },
    },
    numberOfPages: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'The total number of pages',
        },
      },
    },
    itemsPerPage: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'The total number of items per page',
        },
      },
    },
    itemsPerPageLabel: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'Label for Items per page',
        },
      },
    },
    itemsPerPageOptions: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'Options: { value: 10 } or { label: "View all", value: "viewAll" }.',
        },
      },
    },
  },
});
