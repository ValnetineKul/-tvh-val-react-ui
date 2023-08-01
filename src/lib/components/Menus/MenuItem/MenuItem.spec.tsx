import type { ComponentProps } from 'react';
import React from 'react';
import { render, userEvent, screen } from '../../../test-utils';
import MenuItem from './MenuItem';
import { AngleRight, FileDownload } from '../../Icon/icons/functional';
import Icon from '../../Icon';

import {
  Primitive,
  StartIcon,
  EndIcon,
  Tags,
  InlineMessages,
  SubLabel,
  Checkbox,
  ComponentLabel,
  CheckboxWithTag,
  StartIconWithSubLabel,
} from './MenuItem.stories';
import type { Story } from '../../../story-utils';

const props = {
  startIcon: <Icon icon={FileDownload} />,
  endIcon: <Icon icon={AngleRight} />,
  onClick: jest.fn(),
};

const checkboxProps = {
  checkbox: true,
  onCheckboxChange: jest.fn(),
};

describe('MenuItem', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe('Should render stories correctly', () => {
    const cases: [string, Story<ComponentProps<typeof MenuItem>>][] = [
      ['text', Primitive],
      ['component', ComponentLabel],
      ['start icon', StartIcon],
      ['end icon', EndIcon],
      ['tag', Tags],
      ['inline message', InlineMessages],
      ['sub label', SubLabel],
      ['start icon with sub label', StartIconWithSubLabel],
      ['checkbox', Checkbox],
      ['checkbox with tag', CheckboxWithTag],
    ];
    test.each(cases)('story: %p', (testName, storybookCase) => {
      const { container } = render(<MenuItem {...storybookCase.args} />);
      expect(container.firstChild).toMatchSnapshot(testName);
    });
  });

  it('Should ignore invalid tag', () => {
    render(<MenuItem label="example label" tag="invalid tag" />);
    expect(screen.queryByText('invalid tag')).not.toBeInTheDocument();
  });

  it('Should show tooltip on hover', async () => {
    const { rerender, container } = render(<MenuItem {...props} label="Long label" />);
    expect(container.querySelector('[role="tooltip"]')).toBeNull();

    const label = screen.getByText('Long label');

    Object.defineProperties(label, {
      scrollWidth: { configurable: true, value: 144 },
      offsetWidth: { configurable: true, value: 40 },
    });

    rerender(<MenuItem {...props} label="Long long label" />);

    const label1 = screen.getByText('Long long label');
    userEvent.hover(label1);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('Should trigger onClick', () => {
    const onClick = jest.fn();
    render(<MenuItem {...props} onClick={onClick} label="Label" />);
    const menuItemButton = screen.getByRole('button');
    menuItemButton.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should trigger onCheckboxChange', () => {
    const onCheckboxChange = jest.fn();
    render(<MenuItem {...checkboxProps} onCheckboxChange={onCheckboxChange} label="Label" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    userEvent.click(checkbox);
    expect(onCheckboxChange).toHaveBeenCalledTimes(1);
  });
});
