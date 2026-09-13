import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import hinglish from './locales/hinglish.json';
import or from './locales/or.json';
import as from './locales/as.json';
import pa from './locales/pa.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import ur from './locales/ur.json';
import mr from './locales/mr.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';

const STORAGE_KEY = 'pixelplayers-language';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
  hinglish: { translation: hinglish },
  or: { translation: or },
  as: { translation: as },
  pa: { translation: pa },
  ta: { translation: ta },
  te: { translation: te },
  ur: { translation: ur },
  mr: { translation: mr },
  gu: { translation: gu },
  kn: { translation: kn },
  ml: { translation: ml },
};

function readSavedLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

const savedLanguage = readSavedLanguage();
const initialLanguage = savedLanguage && savedLanguage in resources ? savedLanguage : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* storage unavailable */
  }
});

export default i18n;