import type { ComponentProps } from 'react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import { useSurface } from '../../../../themes/core';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta } from '../../../story-utils';
import { AngleRight, FileDownload } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import InlineMessage from '../../InlineMessage';
import Tag from '../../Tags/Tag';
import MenuItem from './MenuItem';

type Props = ComponentProps<typeof MenuItem>;

const Template = (args: Props) => {
  const {
    onCheckboxChange,
    checkboxProps,
    checkbox: hasCheckbox,
    indeterminate: isIndeterminate,
    ...remainingProps
  } = args;
  const { color: onSurface } = useSurface();
  return <MenuItem {...remainingProps} color={onSurface} onClick={action('onClick')} />;
};

const TemplateCheckbox = ((args: Props) => {
  const [{ selected }, updateArgs] = useArgs();
  const { color: onSurface } = useSurface();
  const handleChange = () => {
    updateArgs({ selected: !selected });
    action('onCheckboxChange')(selected);
  };
  const { onClick, buttonProps, startIcon, endIcon, subLabel, inlineMessage, ...remainingProps } = args;

  return (
    <MenuItem {...remainingProps} color={onSurface} checkbox selected={selected} onCheckboxChange={handleChange} />
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Item Label',
  selected: false,
  disabled: false,
};
Primitive.storyName = 'label';

export const ComponentLabel = Template.bind({});
ComponentLabel.args = {
  label: <div>Component Label</div>,
  selected: false,
  disabled: false,
};
ComponentLabel.argTypes = {
  label: {
    control: {
      disable: true,
    },
  },
};
ComponentLabel.storyName = 'componentLabel';

export const StartIcon = Template.bind({});
StartIcon.args = {
  ...Primitive.args,
  startIcon: <Icon icon={FileDownload} />,
};
StartIcon.argTypes = {
  startIcon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
StartIcon.storyName = 'startIcon';

export const EndIcon = Template.bind({});
EndIcon.args = {
  ...Primitive.args,
  endIcon: <Icon icon={AngleRight} />,
};
EndIcon.argTypes = {
  endIcon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
EndIcon.storyName = 'endIcon';

export const StartAndEndIcon = Template.bind({});
StartAndEndIcon.args = {
  ...Primitive.args,
  startIcon: <Icon icon={FileDownload} />,
  endIcon: <Icon icon={AngleRight} />,
};
StartAndEndIcon.argTypes = {
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
};
StartAndEndIcon.storyName = 'startAndEndIcon';

export const Tags = Template.bind({});
Tags.args = {
  ...Primitive.args,
  tag: <Tag label="123" />,
};
Tags.argTypes = {
  tag: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
Tags.storyName = 'tag';

export const InlineMessages = Template.bind({});
InlineMessages.args = {
  ...Primitive.args,
  inlineMessage: <InlineMessage message="Success message" status="success" />,
};
InlineMessages.argTypes = {
  inlineMessage: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
InlineMessages.storyName = 'inlineMessage';

export const SubLabel = Template.bind({});
SubLabel.args = {
  ...Primitive.args,
  subLabel: 'Extra info',
};
SubLabel.argTypes = {
  subLabel: {
    table: {
      disable: false,
    },
  },
};
SubLabel.storyName = 'subLabel';

export const StartIconWithSubLabel = Template.bind({});
StartIconWithSubLabel.args = {
  ...Primitive.args,
  startIcon: <Icon icon={FileDownload} />,
  subLabel: 'Extra info',
};
StartIconWithSubLabel.argTypes = {
  subLabel: {
    table: {
      disable: false,
    },
  },
  startIcon: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
StartIconWithSubLabel.storyName = 'startIconWithSubLabel';

export const StartIconWithSubLabelWithTag = Template.bind({});
StartIconWithSubLabelWithTag.args = {
  ...Primitive.args,
  tag: <Tag label="123" />,
  startIcon: <Icon icon={FileDownload} />,
  subLabel: 'Extra info',
};
StartIconWithSubLabelWithTag.argTypes = {
  tag: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
};
StartIconWithSubLabelWithTag.storyName = 'startIconWithSubLabelWithTag';

export const Checkbox = TemplateCheckbox.bind({});
Checkbox.args = {
  ...Primitive.args,
  onCheckboxChange: () => {},
  checkbox: true,
};

Checkbox.argTypes = {
  checkbox: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  indeterminate: {
    table: {
      disable: false,
    },
  },
  onCheckboxChange: {
    table: {
      disable: false,
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
  download: {
    table: {
      disable: true,
    },
  },
  to: {
    table: {
      disable: true,
    },
  },
  href: {
    table: {
      disable: true,
    },
  },
  target: {
    table: {
      disable: true,
    },
  },
  component: {
    table: {
      disable: true,
    },
  },
};

Checkbox.storyName = 'checkbox';

export const CheckboxWithTag = TemplateCheckbox.bind({});
CheckboxWithTag.args = {
  ...Primitive.args,
  onCheckboxChange: () => {},
  checkbox: true,
  tag: <Tag label="123" />,
};

CheckboxWithTag.argTypes = {
  checkbox: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  tag: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  indeterminate: {
    table: {
      disable: false,
    },
  },
  onCheckboxChange: {
    table: {
      disable: false,
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
  download: {
    table: {
      disable: true,
    },
  },
  to: {
    table: {
      disable: true,
    },
  },
  href: {
    table: {
      disable: true,
    },
  },
  target: {
    table: {
      disable: true,
    },
  },
  component: {
    table: {
      disable: true,
    },
  },
};
CheckboxWithTag.storyName = 'checkboxWithTag';

export default createMeta({
  component: MenuItem,
  title: 'Components/Menus/MenuItem',
  argTypes: {
    checkbox: {
      table: {
        disable: true,
      },
    },
    subLabel: {
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
    tag: {
      table: {
        disable: true,
      },
    },
    inlineMessage: {
      table: {
        disable: true,
      },
    },
    subMenu: {
      table: {
        disable: true,
      },
    },
    indeterminate: {
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
      table: {
        type: { detail: 'React.ReactElement' },
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
    index: {
      control: { disable: true },
    },
    focusVisibleClassName: {
      control: { disable: true },
    },
    labelClassName: {
      control: { disable: true },
    },
    onClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          detail: 'Callback fired when MenuItem button/link is cklicked',
        },
      },
    },
    onCheckboxChange: {
      table: {
        disable: true,
        type: {
          detail: 'Callback fired when the checkbox state is changed',
        },
      },
    },
  },
});
