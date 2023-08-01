import { action } from '@storybook/addon-actions';
import { createMeta, createTemplate } from '../../../story-utils';
import PasteToUpload from './PasteToUpload';

const Template = createTemplate(PasteToUpload);

export const Primitive = Template.bind({});
Primitive.args = {
  disabled: false,
  multiple: true,
  readOnly: false,
  updateFilesCb: (files) => {
    action('callbackFunctionForSendingFilesToParentComponent')(files);
  },
};

Primitive.storyName = 'PasteToUpload';

export default createMeta({
  component: PasteToUpload,
  title: 'Components/InputFields/FileUpload/PasteToUpload/PasteToUpload',
});
