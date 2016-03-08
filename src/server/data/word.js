import mongoose from "mongoose";

const PartOfSpeechEnum = [
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
]

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

const Word = mongoose.Model('Word', WordSchema);

export PartOfSpeechEnum;
export default Word;
