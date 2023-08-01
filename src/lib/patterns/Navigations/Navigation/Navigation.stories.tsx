import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '../../../components/Divider';
import {
  AngleRight,
  FileCheck,
  Bell,
  Pen,
  FileDownload,
  UserCircle,
  ResearchRequest,
} from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';
import NavigationItem from '../NavigationItem';
import Navigation from './Navigation';
import { createMeta } from '../../../story-utils';

const headerLinks = [
  {
    label: 'Notifications',
    icon: <Icon icon={Bell} />,
    url: '/',
  },
  {
    label: 'My Lists',
    icon: <Icon icon={FileCheck} />,
    url: '/lists',
  },
  {
    label: 'John Doe',
    icon: <Icon icon={UserCircle} />,
    url: '/person',
  },
];

const labelLinks = [
  {
    label: 'Dashboard',
    url: '/',
  },
  {
    label: 'Notifications',
    url: '/notifications',
  },
];

const withStartIconLinks = [
  {
    label: 'My delivery settings with very long menu name which should be truncated',
    icon: <Icon icon={UserCircle} />,
    url: '/contacts',
  },
  {
    label: 'My invoices',
    icon: <Icon icon={Pen} />,
    url: '/invoices',
  },
  {
    label: 'My research results',
    icon: <Icon icon={ResearchRequest} />,
    url: '/results',
  },
];

const withEndIconButtons = [
  {
    label: 'Handling equipment',
    icon: <Icon icon={AngleRight} />,
  },
  {
    label: 'Promotions',
    icon: <Icon icon={AngleRight} />,
  },
];

const withStartAndEndIconButtons = [
  {
    label: 'My payment method',
    startIcon: <Icon icon={UserCircle} />,
    endIcon: <Icon icon={AngleRight} />,
  },
  {
    label: 'My address book',
    startIcon: <Icon icon={FileDownload} />,
    endIcon: <Icon icon={AngleRight} />,
  },
];

const subLabelLinks = [
  {
    label: 'Parts',
    subLabel: 'Extra info',
    url: '/parts',
  },
  {
    label: 'Baskets',
    subLabel: 'All baskets',
    url: '/baskets',
  },
];

export const Primitive = (args: React.ComponentProps<typeof Navigation>) => {
  const [selectedState, setSelectedState] = useState('Notifications');
  const handleClick = (item: string) => {
    selectedState !== item && setSelectedState(item);
  };

  return (
    <Navigation {...args}>
      {headerLinks.map(({ label, icon, url }, key) => {
        return (
          <NavigationItem
            horizontal
            key={key}
            label={label}
            icon={icon}
            href={url}
            selected={selectedState === label}
            onClick={() => handleClick(label)}
          />
        );
      })}
    </Navigation>
  );
};
Primitive.args = {};
Primitive.storyName = 'Horizontal';

export const NavigationVertical = (args: React.ComponentProps<typeof Navigation>) => {
  const [selectedState, setSelectedState] = useState('Notifications');
  const handleClick = (item: string) => {
    selectedState !== item && setSelectedState(item);
  };

  return (
    // Note: -1rem added to delete padding around story
    <div style={{ margin: '-1rem', width: 300 }}>
      <Navigation {...args}>
        {labelLinks.map(({ label, url }, key) => {
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
        <li role="separator">
          <Divider />
        </li>
        {withStartIconLinks.map(({ label, url, icon }, key) => {
          return (
            <NavigationItem
              vertical
              key={key}
              component={Link}
              to={url}
              startIcon={icon}
              label={label}
              selected={selectedState === label}
              onClick={() => handleClick(label)}
            />
          );
        })}
        <li role="separator">
          <Divider />
        </li>
        {withEndIconButtons.map(({ label, icon }, key) => {
          return (
            <NavigationItem
              vertical
              key={key}
              endIcon={icon}
              label={label}
              selected={selectedState === label}
              onClick={() => handleClick(label)}
            />
          );
        })}
        <li role="separator">
          <Divider />
        </li>
        {subLabelLinks.map(({ label, url, subLabel }, key) => {
          return (
            <NavigationItem
              vertical
              key={key}
              component={Link}
              to={url}
              label={label}
              subLabel={subLabel}
              selected={selectedState === label}
              onClick={() => handleClick(label)}
            />
          );
        })}
        <li role="separator">
          <Divider />
        </li>
        {withStartAndEndIconButtons.map(({ label, startIcon, endIcon }, key) => {
          return (
            <NavigationItem
              vertical
              key={key}
              startIcon={startIcon}
              endIcon={endIcon}
              label={label}
              selected={selectedState === label}
              onClick={() => handleClick(label)}
            />
          );
        })}
      </Navigation>
    </div>
  );
};
NavigationVertical.args = {};
NavigationVertical.storyName = 'Vertical';

export default createMeta({
  component: Navigation,
  title: 'Patterns/Navigations/Navigation',
});
