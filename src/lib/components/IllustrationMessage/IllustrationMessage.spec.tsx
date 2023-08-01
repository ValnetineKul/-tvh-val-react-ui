import React from 'react';
import { render, userEvent } from '../../test-utils';
import IllustrationMessage from './IllustrationMessage';
import { ReactComponent as Bug } from '../Illustrations/illustrations/svg/bug.svg';

describe('IllustrationMessage', () => {
  it('Should render correctly', () => {
    const hanleAction = jest.fn();
    const { container } = render(
      <IllustrationMessage
        header="No results"
        description="Try adjusting your search or filters to find what you are looking for."
        actionLabel="Reload"
        onAction={hanleAction}
        alternativeActionLabel="Alternative"
        onAlternativeAction={jest.fn()}
        SvgImage={Bug}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should not render button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(min-width: 640px)',
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
    const { queryByRole } = render(
      <IllustrationMessage
        header="No results"
        description="Try adjusting your search or filters to find what you are looking for."
        SvgImage={Bug}
      />
    );
    const actionButton = queryByRole('button');
    expect(actionButton).not.toBeInTheDocument();
  });

  it('Should call onAction', () => {
    const hanleAction = jest.fn();
    const { getByRole } = render(
      <IllustrationMessage
        header="No results"
        description="Try adjusting your search or filters to find what you are looking for."
        actionLabel="Reload"
        onAction={hanleAction}
        SvgImage={Bug}
      />
    );
    const actionButton = getByRole('button');

    expect(actionButton).toBeInTheDocument();

    userEvent.click(actionButton);

    expect(hanleAction).toHaveBeenCalled();
  });
});
