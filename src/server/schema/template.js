import mongoose from "mongoose";
import { PartOfSpeechEnum } from "./word"

const TemplateSchema = new mongoose.Schema({
  members: {
    type: [String]
  },
  nsfw: {
    type: Boolean
  }
});

const Template = mongoose.model('Template', TemplateSchema)

export default Template
