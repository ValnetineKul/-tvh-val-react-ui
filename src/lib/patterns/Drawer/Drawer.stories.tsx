import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createMeta } from '../../story-utils';
import type { StoryTemplate } from '../../story-utils';
import Typography from '../../components/Typography';
import Button from '../../components/Buttons/Button';
import NavigationItem from '../Navigations/NavigationItem';
import Navigation from '../Navigations/Navigation';
import Drawer from './Drawer';

const links = [
  {
    label: 'Notifications',
    url: '/',
  },
  {
    label: 'My lists',
    url: '/mylists',
  },
  {
    label: 'My account',
    url: '/myaccount',
  },
  {
    label: 'Basketst',
    url: '/baskets',
  },
];

type Props = ComponentProps<typeof Drawer>;
type Args = Omit<Props, 'open' | 'onClose'>;

const Template = ((args: Args) => {
  const [isOpen, setIsOpen] = useState(false);
  const { heading, onStartButtonClick, ...remainingProps } = args;

  const [selectedState, setSelectedState] = useState('My lists');
  const handleClick = (item: string) => {
    selectedState !== item && setSelectedState(item);
  };

  return (
    <>
      <Button variant="primary" type="button" onClick={() => setIsOpen(true)} label="Open" />
      <Drawer {...remainingProps} isLogo open={isOpen} onClose={() => setIsOpen(false)}>
        <Navigation>
          {links.map(({ label, url }, key) => {
            return (
              <NavigationItem
                vertical
                key={key}
                component={Link}
                to={url}
                label={label}
                selected={selectedState === label}
                onClick={() => handleClick(label)}
              />
            );
          })}
        </Navigation>
      </Drawer>
    </>
  );
}) as StoryTemplate<Args>;

const CustomTemplate = ((args: Args) => {
  const [isOpen, setIsOpen] = useState(false);
  const { heading, onStartButtonClick, ...remainingProps } = args;

  return (
    <>
      <Button variant="primary" type="button" onClick={() => setIsOpen(true)} label="Open" />
      <Drawer {...remainingProps} isLogo open={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Drawer>
    </>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  anchor: 'left',
  href: '/',
};
Primitive.argTypes = {
  disablePaddings: {
    table: {
      disable: true,
    },
  },
  width: {
    table: {
      disable: true,
    },
  },
};
Primitive.storyName = 'navigation';

export const Content = CustomTemplate.bind({});
Content.args = {
  anchor: 'left',
  children: (
    <Typography variant="body500">
      Cras mattis consectetur purus sit amet fermentum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
      auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat
      porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Aenean eu leo quam.
      Pellentesque ornare sem lacinia quam venenatis vestibulum.
    </Typography>
  ),
  disablePaddings: false,
  width: 'md',
};
Content.storyName = 'content';

export default createMeta({
  component: Drawer,
  title: 'Patterns/Drawers/Drawer',
  argTypes: {
    component: {
      control: {
        disable: true,
      },
    },
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
    isLogo: {
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
  },
});
