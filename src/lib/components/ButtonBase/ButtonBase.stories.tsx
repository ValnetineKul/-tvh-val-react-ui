import React from 'react';
import { Link } from 'react-router-dom';
import { createMeta, createTemplate } from '../../story-utils';
import Button from '../Buttons/Button';
import { buttonBaseStoryArgs } from './storybookArgs';

const Template = createTemplate(Button, {
  variant: 'link',
  label: 'React router link',
});

const Primitive = Template.bind({});

export const RouterButton = Template.bind({});

RouterButton.args = {
  ...Primitive.args,
  component: Link,
  to: '/url',
};

RouterButton.storyName = 'routerButton';

export default createMeta({
  component: null,
  title: 'Components/ButtonBase',
  argTypes: {
    ...buttonBaseStoryArgs,
  },
  parameters: {
    docs: {
      transformSource: (src: string) => src.replace(/component=\{[\s\S]*?\}\}/gms, 'component={Link}'),
    },
    componentSubtitle: (
      <div>
        <p>
          <i>
            <b>ButtonBase</b>
          </i>{' '}
          is not a component
        </p>{' '}
        <p>
          Use{' '}
          <i>
            <b>useButtonBase</b>
          </i>{' '}
          hook to add to extend your component. It will receive{' '}
          <i>
            <b>component</b>
          </i>{' '}
          prop and all props that are allowed for that copmponent
        </p>
      </div>
    ),
  },
});
