import React from 'react';
import { ConfigContext } from './ConfigContext';

const ConfigProvider: React.FC<{ locale: string; settedLocale?: string }> = ({ locale, settedLocale, children }) => {
  return <ConfigContext.Provider value={{ locale, settedLocale }}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
