import type { FC, ReactElement } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';

import OverflowAction from '../../patterns/OverflowAction';
import useStyles from './ActionsGroup.styles';
import useScreenSize from '../../hooks/useScreenSize';
import { HasSingleIconButtonContext } from '../../patterns/Headers/SectionHeader/HasSingleIconButtonContext/HasSingleIconButtonContext';

export type RenderAction = (props: { isFullWidth?: boolean; isSquashed?: boolean }) => ReactElement;

export interface ActionsGroupProps {
  buttons?: (RenderAction | undefined)[];
  iconButtons?: (RenderAction | undefined)[];
  visibleAmount?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  className?: string;
  mobileTitle?: string;
}

const ActionsGroup: FC<ActionsGroupProps> = ({
  buttons = [],
  iconButtons = [],
  visibleAmount = 3,
  className,
  mobileTitle,
}) => {
  const { setHasSingleIconButton } = useContext(HasSingleIconButtonContext);
  const { classes, cx } = useStyles();
  const { isTablet, isTabletUp } = useScreenSize('Tablet');
  const isMobile = !isTabletUp;
  const actualVisibleAmount = !isTabletUp || isTablet ? Number(visibleAmount) : Number(visibleAmount) + 1;

  useEffect(() => {
    if (setHasSingleIconButton) {
      setHasSingleIconButton(buttons.length === 0 && iconButtons.length === 1);
    }
  }, [buttons, iconButtons, setHasSingleIconButton]);

  const actions = useMemo(() => {
    const actualButtons = buttons.filter((b) => b);
    const actualIconButtons = iconButtons.filter((ib) => ib);
    const hasOverflow = actualButtons.length + actualIconButtons.length > actualVisibleAmount;

    const { menuItems, actionButtons } = actualButtons
      .concat([...actualIconButtons].reverse())
      .reduce<{ actionButtons: ReactElement[]; menuItems: ReactElement[] }>(
        (acc, renderButton: RenderAction, index) => {
          if (hasOverflow && index + 1 > actualVisibleAmount - 1) {
            acc.menuItems = acc.menuItems.concat(renderButton({ isSquashed: true }));
            return acc;
          }
          acc.actionButtons = acc.actionButtons.concat(
            <li
              className={cx(classes.actionWrapper, {
                [classes.buttonWrapperMobile]: isMobile && actualButtons.length > index,
                [classes.lastButtonWrapperMobile]: hasOverflow
                  ? isMobile && actualVisibleAmount - 1 === index + 1
                  : isMobile && actualButtons.length - 1 === index,
              })}
              key={`action-${index}`}
            >
              {renderButton({ isFullWidth: isMobile })}
            </li>
          );
          return acc;
        },
        {
          menuItems: [],
          actionButtons: [],
        }
      );

    return (
      <>
        {actionButtons}
        {menuItems.length > 0 && (
          <li className={classes.actionWrapper}>
            <OverflowAction menuItems={menuItems} mobileMenuTitle={mobileTitle} />
          </li>
        )}
      </>
    );
    // eslint-disable-next-line
  }, [isMobile, buttons, iconButtons, cx, classes, actualVisibleAmount]);

  return (
    <ul
      className={cx(
        classes.root,
        {
          [classes.startAlinment]: isMobile,
          [classes.reversedList]: !isTablet && isTabletUp,
        },
        className
      )}
    >
      {actions}
    </ul>
  );
};
export default ActionsGroup;
