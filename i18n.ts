import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

import en from './src/locales/en.json';
import zh from './src/locales/zh.json';
import ja from './src/locales/ja.json';

const locale = Localization.getLocales()[0]?.languageCode || 'en';
const supportLocales = ['en', 'zh', 'ja'];
const lng = supportLocales.includes(locale) ? locale : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      ja: { translation: ja },
    },
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
