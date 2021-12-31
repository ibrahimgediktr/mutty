import { useRouter } from 'next/router';
import langs from '../i18n';

export const useTranslation = () => {
  const { locales = [], defaultLocale, ...nextRouter } = useRouter();
  const locale = locales.includes(nextRouter.locale || '')
    ? nextRouter.locale
    : defaultLocale;

  return {
    t: (term) => {
      const translation = langs[locale][term];

      return translation ? translation : term;
    },
  };
};
