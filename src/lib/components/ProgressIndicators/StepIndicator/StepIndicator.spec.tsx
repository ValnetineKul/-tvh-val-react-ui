import React from 'react';
import { render } from '../../../test-utils';
import Step from './Step';
import StepIndicator from './StepIndicator';

describe('StepIndicator', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <StepIndicator activeStep={0}>
        <Step>
          <span>Children</span>
        </Step>
      </StepIndicator>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
