import React from 'react';
import type { ComponentProps } from 'react';
import { render, screen } from '../../../test-utils';
import DrawerHeader from './DrawerHeader';
import { Primitive, Heading, HeadingWithStartButton } from './DrawerHeader.stories';
import type { Story } from '../../../story-utils';

describe('Drawer', () => {
  describe('Should render stories correctly', () => {
    const cases: [string, Story<ComponentProps<typeof DrawerHeader>>][] = [
      ['logo', Primitive],
      ['heading', Heading],
      ['heading with start button', HeadingWithStartButton],
    ];
    test.each(cases)('story: %p', (testName, storybookCase) => {
      const { container } = render(
        <DrawerHeader {...storybookCase.args}>
          <div>Content</div>
        </DrawerHeader>
      );
      expect(container.firstChild).toMatchSnapshot(testName);
    });
  });

  it('Should render heading', () => {
    const onClose = jest.fn();
    render(
      <DrawerHeader onClose={onClose} heading="Test">
        <div>Content</div>
      </DrawerHeader>
    );
    expect(screen.getByText(/Test/)).toBeInTheDocument();
    expect(screen.queryByAltText(/logo/)).not.toBeInTheDocument();
  });

  it('Should render heading with start button', () => {
    const onClose = jest.fn();
    const onStartButtonClick = jest.fn();
    render(
      <DrawerHeader onClose={onClose} heading="Test" onStartButtonClick={onStartButtonClick}>
        <div>Content</div>
      </DrawerHeader>
    );
    expect(screen.getByText(/Test/)).toBeInTheDocument();
    expect(screen.getByLabelText(/back/, { selector: 'button' })).toBeInTheDocument();
    expect(screen.queryByAltText(/logo/)).not.toBeInTheDocument();
  });

  it('Should render logo if heading is empty', () => {
    const onClose = jest.fn();
    render(
      <DrawerHeader onClose={onClose} heading="">
        <div>Content</div>
      </DrawerHeader>
    );
    expect(screen.getByAltText(/Logo/)).toBeInTheDocument();
  });
});
