import React from 'react';
import { createTemplate, createMeta } from '../../story-utils';
import Icon from '../Icon';
import { Plus } from '../Icon/icons/functional';
import Tooltip from './Tooltip';

const Template = createTemplate(Tooltip);

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Create item',
  children: <Icon icon={Plus} />,
};

Primitive.storyName = 'TextLabel';

export const ComponentLabel = Template.bind({});
ComponentLabel.args = {
  label: <div>Component label</div>,
  children: <Icon icon={Plus} />,
};

ComponentLabel.storyName = 'ComponentLabel';

export default createMeta({
  component: Tooltip,
  title: 'Components/Tooltips/Tooltip',
});
