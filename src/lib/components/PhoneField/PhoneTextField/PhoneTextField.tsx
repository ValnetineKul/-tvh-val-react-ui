import React, { forwardRef } from 'react';

import TextField from '../../TextField';
import useStyles from './PhoneTextField.styles';

// This is required since TS needs named type to export as .d.ts file.
// Point being, we are npm package now and need to export TS typings.
export interface PhoneTextFieldProps extends React.ComponentProps<typeof TextField> {}

const PhoneTextField = forwardRef<HTMLInputElement, PhoneTextFieldProps>((props, ref) => {
  const { classes, cx } = useStyles();

  return (
    <TextField
      {...props}
      inputRef={ref}
      className={cx(classes.root, { [classes.rootReadOnly]: !!props.readOnly })}
      inputClassName={props.readOnly ? classes.inputReadOnly : classes.input}
      inputElementClassName={classes.inputElement}
    />
  );
});
PhoneTextField.displayName = 'PhoneTextField';

export default PhoneTextField;
