import mongoose from "mongoose";
import {getSchema} from '@risingstack/graffiti-mongoose';
import {Word} from './word';
import Template from './template';

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI);

export default getSchema([Word, Template]);
