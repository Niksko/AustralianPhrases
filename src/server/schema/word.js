import mongoose from "mongoose";

export const PartOfSpeechEnum = [
  "NOUN",
  "PRONOUN",
  "VERB",
  "ADJECTIVE",
  "ADVERB",
  "ARTICLE",
  "PREPOSITION",
  "CONJUNCTION",
  "INTERJECTION",
  "PHRASE"
];

const WordSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  partsOfSpeech: {
    type: [String],
    enum: PartOfSpeechEnum,
  },
  nsfw: {
    type: Boolean
  }
});

export const Word = mongoose.model('Word', WordSchema);
