import React from 'react';
import { makeStyles } from '../../../../themes/core';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta, createTemplate } from '../../../story-utils';
import IconButton from '../../Buttons/IconButton';
import Icon from '../../Icon';
import { Print } from '../../Icon/icons/functional';
import Typography from '../../Typography';
import DefinitionList from '../../Lists/DefinitionList';
import StatusTag from '../../Tags/StatusTag';
import Image from '../../MediaItems/Image';
import TVH11635WheelBrakeCylinder2 from './mocked-assets/TVH11635WheelBrakeCylinder2.png';
import Footer from './Footer';

const equipmentDetailDefinitions = [
  {
    key: 'Make',
    value: 'Toyota',
  },
  {
    key: 'Model',
    value: '02-6FD10',
  },
  {
    key: 'Serial prefix',
    value: '8446',
  },
  {
    key: 'Serial number',
    value: '047363547484948',
  },
  {
    key: 'Production date',
    value: '⏤',
  },
  {
    key: 'Segment',
    value: '⏤',
  },
  {
    key: 'Series',
    value: 'S-Series',
  },
  {
    key: 'Lot',
    value: '⏤',
  },
];

const moreDetailsDefinitions = [
  {
    key: 'Model (book)',
    value: 'Model: S130, Serial prefix: 5246 Serial from: 11001 Serial to: And up, Published: —',
  },
  {
    key: 'Engine',
    value: 'Kubota V2003T',
  },
  {
    key: 'Fuel type',
    value: 'Diesel',
  },
  {
    key: 'Transmission',
    value: 'HTM',
  },
  {
    key: 'Masthead',
    value: '3A25A',
  },
];

const useStyles = makeStyles()((theme) => ({
  print: {
    marginBottom: theme.layoutSpacing['spacing/400'],
    '@media print': {
      display: 'none',
    },
  },
  titleH1: {
    marginBottom: theme.layoutSpacing['spacing/400'],
  },
  titleH3: {
    marginBottom: theme.layoutSpacing['spacing/450'],
  },
  definitionList: {
    marginBottom: theme.layoutSpacing['spacing/450'],
  },
  footer: {
    display: 'none',
    '@media print': {
      position: 'fixed',
      bottom: 0,
      width: '100% ',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  list: {
    listStyle: 'none',
    padding: theme.layoutSpacing['spacing/000'],
    margin: theme.layoutSpacing['spacing/000'],

    display: 'flex',
    flexFlow: 'wrap',
    gap: theme.layoutSpacing['spacing/400'],

    marginBottom: theme.layoutSpacing['spacing/200'],
  },
  tag: {
    '@media print': {
      colorAdjust: 'exact',
    },
  },
  image: {
    width: 'auto',
    height: 120,
    marginBottom: theme.layoutSpacing['spacing/350'],
  },
}));

type Props = React.ComponentProps<typeof Footer>;
const Template = createTemplate(Footer);

const CustomTemplate = ((args: Props) => {
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.print}>
        <IconButton
          size="md"
          icon={<Icon icon={Print} />}
          onClick={() => window.print()}
          tooltipLabel="Print to see PrintOut/Footer component"
        />
      </div>
      <div>
        <Typography variant="h1" className={classes.titleH1}>
          TOYOTA 02-6FD10
        </Typography>
        <div>
          <ul className={classes.list}>
            <li>
              <Typography component="span" variant="body500" weight="emphasis">
                Own reference:
              </Typography>{' '}
              <Typography component="span" variant="body500">
                Excavator
              </Typography>
            </li>
            <li>
              <Typography component="span" variant="body500" weight="emphasis">
                Location:
              </Typography>{' '}
              <Typography component="span" variant="body500">
                Hasselt
              </Typography>
            </li>
            <li>
              <StatusTag label="Active" status="success" size="sm" className={classes.tag} />
            </li>
          </ul>
          <Image
            src={TVH11635WheelBrakeCylinder2}
            alt="TVH11635 wheel brake cylinder 2"
            fallback="text"
            className={classes.image}
          />
          <Typography variant="h3" className={classes.titleH3}>
            Equipment details
          </Typography>
          <DefinitionList
            className={classes.definitionList}
            definitions={equipmentDetailDefinitions}
            cols={1}
            width="fullWidth"
            columnDistribution="30/70"
          />

          <Typography variant="h3" className={classes.titleH3}>
            More details
          </Typography>
          <DefinitionList definitions={moreDetailsDefinitions} cols={1} width="fullWidth" columnDistribution="30/70" />
        </div>
        <Footer {...args} className={classes.footer} />
      </div>
    </>
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  alt: 'Logo alternative text',
  text: 'www.tvh.com',
};
Primitive.storyName = 'footer';

export const PrintUsage = CustomTemplate.bind({});
PrintUsage.args = {
  ...Primitive.args,
};
PrintUsage.storyName = 'printUsage';

export default createMeta({
  component: Footer,
  title: 'Components/PrintOuts/Footer',
  argTypes: {
    logoClassName: {
      table: {
        disable: true,
      },
    },
  },
});
