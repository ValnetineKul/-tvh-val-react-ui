import type { ComponentProps } from 'react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { createMeta } from '../../../story-utils';
import Icon from '../../Icon';
import { Home } from '../../Icon/icons/functional';
import BreadcrumbItem from './BreadcrumbItem';

type Props = ComponentProps<typeof BreadcrumbItem>;

const Template = (args: Props) => {
  return <BreadcrumbItem {...args} />;
};

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'HierarchicalPage',
  url: '/hierarchicalPage',
  onClick: action('onClick'),
};
Primitive.argTypes = {
  url: {
    table: {
      disable: false,
    },
  },
  onClick: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
Primitive.storyName = 'hierarchicalPage';

export const CurrentPage = Template.bind({});
CurrentPage.args = {
  currentPage: true,
  label: 'CurrentPage',
};
CurrentPage.argTypes = {
  currentPage: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
CurrentPage.storyName = 'currentPage';

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Home',
  url: '/home',
  icon: <Icon icon={Home} />,
  onClick: action('onClick'),
};
WithIcon.argTypes = {
  url: {
    table: {
      disable: false,
    },
  },
  onClick: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
WithIcon.storyName = 'withIcon';

export default createMeta({
  component: BreadcrumbItem,
  title: 'Components/Breadcrumbs/BreadcrumbItem',
  argTypes: {
    url: {
      table: {
        disable: true,
      },
    },
    currentPage: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
});
