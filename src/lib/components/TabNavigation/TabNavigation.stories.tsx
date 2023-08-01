import type { ComponentProps } from 'react';
import React from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import ChipGroup from '../Chips/ChipGroup';
import ChoiceChip from '../Chips/ChoiceChip';
import Typography from '../Typography';
import TabNavigation from './TabNavigation';

type Props = ComponentProps<typeof TabNavigation>;

const Template = createTemplate(TabNavigation);

const chips = ['Case-IH', 'Claas/Renault', 'Deutz', 'Ford', 'JCB'];

const tabs: Props['tabList'] = [
  {
    id: 'Text',
    label: 'Text',
    component: 'Simple text',
  },
  {
    id: 'React component',
    label: 'React component',
    count: 1,
    component: (
      <div>
        <Typography variant="h4">Title</Typography>
        <Typography>Another React component is rendered in the tab</Typography>
      </div>
    ),
  },
  {
    id: 'Empty tab',
    label: 'Empty tab',
    component: null,
  },
  {
    id: 'Brands',
    label: 'Brands',
    count: 99,
    component: (
      <ChipGroup>
        {chips.map((chip, index) => {
          return <ChoiceChip label={chip} key={index} />;
        })}
      </ChipGroup>
    ),
  },
];
for (let i = 4; i < 7; i++) {
  const label = `Tab ${i + 1}`;
  const component = `Tab ${i + 1} content`;

  tabs.push({
    label,
    component,
    id: label,
  });
}

export const Primitive = Template.bind({});
Primitive.args = {
  tabList: tabs,
  activeTab: 'React component',
};
Primitive.storyName = 'TabNavigation';

export default createMeta({
  component: TabNavigation,
  title: 'Components/TabNavigations/TabNavigation',
  parameters: {
    backgrounds: {
      default: 'theme1',
      values: [
        { name: 'theme0', value: '#fff' },
        { name: 'theme1', value: '#E6E6E6' },
      ],
    },
  },
  argTypes: {
    tabList: {
      control: {
        disable: true,
      },
    },
  },
});
