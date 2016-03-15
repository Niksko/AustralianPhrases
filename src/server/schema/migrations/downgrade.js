import dotenv from 'dotenv';
import {Word} from '../word';
import Template from '../template';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

function downgrade(){
  // Drop the word and the template collections
  mongoose.connection.db.dropCollection('Word', (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Successfully dropped the Word collection')
    }
  });

  mongoose.connection.db.dropCollection('Template', (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Successfully dropped the Template collection')
    }
  });
};

downgrade();
