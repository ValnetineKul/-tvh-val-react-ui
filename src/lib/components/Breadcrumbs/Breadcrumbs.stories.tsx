import type { ComponentProps } from 'react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { createMeta } from '../../story-utils';
import { Home } from '../Icon/icons/functional';
import Icon from '../Icon';
import BreadcrumbItem from './BreadcrumbItem';
import Breadcrumbs from './Breadcrumbs';

type Props = ComponentProps<typeof Breadcrumbs>;

export const Primitive = (args: Props) => {
  return (
    <Breadcrumbs {...args}>
      <BreadcrumbItem label="Home" url="/" icon={<Icon icon={Home} />} onClick={action('onHomeClick')} />
      {new Array(6).fill(null).map((_, idx) => {
        return (
          <BreadcrumbItem
            label={`Label ${idx + 1}`}
            url={`/label${idx + 1}`}
            key={idx}
            onClick={action(`onLabel${idx + 1}Click`)}
          />
        );
      })}
      <BreadcrumbItem label="CurrentPage" currentPage />
    </Breadcrumbs>
  );
};
Primitive.args = {
  backUrl: '/',
  previousPageName: 'PreviousPageName',
  onBackClick: action('onBackClick'),
  onPreviousPageClick: action('onPreviousPageClick'),
};
Primitive.storyName = 'Breadcrumbs';

export default createMeta({
  component: Breadcrumbs,
  title: 'Components/Breadcrumbs/Breadcrumbs',
  argTypes: {
    onBackClick: {
      control: {
        disable: true,
      },
    },
    onPreviousPageClick: {
      control: {
        disable: true,
      },
    },
  },
});
