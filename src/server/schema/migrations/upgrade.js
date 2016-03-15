import dotenv from 'dotenv';
import {Word} from './word';
import Template from './template';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

function upgrade(){
  let words = [];

  words.push(new Word({
    text: "cunt",
    partsOfSpeech: ["NOUN", "INTERJECTION"],
    nsfw: true
  }));

  words.push(new Word({
    text: "frothy",
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

  words.push(new Word ({
    text: "bloody",
    partsOfSpeech: ["ADJECTIVE"],
    nsfw: false
  }));

  let templates = [];

  templates.push(new Template({
    members: [
      "Top",
      "NOUN"
    ],
    nsfw: false
  }));

  templates.push(new Template({
    members: [
      "ADJECTIVE",
      "ADJECTIVE",
      "NOUN"
    ],
    nsfw: false
  }));

  templates.push(new Template({
    members: [
      "Get a",
      "NOUN",
      "up ya,",
      "NOUN"
    ],
    nsfw: false
  }))

  // Save these to the database
  words.forEach((word) => ({
    word.save((err, result) => ({
      if (err) {
        console.log(err);
      }
    }));
  }));

  templates.forEach((word) => ({
    template.save((err, result) => ({
      if (err) {
        console.log(err);
      }
    }));
  }));

}();
