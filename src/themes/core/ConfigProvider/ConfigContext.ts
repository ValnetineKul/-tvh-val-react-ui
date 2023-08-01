import { createContext, useContext } from 'react';
import getValidLocale from './helpers/getValidLocale';
import { defaultLocale } from './ConfigProvider.constants';

interface ConfigContextProps {
  locale: string;
  settedLocale?: string;
}

const ConfigContext = createContext<ConfigContextProps>({ locale: defaultLocale });

const useConfigContext = () => {
  const { locale, settedLocale } = useContext(ConfigContext);

  return { locale: getValidLocale(locale), settedLocale };
};

export { ConfigContext, ConfigContextProps, useConfigContext };
