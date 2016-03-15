import dotenv from 'dotenv';
import {Word} from '../word';
import Template from '../template';
import mongoose from 'mongoose';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

function downgrade(){
  // Drop the word and the template collections
  mongoose.connection.db.dropCollection('Word')
   .then(() => {
      console.log('Successfully dropped the Word collection');
      mongoose.connection.db.dropCollection('Template');
   }).then(() => {
      console.log('Successfully dropped the Template collection');
      mongoose.disconnect();
   })
};

downgrade();
