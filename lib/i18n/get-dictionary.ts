// The public site is English-only now; this file just re-exports the
// content type that every component's `dict` prop is typed against.
// (The Ukrainian dictionary still exists and is used directly by the
// admin panel, which keeps its own Ukrainian UI — see lib/i18n/dictionaries/uk.ts.)
export type { Dictionary } from './dictionary-type';
