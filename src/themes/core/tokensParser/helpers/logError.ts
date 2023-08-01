const logError = (message: string): never => {
  // eslint-disable-next-line no-console
  console.log(`❌  ${message}\n--------------------`);
  process.exit();
};

export default logError;
