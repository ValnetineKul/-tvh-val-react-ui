import React from 'react';
import { render } from '../../test-utils';
import Grid from './Grid';

describe('Grid', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <Grid container>
        <Grid item>
          <div>children</div>
        </Grid>
      </Grid>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
