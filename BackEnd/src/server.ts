// backend/server.js
import express, { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Video, VideoList, IVideo, IVideoList } from './models/schema';
import { DeletedVideo } from './models/deletedVideo';

// import data from '../2022_nba_playoffs_playlist.json';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbURI = process.env.DB_URI
mongoose.connect(dbURI as string)
  .then( (result) => {
    console.log('Connected to db')
    app.listen(port, () => {console.log(`Server is running on http://localhost:${port}`)});
  })
  .catch( (err) => console.log(err));


// Util for sorting video dates. 
function videoDateSort(a: IVideo, b: IVideo) {
  const date_a = new Date(a.Published_At);
  const date_b = new Date(b.Published_At);

  if (date_a > date_b) {
    return 1;
  } else if (date_a < date_b) {
    return -1;
  } else {
    return a.Position - b.Position;
  }
} 



app.get('/', async (req: Request, res: Response) => {
  console.log("[GET] / ------")
  // const videoList: IVideo[] = await (Video.find().exec() as unknown as IVideo[]);
  // console.log(videoList)
  res.send('Hello from the backend!');
});


app.get('/api/data', async (req: Request, res: Response) => {
  console.time('API Access')
  console.log("[GET] /api/data ------")
  const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
  const videoList = videoListDoc?.videoList
  console.log("Length: ", videoList?.length)
  console.timeEnd('API Access')
  res.json(videoList);
});


app.delete('/api/delete', async (req: Request, res: Response) => {
  console.log("[DELETE] / ------");
  console.log(req.body)
  const { vidId } = req.body
  if (!vidId) {
    console.log("Incomplete Request")
    return res.status(400).send('All fields are required');
  }

  try {
    const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
    const videoList = videoListDoc?.videoList;
    if (!videoList) {
      return res.status(404).send('Video list not found');
    }
    const videoIndex = videoList.findIndex(video => video._id?.toString() === vidId);
    if (videoIndex === -1) {
      return res.status(404).send('Video not found');
    }
    const deletedVideo = videoList.splice(videoIndex, 1)[0];
    videoList.forEach((item, index) => item.Position = index);
    await videoListDoc.save();
    const deletedVideoModel = new DeletedVideo({
      Video_Link: deletedVideo.Video_Link,
      Title: deletedVideo.Title,
      Published_At: deletedVideo.Published_At,
      Thumbnail_URL: deletedVideo.Thumbnail_URL,
      Description: deletedVideo.Description,
      Position: deletedVideo.Position,
      Tags: deletedVideo.Tags,
    });
    await deletedVideoModel.save();
    res.status(200).json({ videoList });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  };
});


app.post('/api/add', async (req: Request, res: Response) => {
  console.log("[POST] / Add / ------")
  console.log(req.body)
  const { videoLink, title, publishedAt, thumbnailUrl, description, tags} = req.body;
  if (!videoLink || !title || !publishedAt || !thumbnailUrl || !description || !tags) {
    console.log("Incomplete Request")
    return res.status(400).send('All fields are required');
  }
  try {
    let videoListDoc: IVideoList | null = await VideoList.findOne().exec()
    const position = videoListDoc ? videoListDoc.videoList.length : 0;
    const vid = new Video({
      Video_Link: videoLink,
      Title: title,
      Published_At: publishedAt,
      Thumbnail_URL: thumbnailUrl,
      Description: description,
      Position: position,
      Tags: tags,
    })
    console.log(vid)

    let newList: IVideoList;
    if (!videoListDoc) {
      newList = new VideoList({ videoList: [vid] });
      await newList.save()
      console.log("No doc found, new created. Video saved: ", vid)
    } else {
      videoListDoc.videoList.push(vid)
      videoListDoc.videoList.sort((a,b) => videoDateSort(a, b));
      videoListDoc.videoList.forEach((item, index) => item.Position = index);
      await videoListDoc.save() 
      newList = videoListDoc
      console.log("Video saved to existing list: ", vid)
    }
    res.status(200).json({ videoList: newList.videoList });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred'); 
  };
});

app.put('/api/edit', async (req: Request, res: Response) => {
  console.log("[PUT] / Edit /  ------")
  console.log(req.body)
  const { videoLink, title, publishedAt, thumbnailUrl, description, vidId, tags } = req.body;
  if (!videoLink || !title || !publishedAt || !thumbnailUrl || !description || !vidId || !tags) {
    console.log("Incomplete Request")
    return res.status(400).send('All fields are required');
  }
  
  try {
    const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
    const videoList = videoListDoc?.videoList;
    if (!videoList) {
      return res.status(404).send('Video list not found');
    }
    const videoIndex = videoList.findIndex(video => video._id?.toString() === vidId);
    if (videoIndex === -1) {
      return res.status(404).send('Video not found');
    }

    videoList[videoIndex].Video_Link = videoLink;
    videoList[videoIndex].Title = title;
    videoList[videoIndex].Published_At = publishedAt;
    videoList[videoIndex].Thumbnail_URL = thumbnailUrl;
    videoList[videoIndex].Description = description;
    videoList[videoIndex].Tags = tags;

    videoList.sort((a,b) => videoDateSort(a, b));
    videoList.forEach((item, index) => item.Position = index);
    
    await videoListDoc.save();
    res.status(200).json({ videoList });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  };
});

app.put('/api/edit-tags', async (req: Request, res: Response) => { 
  console.log("[PUT] / Edit Tags / ------")
  console.log(req.body)
  const { vidId, Tags } = req.body;
  if (!vidId || !Tags) {
    console.log("Incomplete Request")
    return res.status(400).send('All fields are required');
  }

  try {
    const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
    const videoList = videoListDoc?.videoList;
    if (!videoList) {
      return res.status(404).send('Video list not found');
    }
    const videoIndex = videoList.findIndex(video => video._id?.toString() === vidId);
    if (videoIndex === -1) {
      return res.status(404).send('Video not found');
    }
    videoList[videoIndex].Tags = Tags;
    await videoListDoc.save();
    res.status(200).json({ message: 'Video tags updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred with updating tags');
  };
});




/*  
  Helper function to shorten date from long UTC
*/
// app.get('/api/shortenDate', async (req: Request, res: Response) => { 
//   try {
//     const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
//     const videoList = videoListDoc?.videoList;
//     if (!videoList) {
//       return res.status(404).send('Video list not found');
//     }

//     videoList.forEach((item) => {
//       const pureDate = new Date(item.Published_At).toLocaleDateString('en-us');
//       item.Published_At = pureDate;
//       console.log(item)
//     })
//     await videoListDoc.save();
//     res.status(200).json({ message: 'Video updated successfully' });
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('An error occurred with updating dates');
//   }
// });


/*  
  Helper function to reassign tags to correct length
*/
// app.get('/api/addTags', async (req: Request, res: Response) => { 
//   console.log("[EDIT] / ------")
  
//   try {
//     const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
//     const videoList = videoListDoc?.videoList;
//     if (!videoList) {
//       return res.status(404).send('Video list not found');
//     }

//     videoList.forEach((item) => { item.Tags = new Array(16).fill(false); }); //16 teams
    
//     await videoListDoc.save();
//     res.status(200).json({ message: 'Video updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred');
//   };
// });

/* 
  Personal helper to add tags automatically
*/
// app.get('/api/autoTags', async (req: Request, res: Response) => { 
//   console.log("[EDIT] / ------")
//   const TAGS = [
//     "suns",
//     "pelicans",
//     "mavericks",
//     "jazz",
//     "warriors",
//     "nuggets",
//     "grizzlies",
//     "timberwolves",
//     "heat",
//     "hawks",
//     "76ers",
//     "raptors",
//     "bucks",
//     "bulls",
//     "celtics",
//     "nets",
//   ];
  
//   try {
//     const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
//     const videoList = videoListDoc?.videoList;
//     if (!videoList) {
//       return res.status(404).send('Video list not found');
//     }

//     videoList.forEach((item) => { 
//       const title = item.Title.toLowerCase();
//       item.Tags = TAGS.map((tag) => title.includes(tag));
//       if (item.Tags.filter(Boolean).length != 2) console.log(item);
//     }); // This code will create tags based on whether the team is in the title 
    
//     await videoListDoc.save();
//     res.status(200).json({ message: 'Video updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred');
//   };
// });




/*
  This api route is used intially to push JSON data to mongoDB
*/
// interface jsonData {
//   metadata: {
//     title: string,
//     code: string, // more too but I don't plan on using it here
//   },
//   items: {
//     id: string,
//     snippet: {
//       publishedAt: string,
//       title: string,
//       description: string,
//       thumbnails: { 
//         default: {url: string}, // 16:9 
//         medium: {url: string}, 
//         high: {url: string}, 
//         standard: {url: string}, 
//         maxres: {url: string}, // 16:9
//     },
//     position: number,
//     resourceId: { videoId: string },
//   },
//   }[],
// }
// app.get('/api/pushing2mongoList', async (req: Request, res: Response) => {
//   const videoList: IVideo[] = (data as jsonData).items.map((item, index) => {
//     const vid = new Video({
//       Video_Link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}&list=${data.metadata.code}`,
//       Title: item.snippet.title,
//       Published_At: item.snippet.publishedAt,
//       Thumbnail_URL: item.snippet.thumbnails.high.url,
//       Description: item.snippet.description,
//       Position: index,
//     });
//     console.log(vid)
//     return vid;
//   });
//   videoList.sort((a,b) => videoDateSort(a, b)); // Helper function, judges dates and their relative order
//   videoList.forEach((item, index) => item.Position = index);
//   const videoListDocument = new VideoList({ videoList: videoList});
//   await videoListDocument.save()    
//     .then(() => console.log('Videos saved:'))
//     .catch(err => console.error('Error saving video:', err));

//   res.send("videos saved :3")
// });


