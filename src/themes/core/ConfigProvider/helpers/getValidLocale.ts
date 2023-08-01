import { defaultLocale } from '../ConfigProvider.constants';

const getValidLocale = (locale: string) => (!locale || locale.toLowerCase() === 'en-mx' ? defaultLocale : locale);

export default getValidLocale;
