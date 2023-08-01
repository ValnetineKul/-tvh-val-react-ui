import { action } from '@storybook/addon-actions';
import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import PhoneField from './PhoneField';
import Typography from '../Typography';
import type { Getters, PhoneNumber } from './PhoneField.types';

type Props = ComponentProps<typeof PhoneField>;
type Args = Omit<Props, 'value' | 'onChange'>;

const Template = ((args: Args) => {
  const [number, setNumber] = useState('');

  const handlePhoneChange = (v: number | string) => {
    setNumber(v as string);
    action('onPhoneChange')(v);
  };

  return <PhoneField {...args} value={number} onChange={handlePhoneChange} />;
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Phone',
  required: true,
  errorMessage: '',
  disabled: false,
  readOnly: false,
  fullWidth: false,
};
Primitive.storyName = 'PhoneField';

const GettersTemplate = ((args: Args) => {
  const [number, setNumber] = useState('');
  const [legacyNumber, setLegacyNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isPossiblePhoneNumber, setIsPossiblePhoneNumber] = useState(false);
  const [formatPhoneNumber, setFormatPhoneNumber] = useState('');
  const [parsePhoneNumber, setParsePhoneNumber] = useState<PhoneNumber>();
  const [countryCode, setCountryCode] = useState('');

  const handlePhoneChange = (v: number | string, getters: Getters) => {
    setNumber(v as string);
    action('onPhoneChange')(v);

    setLegacyNumber(getters.getLegacyNumber());
    setIsValidPhoneNumber(getters.isValidPhoneNumber());
    setIsPossiblePhoneNumber(getters.isPossiblePhoneNumber());
    setFormatPhoneNumber(getters.getFormattedPhoneNumber());
    setParsePhoneNumber(getters.getParsedPhoneNumber());
    setCountryCode(getters.getCountryCode());
  };

  return (
    <>
      <PhoneField {...args} value={number} onChange={handlePhoneChange} />
      <Typography>Field value: {number}</Typography>
      <Typography>legacyNumber: {legacyNumber}</Typography>
      <Typography>isValidPhoneNumber: {isValidPhoneNumber.toString()}</Typography>
      <Typography>isPossiblePhoneNumber: {isPossiblePhoneNumber.toString()}</Typography>
      <Typography>formatPhoneNumber: {formatPhoneNumber}</Typography>
      <Typography>parsePhoneNumber: {parsePhoneNumber?.number}</Typography>
      <Typography>countryCode: {countryCode}</Typography>
    </>
  );
}) as StoryTemplate<Args>;

export const GettersStory = GettersTemplate.bind({});
GettersStory.args = {
  ...Primitive.args,
};
GettersStory.storyName = 'Getters';

export default createMeta({
  component: PhoneField,
  title: 'Components/InputFields/PhoneField',
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
    required: {
      table: {
        type: {
          detail: 'Marks the field as required',
        },
      },
    },
    errorMessage: {
      table: {
        type: {
          detail: 'Sets the error message and the error styling on the field',
        },
      },
    },
    disabled: {
      table: {
        type: {
          detail: 'Marks the field as disabled',
        },
      },
    },
    readOnly: {
      table: {
        type: {
          detail: 'Marks the field as readOnly',
        },
      },
    },
    defaultCountry: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'Sets the preselected country of the field. By default is Belgium.',
        },
      },
    },
  },
});
