import React from 'react';
import { createMeta } from '../../story-utils';
import type { StoryTemplate } from '../../story-utils';
import Icon from '../Icon';
import { Bell } from '../Icon/icons/functional';
import Badge from './Badge';

type Props = React.ComponentProps<typeof Badge>;

type Args = Omit<Props, 'children'>;

const Template = ((args: Args) => {
  return (
    <Badge {...args} isIcon>
      <Icon icon={Bell} size={args.iconSize} />
    </Badge>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  count: 1,
  overflowCount: 999,
  variant: 'primary',
  type: 'standard',
  iconSize: 'md',
};

Primitive.argTypes = {
  isFullWidth: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

Primitive.storyName = 'IconBadge';

const InlineTemplate = ((args: Args) => {
  const { isIcon, iconSize, ...remainingProps } = args;
  return (
    <Badge isIcon={isIcon} {...remainingProps}>
      Inline Badge
    </Badge>
  );
}) as StoryTemplate<Args>;

export const Inline = InlineTemplate.bind({});
Inline.args = {
  ...Primitive.args,
};

Inline.argTypes = {
  iconSize: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

Inline.storyName = 'InlineBadge';

export default createMeta({
  component: Badge,
  title: 'Components/Badges/Badge',
  argTypes: {
    isIcon: {
      table: {
        disable: true,
      },
    },
  },
});
