import React from 'react';
import type { ComponentProps } from 'react';
import { createMeta } from '../../../story-utils';
import Icon from '../../../components/Icon';
import { FileUpload } from '../../../components/Icon/icons/functional';
import Button from '../../../components/Buttons/Button';
import Typography from '../../../components/Typography';
import TextField from '../../../components/TextField';
import DialogContent from './DialogContent';

type Props = ComponentProps<typeof DialogContent>;
const Template = (args: Props) => <DialogContent {...args} />;

export const Primitive = Template.bind({});
Primitive.args = {
  children: <Typography variant="body500">You will not be able to recover it</Typography>,
};
Primitive.storyName = 'textContent';

export const FormContent = Template.bind({});
FormContent.args = {
  children: (
    <>
      <Typography variant="body500">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</Typography>
      <div style={{ marginTop: '16px' }}>
        <Button startIcon={<Icon icon={FileUpload} title="start" />} variant="secondary" label="Upload file" />
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginTop: '16px' }}>
          <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
        </li>
        <li style={{ marginTop: '16px' }}>
          <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
        </li>
        <li style={{ marginTop: '16px' }}>
          <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
        </li>
        <li style={{ marginTop: '16px' }}>
          <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
        </li>
        <li style={{ marginTop: '16px' }}>
          <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
        </li>
      </ul>
    </>
  ),
};
FormContent.storyName = 'formContent';

export default createMeta({
  component: DialogContent,
  title: 'Patterns/Dialogs/DialogContent',
});
