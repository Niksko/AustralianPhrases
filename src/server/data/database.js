import mongoose from 'mongoose';
import Promise from 'promise';

Promise.promisifyAll(mongoose);

// Define a parts of speech schema
let partsOfSpeechSchema = mongoose.Schema({
  id: ObjectID,
  partOfSpeech: String
});

// Construct a model
export PartOfSpeech = mongoose.model('PartOfSpeech', PartsOfSpeechType);

// Export a function that lets us get a part of speech
export function getPartOfSpeech(id) {
  return PartOfSpeech.findById(id);
};

// Define a words schema
let wordsSchema = mongoose.Schema({
  id: ObjectID,
  text: String,
  nsfw: Boolean,
  partOfSpeech: [partsOfSpeechSchema]
});

export Word = mongoose.model('Word', wordsSchema);

// Export a function that lets us get a word based on id
export function getWord(id) {
  return Word.findById(id);
};

// Define a template schema
let templateSchema = mongoose.Schema({
  id: ObjectID,
  template: [ObjectID]
});

export Template = mongoose.model('Template', templateSchema);

// Export a function to find templates by id
export function getTemplate(id) {
  return Template.findById(id);
};
