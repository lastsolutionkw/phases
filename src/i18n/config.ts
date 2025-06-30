import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from '../locales/en/common.json';
import ar from '../locales/ar/common.json';

const resources = {
  en: {
    common: en,
  },
  ar: {
    common: ar,
  },
};

// Only initialize on client side
if (typeof window !== 'undefined') {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // default language
      fallbackLng: 'en',
      defaultNS: 'common',
      
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;