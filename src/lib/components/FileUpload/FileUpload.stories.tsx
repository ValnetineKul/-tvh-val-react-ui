import React, { useState } from 'react';
import type { FileUploadStatus } from './FileUpload.constants';
import FileUpload, { getFileId } from './FileUpload';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';

type Props = React.ComponentProps<typeof FileUpload>;

type Args = Omit<Props, 'onChange'>;

const Template = ((args: Args) => {
  const [files, setFiles] = useState<File[] | File | null>(args.value);
  return <FileUpload {...args} value={files} onChange={setFiles} />;
}) as StoryTemplate<Args>;

const commonArgs: Args = {
  value: null,
  label: 'Label',
  fileTypes: ['JPG', 'PNG', 'PDF'],
  maxFileSize: '1 MB',
  variant: 'dragAndDrop',
  additionalRestriction: "Maximum amount of 'lines': 250",
  disabled: false,
  required: false,
};

export const Primitive = Template.bind({});
Primitive.args = {
  ...commonArgs,
  shouldDisplayAllowedTypes: true,
};
Primitive.storyName = 'Single';

export const Forbidden = Template.bind({});
Forbidden.args = {
  ...commonArgs,
  fileTypes: undefined,
  forbiddenFileTypes: ['ZIP'],
  shouldDisplayForbiddenTypes: true,
};
Forbidden.storyName = 'SingleForbiddenFileTypes';

export const Multiple = Template.bind({});
Multiple.args = {
  ...Primitive.args,
  value: [],
  multiple: true,
};

const StatusTemplate = (args: Args) => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [fileStatuses, setFileStatuses] = useState<Record<string, FileUploadStatus>>({});

  const handleChange = (uploadedFiles: File[] | null) => {
    if (!uploadedFiles) return;
    const statuses = uploadedFiles.reduce<Record<string, FileUploadStatus>>((col, file) => {
      col[getFileId(file)] = 'success';
      return col;
    }, {});
    setFiles(uploadedFiles);
    setFileStatuses(statuses);
  };

  return <FileUpload {...args} value={files} onChange={handleChange} fileStatuses={fileStatuses} />;
};

export const MultipleWithStatus = StatusTemplate.bind({});
MultipleWithStatus.args = {
  ...Multiple.args,
};
MultipleWithStatus.storyName = 'MultipleWithStatus';

export default createMeta({
  component: FileUpload,
  title: 'Components/InputFields/FileUpload',
  argTypes: {
    multiple: {
      control: {
        disable: true,
      },
    },
    fileTypes: {
      control: {
        disable: true,
      },
    },
    forbiddenFileTypes: {
      control: {
        disable: true,
      },
    },
    value: {
      control: {
        disable: true,
      },
    },
    variant: {
      options: ['basic', 'dragAndDrop'],
      control: { type: 'radio' },
    },
  },
});
