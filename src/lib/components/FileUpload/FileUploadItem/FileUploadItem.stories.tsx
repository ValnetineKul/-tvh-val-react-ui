import React from 'react';
import FileUploadItem from './FileUploadItem';
import { createMeta } from '../../../story-utils';

const Template = (args: React.ComponentProps<typeof FileUploadItem>) => {
  return <FileUploadItem {...args} />;
};

export const Primitive = Template.bind({});
Primitive.args = {
  fileName: 'File',
  readOnly: false,
};
Primitive.storyName = 'FileUploadItem';

export default createMeta({
  component: FileUploadItem,
  title: 'Components/InputFields/FileUpload/FileUploadItem',
  argTypes: {
    fileStatus: {
      control: {
        type: 'select',
        options: ['success', 'warning', 'loading', undefined],
      },
    },
  },
});
