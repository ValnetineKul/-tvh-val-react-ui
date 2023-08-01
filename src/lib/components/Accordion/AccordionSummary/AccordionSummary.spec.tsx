import React from 'react';
import { render } from '../../../test-utils';
import AccordionSummary from './AccordionSummary';

describe('AccordionSummary', () => {
  it('Should render correctly', () => {
    const { container } = render(<AccordionSummary id="id" title="Accordion title" expanded={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
