import 'server-only';

type Locale = 'id' | 'en';

const dictionaries = {
  id: () => import('../../dictionaries/id.json').then((module) => module.default),
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale] ? dictionaries[locale]() : dictionaries.id();
};