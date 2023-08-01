import { action } from '@storybook/addon-actions';
import DrawerHeader from './DrawerHeader';
import { createMeta, createTemplate } from '../../../story-utils';

const Template = createTemplate(DrawerHeader);

export const Primitive = Template.bind({});
Primitive.args = {
  isLogo: true,
  onClose: action('onClose'),
};
Primitive.argTypes = {
  isLogo: {
    control: {
      disable: true,
    },
  },
  component: {
    control: {
      disable: true,
    },
  },
  heading: {
    table: {
      disable: true,
    },
  },
  onStartButtonClick: {
    table: {
      disable: true,
    },
  },
};
Primitive.storyName = 'Logo';

export const Heading = Template.bind({});
Heading.args = {
  heading: 'Main navigation',
  onClose: action('onClose'),
};
Heading.argTypes = {
  isLogo: {
    table: {
      disable: true,
    },
  },
  onStartButtonClick: {
    table: {
      disable: true,
    },
  },
  component: {
    table: {
      disable: true,
    },
  },
  href: {
    table: {
      disable: true,
    },
  },
  to: {
    table: {
      disable: true,
    },
  },
  target: {
    table: {
      disable: true,
    },
  },
};

export const HeadingWithStartButton = Template.bind({});
HeadingWithStartButton.args = {
  heading: 'Main navigation',
  onStartButtonClick: action('onStartButtonClick'),
  onClose: action('onClose'),
};
HeadingWithStartButton.argTypes = {
  isLogo: {
    table: {
      disable: true,
    },
  },
  component: {
    table: {
      disable: true,
    },
  },
  href: {
    table: {
      disable: true,
    },
  },
  to: {
    table: {
      disable: true,
    },
  },
  target: {
    table: {
      disable: true,
    },
  },
};
HeadingWithStartButton.storyName = 'HeadingWithStartButton';

export default createMeta({
  component: DrawerHeader,
  title: 'Patterns/Drawers/DrawerHeader',
  argTypes: {
    disabled: {
      table: {
        disable: true,
      },
    },
    download: {
      table: {
        disable: true,
      },
    },
  },
});
