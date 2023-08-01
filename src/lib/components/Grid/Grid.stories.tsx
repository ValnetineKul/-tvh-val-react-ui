import type { ComponentProps } from 'react';
import React from 'react';
import { createMeta } from '../../story-utils';
import type { StoryTemplate } from '../../story-utils';
import Grid from './Grid';
import GridVisualizer from './GridVisualizer';

type Props = ComponentProps<typeof Grid>;

const Template = ((args: Props) => (
  <div style={{ position: 'relative' }}>
    <GridVisualizer />
    <Grid container {...args}>
      <Grid item xs={12}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 1</div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 2</div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 3</div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 4</div>
      </Grid>
    </Grid>
  </div>
)) as StoryTemplate<Props>;

const WithBreakpointTemplate = ((args: Props) => (
  <div style={{ position: 'relative' }}>
    <GridVisualizer />
    <Grid container {...args}>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 1</div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 2</div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 3</div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <div style={{ padding: '16px', backgroundColor: '#ccc', textAlign: 'center' }}>item 4</div>
      </Grid>
    </Grid>
  </div>
)) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.storyName = 'basic';

export const WithBreakpoint = WithBreakpointTemplate.bind({});
WithBreakpoint.storyName = 'withBreakpoint';

export default createMeta({
  component: Grid,
  title: 'Foundations/Grid',
  argTypes: {
    container: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary:
            'If true, the component will have the flex container behavior. You should be wrapping items with a container.',
        },
      },
    },
    item: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary:
            'If true, the component will have the flex item behavior. You should be wrapping items with a container.',
        },
      },
    },
    xs: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary:
            "Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority.",
        },
      },
    },
    sm: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary:
            "Defines the number of grids the component is going to use. It's applied for the sm breakpoint and wider screens if not overridden.",
        },
      },
    },
    md: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary:
            "Defines the number of grids the component is going to use. It's applied for the md breakpoint and wider screens if not overridden.",
        },
      },
    },
    lg: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary:
            "Defines the number of grids the component is going to use. It's applied for the lg breakpoint and wider screens if not overridden.",
        },
      },
    },
  },
});
