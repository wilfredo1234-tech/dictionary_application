export type Phonetic = {
  text?: string;
  audio?: string;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: { definition: string; example?: string }[];
  synonyms?: string[];
};

export type WordData = {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  meanings: Meaning[];
  sourceUrls: string[];
};
