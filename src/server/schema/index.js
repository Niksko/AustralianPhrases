import mongoose from "mongoose";
import {getSchema} from '@risingstack/graffiti-mongoose';
import {Word} from './word';
import Template from './template';

import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

export default getSchema([Word, Template]);
