import logError from './logError';

describe('logError', () => {
  it('Should log error', () => {
    // with mockImplementation no message will be printed to the console
    const mockLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});
    const mockExitHanlder = jest.fn<never, unknown[]>();
    global.process.exit = mockExitHanlder;

    logError('error message');
    expect(mockLogSpy).toBeCalledTimes(1);
    expect(mockLogSpy).toHaveBeenCalledWith('❌  error message\n--------------------');
    expect(mockExitHanlder).toBeCalledTimes(1);

    mockLogSpy.mockRestore();
  });
});
