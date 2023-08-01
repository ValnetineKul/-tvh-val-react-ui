import React, { useState } from 'react';
import type { ComponentProps } from 'react';
import { createMeta } from '../../../story-utils';
import type { StoryTemplate } from '../../../story-utils';
import Button from '../../Buttons/Button';
import Typography from '../../Typography';
import StepIndicator from './StepIndicator';
import Step from './Step';
import StepButton from './StepButton';

const steps = [
  'Shipping & delivery',
  'Billing & payment very long step indicator button name which should be truncated',
  'Review your order',
  'Done',
];

type Props = ComponentProps<typeof StepIndicator>;
type Args = Omit<Props, 'activeStep'>;

const Template = ((args: Args) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getStepHandler = (step: number) => () => {
    const activeAndComptetedStep = steps.findIndex((_, i) => i in completed && i === step);

    if (activeAndComptetedStep !== -1) {
      const newCompleted = Object.keys(completed).reduce(
        (acc, key) => {
          if (Number(key) !== activeAndComptetedStep && Number(key) < activeAndComptetedStep) {
            (acc as { [key: string]: boolean })[key] = (completed as { [key: string]: boolean })[key];
          }
          return acc;
        },
        {} as {
          [k: number]: boolean;
        }
      );
      setCompleted(newCompleted);
    }

    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
      <StepIndicator {...args} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton label={label} disabled={index > activeStep} onClick={getStepHandler(index)} />
          </Step>
        ))}
      </StepIndicator>
      <div style={{ paddingTop: 16 }}>
        {!allStepsCompleted() ? (
          <Button variant="primary" type="button" onClick={handleComplete} label="Complete Step" />
        ) : (
          <Button variant="primary" type="button" onClick={handleReset} label="Reset" />
        )}
      </div>
    </>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.storyName = 'WithLabel';

const HiddenLabelTemplate = ((args: Args) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getStepHandler = (step: number) => () => {
    const activeAndComptetedStep = steps.findIndex((_, i) => i in completed && i === step);

    if (activeAndComptetedStep !== -1) {
      const newCompleted = Object.keys(completed).reduce((acc, key) => {
        if (Number(key) < activeAndComptetedStep) {
          (acc as { [key: string]: boolean })[key] = (completed as { [key: string]: boolean })[key];
        }
        return acc;
      }, {});
      setCompleted(newCompleted);
    }

    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const setPageTitle = steps.find((_, i) => i === activeStep);

  return (
    <>
      <StepIndicator {...args} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton hiddenLabel label={label} disabled={index > activeStep} onClick={getStepHandler(index)} />
          </Step>
        ))}
      </StepIndicator>
      <div style={{ paddingTop: 24 }}>
        <Typography headerType="functional" variant="h1">
          {allStepsCompleted() ? 'All steps completed' : setPageTitle}
        </Typography>
      </div>
      <div style={{ paddingTop: 16 }}>
        {!allStepsCompleted() ? (
          <Button variant="primary" type="button" onClick={handleComplete} label="Complete Step" />
        ) : (
          <Button variant="primary" type="button" onClick={handleReset} label="Reset" />
        )}
      </div>
    </>
  );
}) as StoryTemplate<Args>;

export const HiddenLabel = HiddenLabelTemplate.bind({});
HiddenLabel.storyName = 'HiddenLabel';

export default createMeta({
  component: StepIndicator,
  title: 'Components/ProgressIndicators/StepIndicator',
  argTypes: {
    activeStep: {
      control: {
        disable: true,
      },
    },
  },
});
