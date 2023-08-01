import React from 'react';
import { render, initResponsiveTest, userEvent, screen } from '../../test-utils';
import { ERROR_CODES } from './constants';
import type { LinkType } from './ErrorPage';
import ErrorPage from './ErrorPage';

const props = {
  header: 'header text',
  description: 'description',
  errorCode: ERROR_CODES.NOT_AUTHORIZED,
  onReload: jest.fn(),
  links: [
    {
      name: 'Previous page',
      cb: jest.fn(),
    },
    {
      name: 'Home page',
      url: '/',
    },
    {
      name: 'Contact us',
      url: '/',
    },
  ] as LinkType[],
};

describe('ErrorPage', () => {
  it('Should render correctly', () => {
    const { container } = render(<ErrorPage {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('On reload page button', () => {
    it.each([
      [ERROR_CODES.INTERNAL_SERVER_ERROR],
      [ERROR_CODES.BAD_GATEWAY],
      [ERROR_CODES.SERVICE_UNAVAILABLE],
      [ERROR_CODES.GATEWAY_TIMEOUT],
      [undefined],
    ])('Should render onReload button for specific error codes', (errorCode) => {
      const { getByRole } = render(<ErrorPage {...props} errorCode={errorCode} />);
      const onReloadButton = getByRole('button', { name: 'Reload the page' });
      expect(onReloadButton).toBeInTheDocument();
    });

    it('Should call onReload on click', () => {
      const onReload = jest.fn();
      render(<ErrorPage {...props} onReload={onReload} errorCode={ERROR_CODES.SERVICE_UNAVAILABLE} />);
      const onReloadButton = screen.getByRole('button', { name: 'Reload the page' });
      userEvent.click(onReloadButton);
      expect(onReload).toHaveBeenCalledTimes(1);
    });

    it.each([
      [ERROR_CODES.BAD_REQUEST],
      [ERROR_CODES.NOT_AUTHORIZED],
      [ERROR_CODES.PADE_NOT_FOUND],
      [ERROR_CODES.LOCKED],
      [ERROR_CODES.MAINTENANCE],
    ])('Should not render onReload button for specific error codes', (errorCode) => {
      const { queryByRole } = render(<ErrorPage {...props} errorCode={errorCode} />);
      const onReloadButton = queryByRole('button', { name: 'Reload the page' });
      expect(onReloadButton).not.toBeInTheDocument();
    });
  });

  describe('Links block', () => {
    it.each([
      [ERROR_CODES.BAD_REQUEST],
      [ERROR_CODES.NOT_AUTHORIZED],
      [ERROR_CODES.PADE_NOT_FOUND],
      [ERROR_CODES.LOCKED],
      [ERROR_CODES.INTERNAL_SERVER_ERROR],
    ])('Should render links block', (errorCode) => {
      const { getByRole, getByText } = render(<ErrorPage {...props} errorCode={errorCode} />);
      const homePage = getByRole('link', { name: 'Home page' });
      const contactUs = getByRole('link', { name: 'Contact us' });
      const linksHeader = getByText('Here are some options for you:');

      expect(homePage).toHaveAttribute('href', '/');
      expect(contactUs).toHaveAttribute('href', '/');
      expect(linksHeader).toBeInTheDocument();
    });

    it.each([
      [ERROR_CODES.BAD_REQUEST],
      [ERROR_CODES.NOT_AUTHORIZED],
      [ERROR_CODES.PADE_NOT_FOUND],
      [ERROR_CODES.LOCKED],
      [ERROR_CODES.INTERNAL_SERVER_ERROR],
    ])('Should have button with callback', (errorCode) => {
      const mockedCallback = jest.fn();
      render(<ErrorPage {...props} links={[{ name: 'Previous page', cb: mockedCallback }]} errorCode={errorCode} />);
      const prevPage = screen.getByRole('button', { name: 'Previous page' });
      expect(prevPage).toBeInTheDocument();
      expect(mockedCallback).toHaveBeenCalledTimes(0);
      userEvent.click(prevPage);
      expect(mockedCallback).toHaveBeenCalledTimes(1);
    });

    it('Should not render links block for error code which is not in the allowed list', () => {
      const { queryByRole } = render(<ErrorPage {...props} errorCode={ERROR_CODES.SERVICE_UNAVAILABLE} />);
      const prevPage = queryByRole('button', { name: 'Previous page' });
      const homePage = queryByRole('link', { name: 'Home page' });
      const contactUs = queryByRole('link', { name: 'Contact us' });

      expect(prevPage).not.toBeInTheDocument();
      expect(homePage).not.toBeInTheDocument();
      expect(contactUs).not.toBeInTheDocument();
    });

    it('Should not render links header if links are not provided', () => {
      const { queryByText } = render(<ErrorPage {...props} errorCode={ERROR_CODES.NOT_AUTHORIZED} links={[]} />);
      expect(queryByText('Here are some options for you:')).not.toBeInTheDocument();
    });
  });

  describe('Error code message', () => {
    it.each([
      [ERROR_CODES.BAD_REQUEST],
      [ERROR_CODES.NOT_AUTHORIZED],
      [ERROR_CODES.PADE_NOT_FOUND],
      [ERROR_CODES.LOCKED],
      [ERROR_CODES.INTERNAL_SERVER_ERROR],
      [ERROR_CODES.BAD_GATEWAY],
      [ERROR_CODES.SERVICE_UNAVAILABLE],
      [ERROR_CODES.GATEWAY_TIMEOUT],
    ])('Should render error code message', (errorCode) => {
      const { getByText } = render(<ErrorPage {...props} errorCode={errorCode} />);
      const errorCodeMessage = getByText(`Error code: ${errorCode}`);
      expect(errorCodeMessage).toBeInTheDocument();
    });

    it('Should not render error code if unknown error', () => {
      const { queryByText } = render(<ErrorPage {...props} errorCode={undefined} />);
      const errorCodeMessage = queryByText('Error code');
      expect(errorCodeMessage).not.toBeInTheDocument();
    });

    it.each([
      [ERROR_CODES.BAD_REQUEST],
      [ERROR_CODES.NOT_AUTHORIZED],
      [ERROR_CODES.PADE_NOT_FOUND],
      [ERROR_CODES.LOCKED],
      [ERROR_CODES.INTERNAL_SERVER_ERROR],
      [ERROR_CODES.BAD_GATEWAY],
      [ERROR_CODES.SERVICE_UNAVAILABLE],
      [ERROR_CODES.GATEWAY_TIMEOUT],
      [undefined],
    ])('Should render reference message', (errorCode) => {
      const reference = '123a';
      const { getByText } = render(<ErrorPage {...props} errorCode={errorCode} reference={reference} />);
      const referenceMessage = getByText(`Reference: ${reference}`);
      expect(referenceMessage).toBeInTheDocument();
    });
  });

  describe('Image', () => {
    it.each([
      [ERROR_CODES.BAD_REQUEST, 'lost.svg'],
      [ERROR_CODES.NOT_AUTHORIZED, 'noAccess.svg'],
      [ERROR_CODES.PADE_NOT_FOUND, 'lost.svg'],
      [ERROR_CODES.LOCKED, 'noAccess.svg'],
      [ERROR_CODES.INTERNAL_SERVER_ERROR, 'general.svg'],
      [ERROR_CODES.BAD_GATEWAY, 'generalAlt.svg'],
      [ERROR_CODES.SERVICE_UNAVAILABLE, 'general.svg'],
      [ERROR_CODES.GATEWAY_TIMEOUT, 'generalAlt.svg'],
      [ERROR_CODES.MAINTENANCE, 'maintenance.svg'],
      [undefined, 'general.svg'],
    ])('Should show correct image according to errorCode', (errorCode, src) => {
      initResponsiveTest('Desktop');
      const { getByAltText } = render(<ErrorPage {...props} errorCode={errorCode} />);
      const image = getByAltText('') as HTMLImageElement;
      expect(image.src).toContain(src);
    });
  });
});
