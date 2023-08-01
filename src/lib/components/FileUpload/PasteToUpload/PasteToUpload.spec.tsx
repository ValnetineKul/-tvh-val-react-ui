import React from 'react';
import { render, userEvent, screen } from '../../../test-utils';
import PasteToUpload from './PasteToUpload';
import createDefaultFileName from './helpers/createDefaultFileName';
import * as PasteToUploadItem from './PasteToUploadItem';

const file1 = new File([''], 'image.png', { type: 'image/png', lastModified: 1679402828007 });
Object.defineProperty(file1, 'size', { value: 61298 });
const fileName1 = createDefaultFileName(new Date(file1.lastModified), 'image.png');

const file2 = new File([''], 'image.png', { type: 'image/png', lastModified: 1679575238076 });
Object.defineProperty(file2, 'size', { value: 48116 });
const fileName2 = createDefaultFileName(new Date(file2.lastModified), 'image.png');

const pasteImage = (inputElement: HTMLElement, file: File = file1, type: string = 'image/png') => {
  const clipboardEvent: Event = new Event('paste', {
    bubbles: true,
    cancelable: true,
    composed: true,
  });

  clipboardEvent['clipboardData'] = {
    items: {
      '0': {
        kind: 'file',
        type,
        getAsFile: () => file,
      },
      length: 1,
    },
  };

  userEvent.paste(inputElement, '', clipboardEvent);
};

describe('PasteToUpload', () => {
  global.URL.createObjectURL = jest.fn();
  const handlePaste = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render input with its label', () => {
    render(<PasteToUpload updateFilesCb={handlePaste} />);
    const input = screen.getByLabelText('Paste from clipboard', { selector: 'input' });
    expect(input).toBeInTheDocument();
  });

  it('Should show error message', () => {
    render(<PasteToUpload errorMessage="Error message" updateFilesCb={handlePaste} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('Should fires updateFilesCb which returns clipboard image', () => {
    render(<PasteToUpload updateFilesCb={handlePaste} />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });
    pasteImage(inputElement);

    expect(handlePaste).toHaveBeenCalledTimes(1);
    expect(handlePaste).toHaveBeenCalledWith({ [fileName1]: file1 });
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  describe('Should prevent image pasting if did not pass validation', () => {
    it('Should show duplication error', () => {
      render(<PasteToUpload updateFilesCb={handlePaste} />);

      const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });

      pasteImage(inputElement);
      expect(screen.queryByText('The same image has recently been uploaded')).not.toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);

      pasteImage(inputElement);
      expect(screen.getByText('The same image has recently been uploaded')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);

      pasteImage(inputElement, file2);
      expect(screen.queryByText('The same image has recently been uploaded')).not.toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    it('Should show size error', () => {
      render(<PasteToUpload updateFilesCb={handlePaste} maxFileSize="50 KB" />);

      const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });
      pasteImage(inputElement);

      expect(screen.getByText('Attachment must be less than 50 KB')).toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);

      pasteImage(inputElement, file2);
      expect(screen.queryByText('Attachment must be less than 50 KB')).not.toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    it('Should show type error in case if paste not an image from clipboard', () => {
      render(<PasteToUpload updateFilesCb={handlePaste} />);

      const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });

      pasteImage(inputElement, file1, 'text/html');
      expect(screen.getByText('This is not allowed to paste data that is not an image')).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);

      pasteImage(inputElement);
      expect(screen.queryByText('This is not allowed to paste data that is not an image')).not.toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  it('Should not show files when disabled', () => {
    const { rerender } = render(<PasteToUpload updateFilesCb={handlePaste} />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });
    pasteImage(inputElement);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    rerender(<PasteToUpload updateFilesCb={handlePaste} disabled />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('Should remove image on delete button click', () => {
    render(<PasteToUpload updateFilesCb={handlePaste} />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });
    pasteImage(inputElement);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    const deleteButton = screen.getByLabelText('delete item', { selector: 'button' });
    userEvent.click(deleteButton);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('Should render only file for readOnly case', () => {
    render(<PasteToUpload updateFilesCb={handlePaste} readOnly />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });
    pasteImage(inputElement);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('Should render multiple images', () => {
    render(<PasteToUpload updateFilesCb={handlePaste} multiple />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });

    pasteImage(inputElement);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    pasteImage(inputElement, file2);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('Should replace previous image if paste another image and multiple=false', () => {
    render(<PasteToUpload updateFilesCb={handlePaste} />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });

    pasteImage(inputElement);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    pasteImage(inputElement, file2);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    const imageButton = screen.getByRole('img').parentElement;
    userEvent.click(imageButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: fileName2,
      })
    ).toBeInTheDocument();
  });

  it('Should get custom image name', () => {
    const getCustomFileName = jest.fn().mockReturnValue('test.png');
    render(<PasteToUpload updateFilesCb={handlePaste} getCustomFileName={getCustomFileName} />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });

    pasteImage(inputElement);
    const imageButton = screen.getByRole('img').parentElement;

    userEvent.click(imageButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'test.png',
      })
    ).toBeInTheDocument();
  });

  it('Should render files with statuses', () => {
    const fileStatuses = { [fileName1]: 'success' as const };
    const fileItemSpy = jest.spyOn(PasteToUploadItem, 'default');
    render(<PasteToUpload updateFilesCb={handlePaste} fileStatuses={fileStatuses} />);

    const inputElement = screen.getByLabelText('Paste from clipboard', { selector: 'input' });
    pasteImage(inputElement);

    expect(fileItemSpy).toHaveBeenCalledWith(expect.objectContaining({ fileStatus: 'success' }), {});
  });
});
