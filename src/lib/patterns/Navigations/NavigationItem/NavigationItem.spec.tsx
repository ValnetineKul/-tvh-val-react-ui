import React from 'react';
import { Link } from 'react-router-dom';
import { render, screen } from '../../../test-utils';
import NavigationItem from './NavigationItem';
import { UserCircle, AngleRight } from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';

describe('NavigationItem', () => {
  describe('Horizontal', () => {
    it('Should render correctly horizontal', () => {
      const { container } = render(
        <NavigationItem icon={<Icon icon={UserCircle} />} horizontal component={Link} to="/" label="Label" />
      );
      expect(container.firstChild).toMatchSnapshot('horizontal');
    });
    it('Should be selected', () => {
      render(<NavigationItem horizontal component={Link} to="/" label="Label" selected />);
      const item = screen.getByRole('menuitem');
      expect(item.className).toMatch('selected');
    });
    it('Should render icon', () => {
      render(
        <NavigationItem
          horizontal
          icon={<Icon icon={UserCircle} title="icon" />}
          component={Link}
          to="/"
          label="Label"
        />
      );
      expect(screen.getByText(/userCircle.svg/)).toBeInTheDocument();
    });
  });

  describe('Vertical', () => {
    it('Should render correctly vertical', () => {
      const { container } = render(<NavigationItem vertical component={Link} to="/" label="Label" />);
      expect(container.firstChild).toMatchSnapshot('vertical');
    });
    it('Should be selected', () => {
      render(<NavigationItem vertical component={Link} to="/" label="Label" selected />);
      const item = screen.getByRole('menuitem');
      expect(item.className).toMatch('selected');
    });
    it('Should render startIcon', () => {
      render(
        <NavigationItem
          vertical
          startIcon={<Icon icon={UserCircle} title="startIcon" />}
          component={Link}
          to="/"
          label="Label"
        />
      );
      expect(screen.getByText(/userCircle.svg/)).toBeInTheDocument();
    });
    it('Should render endIcon', () => {
      render(
        <NavigationItem
          vertical
          endIcon={<Icon icon={AngleRight} title="endIcon" />}
          component={Link}
          to="/"
          label="Label"
        />
      );
      expect(screen.getByText(/angleRight.svg/)).toBeInTheDocument();
    });
    it('Should render startIcon and endIcon', () => {
      render(
        <NavigationItem
          vertical
          startIcon={<Icon icon={UserCircle} title="startIcon" />}
          endIcon={<Icon icon={AngleRight} title="endIcon" />}
          component={Link}
          to="/"
          label="Label"
        />
      );
      expect(screen.getByText(/userCircle.svg/)).toBeInTheDocument();
      expect(screen.getByText(/angleRight.svg/)).toBeInTheDocument();
    });
    it('Should render subLabel', () => {
      render(<NavigationItem vertical to="/" label="Label" subLabel="Sub label" />);
      expect(screen.getByText(/Sub label/)).toBeInTheDocument();
    });
  });
});
