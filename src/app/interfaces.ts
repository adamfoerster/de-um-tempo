export interface Meeting {
  id: number;
  message: string;
  photo: string;
  songId: string;
  verseId: string;
}

export interface Book {
  type: string;
  version: string;
  book_name: string;
  book_nr: number;
  direction: 'LTR'|'RTL';
  book: Chapter[];
}

export interface Chapter {
  chapter_nr: number;
  chapter: Verse[];
}

export interface Verse {
  verse_nr: number;
  verse: string;
}
