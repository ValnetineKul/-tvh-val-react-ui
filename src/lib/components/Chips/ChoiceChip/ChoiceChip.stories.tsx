import React from 'react';
import type { ComponentProps } from 'react';
import { makeStyles } from '../../../../themes/core';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta, createTemplate } from '../../../story-utils';
import { buttonBaseStoryArgs } from '../../ButtonBase';
import Typography from '../../Typography';
import ChoiceChip from './ChoiceChip';
import chipImg from './mocked-assets/chipimage.png';

const useStyles = makeStyles()((theme) => ({
  rootCustomLabel: {
    whiteSpace: 'nowrap',
  },
  promoText: {
    color: theme.color['text/promo'],
  },
  pieceColor: {
    opacity: 0.75,
  },
}));

type Props = ComponentProps<typeof ChoiceChip>;

const Template = createTemplate(ChoiceChip);

const CustomTitleTemplate = ((args: Props) => {
  const { classes, cx } = useStyles();
  return (
    <ChoiceChip
      {...args}
      title={
        <Typography
          component="span"
          variant="body500"
          weight="emphasis"
          className={cx({ [classes.promoText]: !args.disabled })}
        >
          Save 10%
        </Typography>
      }
    />
  );
}) as StoryTemplate<Props>;

const CustomLabelTemplate = ((args: Props) => {
  const { classes, cx } = useStyles();
  return (
    <ChoiceChip
      {...args}
      label={
        <div className={classes.rootCustomLabel}>
          <Typography
            component="span"
            variant="body500"
            weight="emphasis"
            className={cx({ [classes.promoText]: !args.disabled })}
          >
            Buy 6
          </Typography>{' '}
          <Typography component="span" variant="body500">
            at € 4,00<span className={classes.pieceColor}>/piece</span>
          </Typography>
        </div>
      }
    />
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
};
Primitive.storyName = 'label';

export const Title = Template.bind({});
Title.args = {
  title: 'Title',
  label: 'Label',
};
Title.storyName = 'title';

export const CustomTitle = CustomTitleTemplate.bind({});
CustomTitle.args = {
  label: 'Buy 6 at $ 4.00/piece',
};
CustomTitle.argTypes = {
  title: {
    table: {
      disable: true,
    },
  },
};
CustomTitle.storyName = 'customTitle';

export const CustomLabel = CustomLabelTemplate.bind({});
CustomLabel.args = {};
CustomLabel.argTypes = {
  label: {
    table: {
      disable: true,
    },
  },
};
CustomLabel.storyName = 'customLabel';

export const Images = Template.bind({});
Images.args = {
  label: 'Label',
  image: chipImg,
};
Images.argTypes = {
  imagePadding: {
    table: {
      disable: false,
    },
  },
};
Images.storyName = 'image';

export const Placeholder = Template.bind({});
Placeholder.args = {
  label: 'Label',
  image: 'notknown',
};
Placeholder.storyName = 'placeholder';

export default createMeta({
  component: ChoiceChip,
  title: 'Components/Chips/ChoiceChip',
  argTypes: {
    onClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
    },
    label: {
      table: {
        type: { summary: 'String or custom element' },
      },
      control: {
        type: 'text',
      },
    },
    title: {
      table: {
        type: { summary: 'String or custom element' },
      },
      control: {
        type: 'text',
      },
    },
    image: {
      table: {
        type: { summary: 'Image file / url or custom element' },
      },
      control: {
        disable: true,
      },
    },
    imagePadding: {
      table: {
        disable: true,
      },
    },
    ...buttonBaseStoryArgs,
  },
});
