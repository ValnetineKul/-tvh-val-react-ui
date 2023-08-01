import React from 'react';
import { render, userEvent, screen } from '../../../../test-utils';
import PasteToUploadItem from './PasteToUploadItem';

describe('PasteToUploadItem', () => {
  it('Should set success state', () => {
    render(<PasteToUploadItem src="test" fileName="File" index={0} fileStatus="success" onClick={jest.fn()} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('Should set warning state', () => {
    render(<PasteToUploadItem src="test" fileName="File" index={0} fileStatus="warning" onClick={jest.fn()} />);
    const warningIcon = screen.getByText('image.svg', { selector: 'svg' });
    expect(warningIcon).toBeInTheDocument();
    expect(screen.getByText('File')).toBeInTheDocument();
  });

  it('Should set loading state', () => {
    render(<PasteToUploadItem src="test" fileName="File" index={0} fileStatus="loading" onClick={jest.fn()} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
  });

  it('Should set selected state', () => {
    render(<PasteToUploadItem src="test" fileName="File" index={0} selected onClick={jest.fn()} />);
    const imageButton = screen.getByRole('button', { name: /file preview 0/i });
    expect(imageButton.parentElement.className).toMatch('PasteToUploadItem-selected');
  });

  it('Should show custom loading label', () => {
    render(
      <PasteToUploadItem
        src="test"
        fileName="File"
        index={0}
        fileStatus="loading"
        loadingLabel="test loading label"
        onClick={jest.fn()}
      />
    );
    expect(screen.getByText('test loading label')).toBeInTheDocument();
  });

  it('Should render image as a button with delete image button', () => {
    render(<PasteToUploadItem src="test" fileName="File" index={0} onClick={jest.fn()} onDeleteClick={jest.fn()} />);

    const imageButton = screen.getByRole('button', { name: /file preview 0/i });
    expect(imageButton).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /delete/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('Should trigger onClick', () => {
    const onImageButtonClick = jest.fn();
    render(
      <PasteToUploadItem src="test" fileName="File" index={0} onClick={onImageButtonClick} onDeleteClick={jest.fn()} />
    );

    const imageButton = screen.getByRole('button', { name: /file preview 0/i });
    userEvent.click(imageButton);
    expect(onImageButtonClick).toHaveBeenCalled();
  });

  it('Should trigger onDeleteClick', () => {
    const onDeleteClick = jest.fn();
    render(
      <PasteToUploadItem src="test" fileName="File" index={0} onClick={jest.fn()} onDeleteClick={onDeleteClick} />
    );

    const closeButton = screen.getByRole('button', { name: /delete/i });
    userEvent.click(closeButton);
    expect(onDeleteClick).toHaveBeenCalled();
  });

  it('Should show an image (not a button with image) and hide delete image button in case of readOnly', () => {
    render(
      <PasteToUploadItem src="test" fileName="File" index={0} readOnly onClick={jest.fn()} onDeleteClick={jest.fn()} />
    );

    const image = screen.getByAltText('file preview 0');
    expect(image).toBeInTheDocument();

    const imageButton = screen.queryByRole('button', { name: /file preview 0/i });
    expect(imageButton).not.toBeInTheDocument();

    const closeButton = screen.queryByRole('button', { name: /delete/i });
    expect(closeButton).not.toBeInTheDocument();
  });
});
