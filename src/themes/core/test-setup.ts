jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process.exit');
});
