import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import Button from '../Buttons/Button';
import Collapse from '../Collapse';
import Typography from '../Typography';
import Banner from './Banner';

type Props = React.ComponentProps<typeof Banner>;
const Template = createTemplate(Banner);

export const Primitive = Template.bind({});
Primitive.args = {
  status: 'success',
  message: 'Banner message',
  button: <Button label="Label" onClick={action('onButtonClick')} variant="tertiary" />,
  closable: true,
};

Primitive.storyName = 'Banner';

const ExpandableTemplate = (args: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Banner
      {...args}
      message={
        <>
          <Typography>This is an infomessage.</Typography>
          <Collapse open={isOpen}>
            <Typography>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras
              justo odio, dapibus ac facilisis in, egestas eget quam.
            </Typography>
          </Collapse>
          <Button
            label={isOpen ? 'Show less' : 'Show more'}
            variant="link"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </>
      }
    />
  );
};

export const Expandable = ExpandableTemplate.bind({});
Expandable.args = {
  status: 'info',
  button: <Button label="Label" onClick={action('onButtonClick')} variant="tertiary" />,
  closable: true,
};

Expandable.argTypes = {
  message: {
    control: { disable: true },
  },
};

Expandable.storyName = 'ExpandableBanner';

export default createMeta({
  component: Banner,
  title: 'Components/Banners/Banner',
  argTypes: {
    status: {
      options: ['success', 'error', 'warning', 'info'],
      control: {
        type: 'select',
      },
    },
    button: {
      control: { disable: true },
      table: {
        type: { summary: 'Tertiary Button' },
      },
    },
  },
  parameters: {
    docs: {
      transformSource: (src: string) => src.replace(/\[object Object\]/g, 'Typography'),
    },
  },
});
