import React from 'react';
import { createMeta } from '../../../../story-utils';
import type { StoryTemplate } from '../../../../story-utils';
import StepIndicator from '../StepIndicator';
import Step from '../Step';
import StepButton from './StepButton';
import { buttonBaseStoryArgs } from '../../../ButtonBase';

type Props = React.ComponentProps<typeof StepButton>;
type Args = Omit<Props, 'label' | 'to' | 'disabled'>;

const Template = ((args: Args) => {
  return (
    <StepIndicator activeStep={1}>
      <Step completed>
        <StepButton {...args} label="Completed step (link)" href="/whereToGoTo" />
      </Step>
      <Step completed={false}>
        <StepButton {...args} label="Active step" />
      </Step>
      <Step>
        <StepButton {...args} label="Future step" disabled />
      </Step>
    </StepIndicator>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  hiddenLabel: false,
};
Primitive.storyName = 'StepButton';

export default createMeta({
  component: StepButton,
  title: 'Components/ProgressIndicators/StepIndicator/StepButton',
  argTypes: {
    label: {
      control: {
        disable: true,
      },
    },
    disabled: {
      control: {
        disable: true,
      },
    },
    ...buttonBaseStoryArgs,
  },
});
