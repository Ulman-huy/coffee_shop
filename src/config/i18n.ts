import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "../locales/en/translateEN.json";
import Vietnamese from "../locales/vi/translateVI.json";

const resources = {
  en: {
    translation: English,
  },
  vi: {
    translation: Vietnamese,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
