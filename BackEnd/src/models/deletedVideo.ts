import mongoose, { Document, Schema } from 'mongoose';



const DeletedVideoSchema = new Schema({
  Video_Link: {type: String, required: true},
  Title: {type: String, required: true},
  Published_At: {type: String, required: true},
  Thumbnail_URL: {type: String, required: true},
  Description: {type: String, required: true},
  Position: {type: Number, required: false},
  Tags: {type: [], required: true},
})

const DeletedVideo = mongoose.model('DeletedVideo', DeletedVideoSchema);

export { DeletedVideo };