import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEng from './common.json';
import validationEng from './validation.json';
import screenEng from './screen.json';
import userEng from './user.json';

i18n
  // .use(RNLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // debug: process.env.NODE_ENV === 'development',
    resources: {
      en: {
        common: commonEng,
        validation: validationEng,
        screen: screenEng,
        user: userEng,
      },
    },
    compatibilityJSON: 'v3',
    // // language to use if translations in user language are not available.
    // // fallbackLng: defaultLanguage,

    // ns: ['screen'],
    // defaultNS: 'en',
    lng: 'en',
    fallbackLng: 'en',
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },

    react: {
      useSuspense: true,
      // defaultTransParent: Text,
      // transSupportBasicHtmlNodes: false,
    },
  });

export default i18n;