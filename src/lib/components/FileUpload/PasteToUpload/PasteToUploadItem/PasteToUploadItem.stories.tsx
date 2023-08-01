import React from 'react';
import { action } from '@storybook/addon-actions';
import PasteToUploadItem from './PasteToUploadItem';
import { createMeta } from '../../../../story-utils';
import testImg from './mocked-assets/image.png';

const Template = (args: React.ComponentProps<typeof PasteToUploadItem>) => {
  return (
    <div style={{ width: '94px', height: '84px' }}>
      <PasteToUploadItem {...args} />
    </div>
  );
};

export const Primitive = Template.bind({});
Primitive.args = {
  src: testImg,
  fileName: 'Screenshot 2023-01-22 at 16.22.13',
  readOnly: false,
  index: 0,
  onClick: action('onImageClick'),
  onDeleteClick: action('onDeleteButtonClick'),
  selected: false,
};
Primitive.storyName = 'PasteToUploadItem';

export default createMeta({
  component: PasteToUploadItem,
  title: 'Components/InputFields/FileUpload/PasteToUpload/PasteToUploadItem',
});
