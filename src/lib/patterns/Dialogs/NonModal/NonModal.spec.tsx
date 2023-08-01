import type { ComponentProps } from 'react';
import React from 'react';
import { screen, render, userEvent } from '../../../test-utils';
import NonModal from './NonModal';

type Props = ComponentProps<typeof NonModal>;

const props: Props = {
  isOpen: true,
  title: 'Title',
  onClose: jest.fn(),
};

describe('NonModal', () => {
  it('Should render correctly', () => {
    const { baseElement } = render(<NonModal {...props}>Content</NonModal>);
    expect(baseElement).toMatchSnapshot();
  });

  it('Should not render title', () => {
    const { title, ...noTitleProps } = props;
    render(
      <NonModal {...noTitleProps} priority="high">
        Content
      </NonModal>
    );

    const titleElement = screen.queryByText(/Title/);

    expect(titleElement).not.toBeInTheDocument();
  });

  describe('Should set position className', () => {
    const cases: [Props['position'], string][] = [
      [undefined, 'NonModal-positionBottomStart'],
      ['bottom-start', 'NonModal-positionBottomStart'],
      ['bottom-end', 'NonModal-positionBottomEnd'],
    ];
    test.each(cases)('given %p, returns %p', (input, expected) => {
      render(
        <NonModal position={input} isOpen>
          content
        </NonModal>
      );
      const content = screen.getByText('content');
      expect(content?.parentElement?.className).toMatch(expected);
    });
  });

  it('Should callback on header close button click', () => {
    render(<NonModal {...props} />);
    userEvent.click(screen.getByRole('button'));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
