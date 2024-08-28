import mongoose, { Document, Schema } from 'mongoose';

/*
interface Video {
  Video_Link: string;
  Title: string;
  Published_At: string;
  Thumbnail_URL: string;
  Description: string;
} 
*/

export interface IVideo extends Document {
  Video_Link: string;
  Title: string;
  Published_At: string;
  Thumbnail_URL: string;
  Description: string;
  Position: number;
  Tags: boolean[];
}
export interface IVideoList extends Document {
  videoList: IVideo[];
  _id: Schema.Types.ObjectId;
}

const videoSchema = new Schema<IVideo>({
  Video_Link: {type: String, required: true},
  Title: {type: String, required: true},
  Published_At: {type: String, required: true},
  Thumbnail_URL: {type: String, required: true},
  Description: {type: String, required: true},
  Position: {type: Number, required: false},
  Tags: {type: [], required: true},
})
const videoListSchema = new Schema<IVideoList>({
  videoList: {type: [videoSchema], required: true}
})
const Video = mongoose.model<IVideo>('Video', videoSchema);
const VideoList = mongoose.model<IVideoList>('VideoList', videoListSchema);
export { Video, VideoList };