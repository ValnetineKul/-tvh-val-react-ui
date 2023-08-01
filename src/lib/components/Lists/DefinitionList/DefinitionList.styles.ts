import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'definitionKey' | 'definitionValue'>({ name: 'DefinitionList' })(
  (theme, _params, classes) => ({
    root: {
      display: 'flex',
      flexFlow: 'row  wrap',
      flexBasis: '100%',
    },
    header: {
      width: '100%',
      padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']}`,
      marginTop: theme.layoutSpacing['spacing/000'],
      marginBottom: theme.layoutSpacing['spacing/000'],
      '@media print': {
        colorAdjust: 'exact',
      },
    },
    definitionsList: {
      marginTop: theme.layoutSpacing['spacing/000'],
      marginBottom: theme.layoutSpacing['spacing/000'],
      columns: 1,
      flexBasis: '100%',
    },
    listHalfWidth: {
      [theme.breakpoints.up('sm')]: {
        flexBasis: '50%',
      },
    },
    listFullWidth: {
      [theme.breakpoints.up('sm')]: {
        flexBasis: '100%',
      },
    },
    cols1: {
      [theme.breakpoints.up('sm')]: {
        columns: 1,
      },
    },
    cols2: {
      [theme.breakpoints.up('sm')]: {
        columns: 2,
        columnFill: 'balance',
      },
    },
    definitionWrapper: {
      breakInside: 'avoid-column',
    },
    definitionsItem: {
      display: 'flex',
      flexDirection: 'column',
      wordBreak: 'break-word',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    definitionKey: {
      minWidth: 120,
      padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/000']}`,
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.layoutSpacing['spacing/300'],
      },
    },
    definitionValue: {
      minWidth: 120,
      marginLeft: theme.layoutSpacing['spacing/000'],
      padding: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/300']}`,
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.layoutSpacing['spacing/300'],
      },
    },
    width10_90: {
      [`&.${classes.definitionKey}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '10%',
        },
      },
      [`&.${classes.definitionValue}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '90%',
        },
      },
    },
    width20_80: {
      [`&.${classes.definitionKey}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '20%',
        },
      },
      [`&.${classes.definitionValue}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '80%',
        },
      },
    },
    width30_70: {
      [`&.${classes.definitionKey}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '30%',
        },
      },
      [`&.${classes.definitionValue}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '70%',
        },
      },
    },
    width40_60: {
      [`&.${classes.definitionKey}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '40%',
        },
      },
      [`&.${classes.definitionValue}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '60%',
        },
      },
    },
    width50_50: {
      [`&.${classes.definitionKey}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '50%',
        },
      },
      [`&.${classes.definitionValue}`]: {
        [theme.breakpoints.up('sm')]: {
          flexBasis: '50%',
        },
      },
    },
    content: {
      display: 'block',
    },
  })
);

export default useStyles;
