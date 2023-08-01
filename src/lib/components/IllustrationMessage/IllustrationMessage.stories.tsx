import { action } from '@storybook/addon-actions';
import { createTemplate, createMeta } from '../../story-utils';
import { ReactComponent as Bug } from '../Illustrations/illustrations/svg/bug.svg';
import { ReactComponent as NoResults } from '../Illustrations/illustrations/svg/noResults.svg';
import { ReactComponent as NoSearchResults } from '../Illustrations/illustrations/svg/noSearchResults.svg';
import IllustrationMessage from './IllustrationMessage';

const Template = createTemplate(IllustrationMessage);

export const LoadingErrorPrimitive = Template.bind({});
LoadingErrorPrimitive.args = {
  header: 'Unable to load information',
  description: 'Oops, we couldn’t retrieve this info at the moment.',
  actionLabel: 'Try again',
  direction: 'horizontal',
  SvgImage: Bug,
  onAction: action('onAction'),
};

LoadingErrorPrimitive.storyName = 'LoadingError';

export const EmptyPrimitive = Template.bind({});
EmptyPrimitive.args = {
  header: 'No lists yet',
  description: 'Create a list to save items for later.',
  actionLabel: 'Create list',
  direction: 'horizontal',
  SvgImage: NoResults,
  onAction: action('onAction'),
  alternativeActionLabel: 'Upload list',
  onAlternativeAction: action('onAlternativeAction'),
};

EmptyPrimitive.storyName = 'Empty';

export const NoResultsPrimitive = Template.bind({});
NoResultsPrimitive.args = {
  header: 'No results',
  description: 'Try adjusting your search or filters to find what you are looking for.',
  direction: 'horizontal',
  SvgImage: NoSearchResults,
};

NoResultsPrimitive.storyName = 'NoResults';

export default createMeta({
  component: IllustrationMessage,
  title: 'Components/InlineMessages/IllustrationMessage',
  argTypes: {
    SvgImage: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'The image in SVG format to be displayed',
        },
      },
    },
    actionLabel: {
      table: {
        type: {
          detail: 'The label of the action button',
        },
      },
    },
    direction: {
      table: {
        type: {
          detail: 'Direction of the message',
        },
      },
    },
  },
});
