import React from 'react';
import { render, userEvent, screen, waitFor } from '../../test-utils';
import FileUpload, { getFileId } from './FileUpload';
import * as FileUploadItem from './FileUploadItem';

const createFileMock = (name: string, type?: string) => new File([name], name, { type: type || 'image/jpg' });

describe('FileUpload', () => {
  it('Should render correctly', () => {
    const { container } = render(<FileUpload value={null} onChange={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should render basic variant correctly', () => {
    const { container } = render(<FileUpload value={null} variant="basic" onChange={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should show label', () => {
    const { getAllByText } = render(<FileUpload label="Label" value={null} onChange={jest.fn()} />);
    expect(getAllByText('Label')).toHaveLength(1);
  });
  it('Should show label with *', () => {
    const { getAllByText } = render(<FileUpload label="Label" required value={null} onChange={jest.fn()} />);
    expect(getAllByText('*')).toHaveLength(1);
  });
  it('Should show error message', () => {
    const { getByText } = render(<FileUpload errorMessage="Error message" value={null} onChange={jest.fn()} />);
    expect(getByText('Error message')).toBeInTheDocument();
  });
  it('Should hide allowed extensions', () => {
    render(<FileUpload fileTypes={['jpg']} shouldDisplayAllowedTypes={false} value={null} onChange={jest.fn()} />);
    expect(screen.queryByText(/jpg/i)).not.toBeInTheDocument();
  });
  it('Should show additional restriction', () => {
    const { getAllByText } = render(
      <FileUpload label="Label" value={null} onChange={jest.fn()} additionalRestriction="additional" />
    );
    expect(getAllByText('additional')).toHaveLength(1);
  });
  it('Should render only file and hide input for single input', () => {
    const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });
    const { getByText, queryByLabelText } = render(<FileUpload value={file} onChange={jest.fn()} />);

    const input = queryByLabelText('file-upload-input');
    expect(input).not.toBeInTheDocument();
    expect(getByText('file1.txt')).toBeInTheDocument();
  });
  it('Should render only file for readOnly case', () => {
    const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });
    const { getByText, queryByLabelText } = render(<FileUpload value={file} onChange={jest.fn()} readOnly />);

    const input = queryByLabelText('file-upload-input');
    expect(input).not.toBeInTheDocument();
    expect(getByText('file1.txt')).toBeInTheDocument();
  });

  describe('Should trigger onChange', () => {
    it('Single', () => {
      const handleChange = jest.fn();
      const handleUpload = jest.fn();
      const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const { getByLabelText } = render(
        <FileUpload
          onChange={handleChange}
          value={null}
          onFilesUpload={handleUpload}
          getCustomFileName={(f) => `test${f.name}`}
        />
      );
      const input = getByLabelText('file-upload-input') as HTMLInputElement;

      userEvent.upload(input, file);

      expect(input.files).toHaveLength(1);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(file);

      expect(handleUpload).toHaveBeenCalledTimes(1);
      expect(handleUpload).toHaveBeenCalledWith(file);
    });
    it('Multiple', () => {
      const handleChange = jest.fn();
      const handleUpload = jest.fn();

      const newFile = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const currentFile = new File(['file2'], 'file2.txt', { type: 'text/plain' });
      const { getByLabelText } = render(
        <FileUpload multiple onChange={handleChange} value={[currentFile]} onFilesUpload={handleUpload} />
      );
      const input = getByLabelText('file-upload-input') as HTMLInputElement;

      userEvent.upload(input, newFile);

      expect(input.files).toHaveLength(1);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([newFile, currentFile]);

      expect(handleUpload).toHaveBeenCalledTimes(1);
      expect(handleUpload).toHaveBeenCalledWith([newFile]);
    });
  });
  describe('Should show files if has value', () => {
    it('Single', () => {
      const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const { getByText } = render(<FileUpload value={file} onChange={jest.fn()} />);
      expect(getByText('file1.txt')).toBeInTheDocument();
    });
    it('Multiple', () => {
      const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' });
      const { getByText } = render(<FileUpload value={[file1, file2]} multiple onChange={jest.fn()} />);
      expect(getByText('file1.txt')).toBeInTheDocument();
      expect(getByText('file2.txt')).toBeInTheDocument();
    });
  });
  it('Should not show files when disabled', () => {
    const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });
    const { getByLabelText, queryByText } = render(<FileUpload onChange={jest.fn()} value={null} disabled />);
    const input = getByLabelText('file-upload-input') as HTMLInputElement;
    userEvent.upload(input, file1);
    expect(queryByText('file1.txt')).not.toBeInTheDocument();
  });

  describe('Should remove file', () => {
    it('Single', () => {
      const handleChange = jest.fn();
      const handleDelete = jest.fn();
      const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const { getByRole } = render(<FileUpload value={file} onChange={handleChange} onFileDelete={handleDelete} />);

      const removeButton = getByRole('button');
      userEvent.click(removeButton);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(null);

      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleDelete).toHaveBeenCalledWith(file);
    });

    it('Multiple', () => {
      const handleChange = jest.fn();
      const handleDelete = jest.fn();
      const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const { getByText } = render(
        <FileUpload value={[file]} multiple onChange={handleChange} onFileDelete={handleDelete} />
      );

      const removeButton = getByText('times.svg');
      userEvent.click(removeButton);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([]);

      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleDelete).toHaveBeenCalledWith(file);
    });
  });

  describe('Should prevent uploading if did not pass validation', () => {
    it('Exceed max file size error. Single', async () => {
      const handleChange = jest.fn();
      const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });

      render(<FileUpload value={null} maxFileSize="0.004 KB" onChange={handleChange} />);

      const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

      userEvent.upload(input, file);

      expect(screen.queryByText('file1.txt')).not.toBeInTheDocument();
      await waitFor(() => expect(screen.getByText(/Attachment must be less than/)).toBeInTheDocument());
      expect(handleChange).not.toHaveBeenCalled();
    });
    it('Exceed max file size error. Multiple', async () => {
      const handleChange = jest.fn();
      const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' });

      render(<FileUpload value={[file1]} multiple maxFileSize="0.004 KB" onChange={handleChange} />);

      const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

      userEvent.upload(input, file2);

      expect(screen.queryByText('file2.txt')).not.toBeInTheDocument();
      await waitFor(() => expect(screen.getByText(/Attachment must be less than/)).toBeInTheDocument());
      expect(handleChange).not.toHaveBeenCalled();
    });

    describe('Incorrect extension error', () => {
      it('allowed types', async () => {
        const handleChange = jest.fn();
        const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });

        render(<FileUpload multiple value={[]} onChange={handleChange} fileTypes={['na']} />);

        const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

        userEvent.upload(input, file1);

        expect(screen.queryByText('file1.txt')).not.toBeInTheDocument();
        await waitFor(() => expect(screen.getByText(/This file format is not allowed/)).toBeInTheDocument());
        expect(handleChange).not.toHaveBeenCalled();
      });

      it('forbidden to upload folders (files without extension) for allowed types', async () => {
        const handleChange = jest.fn();
        const file1 = new File(['file1'], 'file1');

        render(<FileUpload value={null} onChange={handleChange} fileTypes={['txt']} />);

        const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

        userEvent.upload(input, file1);

        expect(screen.queryByText('file1')).not.toBeInTheDocument();
        await waitFor(() => expect(screen.getByText(/This file format is not allowed/)).toBeInTheDocument());
        expect(handleChange).not.toHaveBeenCalled();
      });

      it('forbidden types', async () => {
        const handleChange = jest.fn();
        const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });

        render(<FileUpload multiple value={[]} onChange={handleChange} forbiddenFileTypes={['txt']} />);

        const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

        userEvent.upload(input, file1);

        expect(screen.queryByText('file1.txt')).not.toBeInTheDocument();
        await waitFor(() => expect(screen.getByText(/This file format is not allowed/)).toBeInTheDocument());
        expect(handleChange).not.toHaveBeenCalled();
      });

      it('forbidden to upload folders (files without extension) for forbidden types', async () => {
        const handleChange = jest.fn();
        const file1 = new File(['file1'], 'file1');

        render(<FileUpload value={null} onChange={handleChange} forbiddenFileTypes={['txt']} />);

        const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

        userEvent.upload(input, file1);

        expect(screen.queryByText('file1')).not.toBeInTheDocument();
        await waitFor(() => expect(screen.getByText(/This file format is not allowed/)).toBeInTheDocument());
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    it('Duplication error. Multiple', async () => {
      const handleChange = jest.fn();
      const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' });
      const fileDuplication = new File(['file1'], 'file1.txt', { type: 'text/plain' });

      render(<FileUpload multiple value={[file1, file2]} onChange={handleChange} />);
      const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

      userEvent.upload(input, fileDuplication);

      await waitFor(() =>
        expect(screen.getByText(/File with same name has already been uploaded/)).toBeInTheDocument()
      );
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Max file size', () => {
    describe('Size limit message', () => {
      const message = 'Maximum file size: ';

      describe('Single file mode', () => {
        it('Should show size limit message if the restriction is set', () => {
          const maxFileSize = '2 MB';
          const messageWithSize = `${message}${maxFileSize}`;

          render(<FileUpload value={null} maxFileSize={maxFileSize} onChange={jest.fn()} />);

          expect(screen.getByText(messageWithSize)).toBeInTheDocument();
        });

        it('Should hide size limit message if the restriction is not set', () => {
          render(<FileUpload value={null} onChange={jest.fn()} />);

          expect(screen.queryByText(message)).not.toBeInTheDocument();
        });
      });

      describe('Multiple file mode', () => {
        const file = new File(['file1'], 'file1.txt', { type: 'text/plain' });
        const cases: Array<File[][]> = [[[]], [[file]]];

        it.each(cases)('Should show size limit message if the restriction is set for %p', (value) => {
          const maxFileSize = '2 MB';
          const messageWithSize = `${message}${maxFileSize}`;

          render(<FileUpload multiple value={value} maxFileSize={maxFileSize} onChange={jest.fn()} />);

          expect(screen.getByText(messageWithSize)).toBeInTheDocument();
        });

        it.each(cases)('Should hide size limit message if the restriction is not set for %p', (value) => {
          render(<FileUpload multiple value={value} onChange={jest.fn()} />);

          expect(screen.queryByText(message)).not.toBeInTheDocument();
        });
      });
    });

    it('Should render files without input', () => {
      const handleChange = jest.fn();
      const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' });
      const { queryByText, queryByLabelText } = render(
        <FileUpload value={[file1, file2]} multiple onChange={handleChange} readOnly />
      );
      const input = queryByLabelText('file-upload-input');

      expect(input).not.toBeInTheDocument();
      expect(queryByText('file2.txt')).toBeInTheDocument();
      expect(queryByText('file1.txt')).toBeInTheDocument();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('Should render files with statuses', async () => {
      const handleChange = jest.fn();
      const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' });
      const fileStatuses = { [getFileId(file1)]: 'success' as const };
      const fileItemSpy = jest.spyOn(FileUploadItem, 'default');
      render(<FileUpload value={[file1]} multiple onChange={handleChange} fileStatuses={fileStatuses} />);

      await waitFor(() =>
        expect(fileItemSpy).toHaveBeenCalledWith(expect.objectContaining({ fileStatus: 'success' }), {})
      );
    });
  });

  describe('Should correctly use getCustomFileName', () => {
    it.each([
      [createFileMock('name.txt'), 'new name', 'new name'],
      [createFileMock('name.txt'), 'name', 'name'],
      [createFileMock('name.txt'), 'name2', 'name2'],
    ])('Should rename optionally %#', async (file: File, newName, expectValue) => {
      const getCustomFileName = jest.fn().mockReturnValue(newName);
      const onChange = jest.fn();

      render(<FileUpload value={null} onChange={onChange} getCustomFileName={getCustomFileName} />);
      const input = screen.getByLabelText('file-upload-input') as HTMLInputElement;

      userEvent.upload(input, file);
      await waitFor(() => expect(onChange.mock.calls[0][0].name).toEqual(expectValue));
    });
  });
});
