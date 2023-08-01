import type { ReactNode } from 'react';
import React, { useCallback, useEffect } from 'react';
import { default as MuiAccordion } from '@mui/material/Accordion';
import { default as MuiAccordionDetails } from '@mui/material/AccordionDetails';
import Divider from '../Divider';
import Surface from '../Surfaces/Surface';
import AccordionSummary from './AccordionSummary';
import useStyles from './Accordion.styles';
import type { DataAttributes } from '../../types/common';
import type { SurfaceColors } from './Accordion.types';

export interface AccordionProps<PanelKeys> {
  items: {
    title: ReactNode;
    content: ReactNode;
    key: PanelKeys;
    badgeCount?: number;
  }[];
  multipleOpen?: boolean;
  defaultExpandedPanels?: PanelKeys[] | boolean;
  onExpandSideEffect?: (panel: PanelKeys, isExpanded: boolean) => void;
  summarySurfaceColor?: SurfaceColors;
  className?: string;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  expanded?: PanelKeys[];
  onChange?: (panel: PanelKeys) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Accordion = <PanelKeys extends Readonly<string>>({
  items,
  multipleOpen = true,
  className,
  defaultExpandedPanels,
  onExpandSideEffect,
  buttonProps,
  summarySurfaceColor,
  expanded: expandedProp,
  onChange: onChangeProp,
}: AccordionProps<PanelKeys>) => {
  const { classes, cx } = useStyles();

  const isControlled = typeof expandedProp !== 'undefined';
  const [expanded, setExpanded] = React.useState<PanelKeys[]>([]);

  useEffect(() => {
    if (!isControlled) {
      if (!defaultExpandedPanels) return;

      if (defaultExpandedPanels === true) {
        setExpanded(items.map(({ key }) => key));
      } else {
        setExpanded(defaultExpandedPanels);
      }
    }
  }, [defaultExpandedPanels, items, isControlled]);

  const handleChange = useCallback(
    (panel: PanelKeys) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (multipleOpen) {
        isExpanded ? setExpanded(expanded.concat(panel)) : setExpanded(expanded.filter((item) => item !== panel));
      } else {
        setExpanded(isExpanded ? [panel] : []);
      }

      if (onExpandSideEffect) {
        onExpandSideEffect(panel, isExpanded);
      }
    },
    [expanded, multipleOpen, onExpandSideEffect]
  );

  const handleChangePanel = (panel: PanelKeys) => {
    if (!isControlled) {
      return handleChange(panel);
    }

    if (onChangeProp) {
      return onChangeProp(panel);
    }
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const panelId = `accordion_panel_${item.key}`;

        const expandedPanels = isControlled ? expandedProp : expanded;
        const isExpanded = expandedPanels.includes(item.key);

        return (
          <MuiAccordion
            expanded={isExpanded}
            onChange={handleChangePanel(item.key)}
            key={item.key}
            classes={{
              root: classes.itemRoot,
              expanded: classes.expanded,
            }}
          >
            <AccordionSummary
              surfaceColor={summarySurfaceColor}
              buttonProps={buttonProps}
              id={panelId}
              expanded={isExpanded}
              title={item.title}
              badgeCount={item.badgeCount}
            />

            <Surface color="150">
              <MuiAccordionDetails
                classes={{
                  root: cx(classes.contentRoot, { [classes.textContentRoot]: typeof item.content === 'string' }),
                }}
              >
                {item.content}
              </MuiAccordionDetails>
              <Divider />
            </Surface>
          </MuiAccordion>
        );
      })}
    </div>
  );
};

export default Accordion;
