import React from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import Typography from '../Typography';
import Accordion from './Accordion';
import Modal from '../../patterns/Dialogs/Modal';
import DialogContent from '../../patterns/Dialogs/DialogContent';
import DialogFooter from '../../patterns/Dialogs/DialogFooter';
import Button from '../Buttons/Button';

type Props = React.ComponentProps<typeof Accordion>;

const items = [
  {
    title: 'About the product',
    content:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam.',
    key: 'about',
  },
  {
    title: 'Technical specs',
    content: (
      <>
        <Typography variant="h4" component="span">
          Title
        </Typography>
        <Typography variant="body500">Another React component is rendered in the AccordionContent</Typography>
      </>
    ),
    key: 'tech_specs',
    badgeCount: 3,
  },
  {
    title: 'Alternatives',
    content: 'Some more regular text',
    key: 'alternatives',
  },
  {
    title: 'Frequently bought together',
    content: 'Some more regular text',
    key: 'bought_together',
  },
  {
    title: 'Frequently bought together and this will be the longest title for example',
    content: 'Some more regular text',
    key: 'long_title',
  },
];

const Template = createTemplate(Accordion);

const ControlledAccordionTemplate = (args: Props) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const { defaultExpandedPanels } = args;
  React.useEffect(() => {
    if (Array.isArray(defaultExpandedPanels)) {
      setExpanded(defaultExpandedPanels);
    }
  }, [defaultExpandedPanels]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? [panel] : []);
  };

  return <Accordion {...args} expanded={expanded} onChange={handleChange} />;
};

const ControlledWithModalTemplate = (args: Props) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [newActivePanel, setNewActivePanel] = React.useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { defaultExpandedPanels } = args;
  React.useEffect(() => {
    if (Array.isArray(defaultExpandedPanels)) {
      setExpanded(defaultExpandedPanels);
    }
  }, [defaultExpandedPanels]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    handleModalOpen();
    setNewActivePanel(isExpanded ? panel : undefined);
  };

  const handleSaveClick = () => {
    handleModalClose();
    setExpanded([newActivePanel]);
  };

  const createDialogContent = (key: string | undefined) => {
    if (!key) {
      return 'Do you want to close current accordion panel?';
    }
    const panel = items.find((item) => item.key === key);
    return `Do you want to open "${panel.title}" accordion panel?`;
  };

  return (
    <>
      <Accordion {...args} expanded={expanded} onChange={handleChange} />
      <Modal open={isModalOpen} onClose={handleModalClose} id="controlled-accordion" title="Controlled accordion">
        <DialogContent>{createDialogContent(newActivePanel)}</DialogContent>
        <DialogFooter
          actionButtons={[
            <Button label={`Yes, ${newActivePanel ? 'open' : 'close'}`} variant="primary" onClick={handleSaveClick} />,
            <Button label="Cancel" variant="tertiary" onClick={handleModalClose} />,
          ]}
        />
      </Modal>
    </>
  );
};

export const Primitive = Template.bind({});
Primitive.args = {
  items,
  defaultExpandedPanels: ['alternatives', 'about'],
  multipleOpen: true,
};

Primitive.storyName = 'accordion';
Primitive.argTypes = {
  expanded: {
    table: { disable: true },
  },
  onChange: {
    table: { disable: true },
  },
};

export const ControlledAccordion = ControlledAccordionTemplate.bind({});
ControlledAccordion.args = {
  items,
  multipleOpen: false,
  defaultExpandedPanels: ['bought_together'],
};

ControlledAccordion.storyName = 'controlledAccordion';
ControlledAccordion.argTypes = {
  expanded: {
    control: { disable: true },
  },
  multipleOpen: {
    control: { disable: true },
  },
  onExpandSideEffect: {
    table: { disable: true },
  },
};

export const ControlledWithModal = ControlledWithModalTemplate.bind({});
ControlledWithModal.args = {
  ...ControlledAccordion.args,
};

ControlledWithModal.storyName = 'controlledWithModal';
ControlledWithModal.argTypes = {
  ...ControlledAccordion.argTypes,
};

export default createMeta({
  component: Accordion,
  title: 'Components/Accordions/Accordion',
  argTypes: {
    items: {
      control: {
        disable: true,
      },
    },
    accordionDetailsClassName: {
      table: {
        disable: true,
      },
    },
    buttonProps: {
      table: {
        disable: true,
      },
    },
    titleProps: {
      table: {
        disable: true,
      },
    },
  },
});
