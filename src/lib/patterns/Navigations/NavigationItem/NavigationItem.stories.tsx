import React from 'react';
import { Link } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { UserCircle, AngleRight } from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';
import Tag from '../../../components/Tags/Tag';
import Typography from '../../../components/Typography';
import { createMeta, createTemplate } from '../../../story-utils';

const Template = createTemplate(NavigationItem);

const HorizontalPrimitive = Template.bind({});
HorizontalPrimitive.args = {
  horizontal: true,
  selected: false,
  component: Link,
  to: '/whereToGoTo',
  label: '',
};

export const HorizontalNone = Template.bind({});
HorizontalNone.args = {
  ...HorizontalPrimitive.args,
  label: 'Label',
};

HorizontalNone.argTypes = {
  horizontal: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

HorizontalNone.storyName = 'HorizontalNone';

export const HorizontalIconOnly = Template.bind({});
HorizontalIconOnly.args = {
  ...HorizontalPrimitive.args,
  icon: <Icon icon={UserCircle} />,
};

HorizontalIconOnly.argTypes = {
  label: {
    table: {
      disable: true,
    },
  },
  icon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  horizontal: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

HorizontalIconOnly.storyName = 'HorizontalIconOnly';

export const HorizontalTopIcon = Template.bind({});
HorizontalTopIcon.args = {
  ...HorizontalPrimitive.args,
  icon: <Icon icon={UserCircle} />,
  label: 'Label',
};

HorizontalTopIcon.argTypes = {
  icon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  horizontal: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

HorizontalTopIcon.storyName = 'HorizontalTopIcon';

const VerticalPrimitive = Template.bind({});

VerticalPrimitive.args = {
  vertical: true,
  selected: false,
  label: '',
};

export const VerticalText = Template.bind({});
VerticalText.args = {
  ...VerticalPrimitive.args,
  label: 'Label',
};

VerticalText.argTypes = {
  vertical: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

VerticalText.storyName = 'VerticalText';

export const VerticalStartIcon = Template.bind({});
VerticalStartIcon.args = {
  ...VerticalPrimitive.args,
  startIcon: <Icon icon={UserCircle} />,
  label: 'Label',
};

VerticalStartIcon.argTypes = {
  startIcon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  vertical: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

VerticalStartIcon.storyName = 'VerticalStartIcon';

export const VerticalEndIcon = Template.bind({});
VerticalEndIcon.args = {
  ...VerticalPrimitive.args,
  endIcon: <Icon icon={AngleRight} />,
  label: 'Label',
};

VerticalEndIcon.argTypes = {
  endIcon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  vertical: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

VerticalEndIcon.storyName = 'VerticalEndIcon';

export const VerticalStartAndEndIcon = Template.bind({});
VerticalStartAndEndIcon.args = {
  ...VerticalPrimitive.args,
  startIcon: <Icon icon={UserCircle} />,
  endIcon: <Icon icon={AngleRight} />,
  label: 'Label',
};

VerticalStartAndEndIcon.argTypes = {
  startIcon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  endIcon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  vertical: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

VerticalStartAndEndIcon.storyName = 'VerticalStartAndEndIcon';

export const VerticalInfoBottom = Template.bind({});
VerticalInfoBottom.args = {
  ...VerticalPrimitive.args,
  label: 'Label',
  subLabel: 'subLabel',
};

VerticalInfoBottom.argTypes = {
  subLabel: {
    table: {
      disable: false,
    },
  },
  vertical: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

VerticalInfoBottom.storyName = 'VerticalInfoBottom';

export const VerticalTagAndSubLabelAndStartIcon = Template.bind({});
VerticalTagAndSubLabelAndStartIcon.args = {
  ...VerticalPrimitive.args,
  label: 'Label',
  tag: <Tag label="Tag" />,
  startIcon: <Icon icon={UserCircle} />,
  subLabel: (
    <Typography component="div" variant="body400" secondary>
      SubLabel Component
    </Typography>
  ),
};

VerticalTagAndSubLabelAndStartIcon.argTypes = {
  subLabel: {
    table: {
      disable: false,
    },
    control: { disable: true },
  },
  tag: {
    table: {
      disable: false,
    },
    control: { disable: true },
  },
  vertical: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};

VerticalTagAndSubLabelAndStartIcon.storyName = 'VerticalTagAndSubLabelAndStartIcon';

export default createMeta({
  component: NavigationItem,
  title: 'Patterns/Navigations/NavigationItem',
  argTypes: {
    onClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    subLabel: {
      table: {
        disable: true,
      },
    },
    tag: {
      table: {
        disable: true,
      },
    },
    startIcon: {
      table: {
        disable: true,
      },
    },
    endIcon: {
      table: {
        disable: true,
      },
    },
    horizontal: {
      table: {
        disable: true,
      },
    },
    vertical: {
      table: {
        disable: true,
      },
    },
    elementType: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'React or HTML element type' },
      },
    },
    component: {
      control: {
        disable: true,
      },
    },
    href: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'If "href" is filled, the component will immediately transform to HTML link tag "a"' },
      },
    },
    to: {
      control: {
        disable: true,
      },
    },
    download: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail:
            'If "href" and "download" are filled – downloads the file when clicking on link (instead of navigating to the file)',
        },
      },
    },
  },
});
