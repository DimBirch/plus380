import type { Locale } from './config';
import type { Dictionary } from './dictionary-type';
import uk from './dictionaries/uk';
import en from './dictionaries/en';

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { uk, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.uk;
}
