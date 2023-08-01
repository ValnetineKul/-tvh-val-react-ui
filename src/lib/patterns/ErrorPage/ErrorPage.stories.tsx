import { action } from '@storybook/addon-actions';
import React from 'react';
import { createTemplate, createMeta } from '../../story-utils';
import Typography from '../../components/Typography';
import { ERROR_CODES } from './constants';
import type { LinkType } from './ErrorPage';
import ErrorPage from './ErrorPage';

const links: LinkType[] = [
  {
    name: 'Previous page',
    cb: action('callback for button'),
  },
  {
    name: 'Home page',
    url: '/',
  },
  {
    name: 'Contact us',
    url: '/',
  },
];

const Template = createTemplate(ErrorPage);

export const Primitive = Template.bind({});
Primitive.args = {
  header: 'Oops! Something went wrong.',
  description: 'We encountered an unknown error.',
  reference: '288h937njchyc89e84hfuf84ey48',
  onReload: action('reload'),
};

Primitive.storyName = 'unknown';
Primitive.argTypes = {
  links: {
    table: {
      disable: true,
    },
  },
  errorCode: {
    table: {
      disable: true,
    },
  },
  errorCodeClassName: {
    table: {
      disable: true,
    },
  },
};

export const BadRequest = Template.bind({});
BadRequest.args = {
  header: "We can't seem to find the page you're looking for.",
  description: 'The page you are trying to reach could not be found.',
  errorCode: ERROR_CODES.BAD_REQUEST,
  reference: '288h937njchyc89e84hfuf84ey48',
  links,
};

BadRequest.storyName = '400';
BadRequest.argTypes = {
  buttonProps: {
    table: {
      disable: true,
    },
  },
  onReload: {
    table: {
      disable: true,
    },
  },
};

export const NotAuthorized = Template.bind({});
NotAuthorized.args = {
  header: 'Access denied',
  description: 'You don’t have permission to access the requested page.',
  errorCode: ERROR_CODES.NOT_AUTHORIZED,
  links,
  reference: '288h937njchyc89e84hfuf84ey48',
};

NotAuthorized.storyName = '403';
NotAuthorized.argTypes = {
  buttonProps: {
    table: {
      disable: true,
    },
  },
  onReload: {
    table: {
      disable: true,
    },
  },
};

export const PageNotFound = Template.bind({});
PageNotFound.args = {
  header: "We can't seem to find the page you're looking for.",
  description: 'The page you are trying to reach could not be found.',
  errorCode: ERROR_CODES.PADE_NOT_FOUND,
  links,
  reference: '288h937njchyc89e84hfuf84ey48',
};

PageNotFound.storyName = '404';
PageNotFound.argTypes = {
  buttonProps: {
    table: {
      disable: true,
    },
  },
  onReload: {
    table: {
      disable: true,
    },
  },
};

export const Locked = Template.bind({});
Locked.args = {
  header: 'You can not access a locked cart',
  description:
    'The cart you are trying to access is locked. This can be because it is currently in checkout or due to bulk importing of items into the cart.',
  errorCode: ERROR_CODES.LOCKED,
  links,
  reference: '288h937njchyc89e84hfuf84ey48',
};

Locked.storyName = '423';
Locked.argTypes = {
  buttonProps: {
    table: {
      disable: true,
    },
  },
  onReload: {
    table: {
      disable: true,
    },
  },
};

export const InternalServerError = Template.bind({});
InternalServerError.args = {
  header: 'Oops! Something went wrong.',
  description: 'There was an error processing your request.',
  errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
  reference: '288h937njchyc89e84hfuf84ey48',
  onReload: action('reload'),
  links,
};

InternalServerError.storyName = '500';

export const BadGateway = Template.bind({});
BadGateway.args = {
  header: 'Oops! Something went wrong.',
  description: 'The server encountered a temporary error and could not complete your request.',
  errorCode: ERROR_CODES.BAD_GATEWAY,
  reference: '288h937njchyc89e84hfuf84ey48',
  onReload: action('reload'),
};

BadGateway.storyName = '502';
BadGateway.argTypes = {
  links: {
    table: {
      disable: true,
    },
  },
};

export const ServiceUnavailable = Template.bind({});
ServiceUnavailable.args = {
  header: 'Service unavailable',
  description: 'Sorry, the page is temporarily unavailable. Please try again later.',
  errorCode: ERROR_CODES.SERVICE_UNAVAILABLE,
  reference: '288h937njchyc89e84hfuf84ey48',
  onReload: action('reload'),
};

ServiceUnavailable.storyName = '503';
ServiceUnavailable.argTypes = {
  links: {
    table: {
      disable: true,
    },
  },
};

export const GatewayTimeout = Template.bind({});
GatewayTimeout.args = {
  header: 'Oops! Something went wrong.',
  description: 'The server encountered a temporary error and could not complete your request.',
  errorCode: ERROR_CODES.GATEWAY_TIMEOUT,
  reference: '288h937njchyc89e84hfuf84ey48',
  onReload: action('reload'),
};

GatewayTimeout.storyName = '504';
GatewayTimeout.argTypes = {
  links: {
    table: {
      disable: true,
    },
  },
};

export const Maintenance = Template.bind({});
Maintenance.args = {
  errorCode: ERROR_CODES.MAINTENANCE,
  header: 'Some maintenance is going on. Please try again later.',
  description: (
    <>
      <Typography component="span">Dear customer,</Typography>
      <Typography style={{ marginTop: 16, marginBottom: 16 }}>
        We would like to inform you that our system is currently unavailable as we are conducting maintenance works.
        Thank you for understanding.
      </Typography>
      <Typography component="span">Your Sales Team</Typography>
    </>
  ),
};

Maintenance.storyName = 'maintenance';
Maintenance.argTypes = {
  description: {
    control: {
      disable: true,
    },
  },
  reference: {
    table: {
      disable: true,
    },
  },
  errorCodeClassName: {
    table: {
      disable: true,
    },
  },
  buttonProps: {
    table: {
      disable: true,
    },
  },
  links: {
    table: {
      disable: true,
    },
  },
  onReload: {
    table: {
      disable: true,
    },
  },
};

export default createMeta({
  component: ErrorPage,
  title: 'Patterns/ErrorPages/ErrorPage',
  argTypes: {
    onReload: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
    },
    links: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'Array of links',
        },
      },
    },
    errorCode: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'Error code',
        },
      },
    },
    errorCodeClassName: {
      control: {
        disable: true,
      },
    },
    buttonProps: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'Analitics attributes for "Reload the page" button',
        },
      },
    },
  },
});
