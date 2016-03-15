import dotenv from 'dotenv';
import {Word} from './word';
import Template from './template';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

export function upgrade(){
  let words = [];

  words.push(new Word({
    text: "cunt",
    partsOfSpeech: ["NOUN", "INTERJECTION"],
    nsfw: true
  }));

  words.push(new Word({
    text: "frothies",
    partsOfSpeech: ["NOUN"],
    nsfw: false
  }));

  words.pusn(new Word({
    text: "mate",
    partsOfSpeech: ["NOUN"],
    nsfw: false
  }));

  words.push(new Word ({
    text: "bloke",
    partsOfSpeech: ["NOUN"],
    nsfw: false
  }));

  words.push(new Word ({
    text: "ratshit",
    partsOfSpeech: ["ADJECTIVE"],
    nsfw: true
  }));
};

export function downgrade(){
  // Drop the word and the template collections
  mongoose.connection.db.dropCollection('Word', function(err, result){
    if (err) {
      console.log(err);
    }
    else {
      console.log('Successfully dropped the Word collection')
    }
  });

  mongoose.connection.db.dropCollection('Template', function(err, result){
    if (err) {
      console.log(err);
    }
    else {
      console.log('Successfully dropped the Template collection')
    }
  });
};
