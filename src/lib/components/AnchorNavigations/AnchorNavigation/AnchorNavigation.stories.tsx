import type { ComponentProps } from 'react';
import React from 'react';
import { createMeta, createTemplate } from '../../../story-utils';
import Typography from '../../Typography';
import TabNavigation from '../../TabNavigation';
import AnchorNavigation from './AnchorNavigation';

type Props = ComponentProps<typeof AnchorNavigation>;

const tabs = [
  {
    id: 'T1',
    label: 'First tab',
    component: 'First tab content',
  },
  {
    id: 'T2',
    label: 'Second tab',
    component: 'Second tab content',
  },
  {
    id: 'T3',
    label: 'Third tab',
    component: 'Third tab content',
  },
];

const items: Props['items'] = [
  {
    label: 'Will it fit',
    component: (
      <div style={{ paddingTop: '16px' }}>
        <TabNavigation tabList={tabs} />
      </div>
    ),
    surface: '200',
  },
  {
    label: 'About the product',
    component: (
      <div style={{ height: '20vh' }}>
        <Typography variant="body500">About the product anchor content.</Typography>
      </div>
    ),
    surface: '100',
  },
  {
    label: 'Alternatives',
    component: (
      <div style={{ height: '20vh' }}>
        <Typography variant="body500">Alternatives anchor content.</Typography>
      </div>
    ),
    surface: '300',
  },
  {
    label: 'Related items',
    component: (
      <div style={{ height: '20vh' }}>
        <Typography variant="body500">Related items anchor content.</Typography>
      </div>
    ),
  },
  {
    label: 'Composition',
    component: (
      <div style={{ height: '20vh' }}>
        <Typography variant="body500">Composition anchor content.</Typography>
      </div>
    ),
    surface: '200',
  },
  {
    label: 'Frequently bought together',
    component: (
      <div style={{ height: '20vh' }}>
        <Typography variant="body500">Frequently bought together anchor content.</Typography>
      </div>
    ),
  },
  {
    label: 'Extra long AnchorItem label which is longer than 30 characters',
    component: (
      <div style={{ height: '20vh' }}>
        <Typography variant="body500">
          The maximum amount of characters for each AnchorItem is 30 (including spaces). When the label is longer than
          that, it will be truncated &amp; a Tooltip will be shown on hover.
        </Typography>
      </div>
    ),
    surface: '200',
  },
];

const Template = createTemplate(AnchorNavigation);

export const Primitive = Template.bind({});

Primitive.args = {
  items,
};

Primitive.storyName = 'AnchorNavigation';

export default createMeta({
  component: AnchorNavigation,
  title: 'Components/AnchorNavigations/AnchorNavigation',
  argTypes: {
    items: {
      control: {
        disable: true,
      },
    },
  },
});
