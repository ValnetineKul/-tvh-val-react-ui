export const buttonBaseStoryArgs = {
  href: {
    table: {
      type: { summary: 'If "href" is filled, the component will immediately transform to HTML link tag "a"' },
    },
  },

  to: {
    table: {
      disable: true,
    },
  },

  component: {
    control: {
      disable: true,
    },
    table: {
      type: { summary: 'React.ReactElement' },
    },
  },

  download: {
    control: {
      disabled: true,
    },
    table: {
      type: {
        summary:
          'If "href" and "download" are filled – downloads the file when clicking on link (instead of navigating to the file)',
      },
    },
  },
};
