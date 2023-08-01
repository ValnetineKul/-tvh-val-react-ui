import { downloadIcons } from './downloadIcons';

const mockGetFilePath = jest.fn().mockReturnValue('filePath');
jest.mock('../namesFormatters/getFilePath.ts', () => ({
  __esModule: true,
  getFilePath: (fileName: string, targetDirectory: string) => mockGetFilePath(fileName, targetDirectory),
}));

const mockDownloadFile = jest.fn();
jest.mock('./downloadFile.ts', () => ({
  __esModule: true,
  downloadFile: (arg: { filePath: string; link: string; isColoredIcon: boolean }) => mockDownloadFile(arg),
}));

describe('downloadIcons', () => {
  it('Should call getFilePath for each icon', async () => {
    downloadIcons(
      { '1307:709': 'image-link1', '1307:701': 'image-link2', '1307:705': 'image-link3', '1307:702': 'image-link4' },
      new Map([
        ['1307:701', { fileName: 'iconName2', isColored: true }],
        ['1307:702', { fileName: 'iconName4', isColored: true }],
        ['1307:705', { fileName: 'iconName3', isColored: false }],
        ['1307:709', { fileName: 'iconName1', isColored: false }],
      ]),
      'path/svg'
    );

    expect(mockGetFilePath).toBeCalledTimes(4);
    expect(mockGetFilePath).toHaveBeenCalledWith('iconName1', 'path/svg');
    expect(mockGetFilePath).toHaveBeenCalledWith('iconName2', 'path/svg');
    expect(mockGetFilePath).toHaveBeenCalledWith('iconName3', 'path/svg');
    expect(mockGetFilePath).toHaveBeenCalledWith('iconName4', 'path/svg');

    expect(mockDownloadFile).toBeCalledTimes(4);
    expect(mockDownloadFile).toHaveBeenCalledWith({ filePath: 'filePath', isColoredIcon: false, link: 'image-link1' });
    expect(mockDownloadFile).toHaveBeenCalledWith({ filePath: 'filePath', isColoredIcon: true, link: 'image-link2' });
    expect(mockDownloadFile).toHaveBeenCalledWith({ filePath: 'filePath', isColoredIcon: false, link: 'image-link3' });
    expect(mockDownloadFile).toHaveBeenCalledWith({ filePath: 'filePath', isColoredIcon: true, link: 'image-link4' });
  });
});
