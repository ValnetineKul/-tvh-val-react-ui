import React from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '../../../../../themes/core';
import SpinnerWithBackdrop from './SpinnerWithBackdrop';
import { Card, CardHeader, CardContent, CardFooter } from '../../../Card';
import Button from '../../../Buttons/Button';
import filterImage from '../../../Card/mocked-assets/filter.jpg';
import { createMeta } from '../../../../story-utils';
import type { StoryTemplate } from '../../../../story-utils';

type Props = React.ComponentProps<typeof SpinnerWithBackdrop>;

const cardContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad blanditiis ex nam
  necessitatibus nihil nostrum quam quidem repudiandae tempora!`;

const RenderCard = () => (
  <Card direction="horizontal" wrapper={undefined} image={{ image: filterImage }}>
    <CardHeader title="Card Header" subtitle="Subtitle" />
    <CardContent>{cardContent}</CardContent>
    <CardFooter>
      <Button label="Action button" variant="primary" onClick={action('onClick')} />
    </CardFooter>
  </Card>
);

const Template = ((args: Props) => {
  const useStyles = makeStyles()(() => ({
    spinnerWithBackdrop: { width: '100%' },
    item: { paddingBottom: 24, listStyle: 'none', flexGrow: 1, flexBasis: 0 },
  }));
  const { classes } = useStyles();

  return (
    <>
      <SpinnerWithBackdrop {...args} className={classes.spinnerWithBackdrop}>
        <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
          <li className={classes.item}>{RenderCard()}</li>
          <li className={classes.item}>{RenderCard()}</li>
          <li className={classes.item}>{RenderCard()}</li>
          <li style={{ padding: 0 }} className={classes.item}>
            {RenderCard()}
          </li>
        </ul>
      </SpinnerWithBackdrop>
      <div style={{ marginTop: 20, height: 400 }}>
        Spinner with backdrop only covers the related section, scroll to see the behaviour of the spinner position
      </div>
    </>
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});

Primitive.args = {
  isLoading: true,
  size: 'md',
  isBackdropOpaque: false,
};
Primitive.storyName = 'ItemsListLoading';

export default createMeta({
  title: 'components/ProgressIndicators/Spinner/SpinnerWithBackdrop',
  component: SpinnerWithBackdrop,
  argTypes: {
    isBackdropOpaque: {
      table: {
        type: {
          summary: 'Used for disabling the transparent backdrop.',
        },
      },
    },
  },
});
