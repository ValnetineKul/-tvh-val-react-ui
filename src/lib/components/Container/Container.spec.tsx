import React from 'react';
import { render } from '../../test-utils';
import Container from './Container';

describe('Container', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <Container>
        <div>children</div>
      </Container>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
