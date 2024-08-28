"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/server.js
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const schema_1 = require("./models/schema");
const deletedVideo_1 = require("./models/deletedVideo");
// import data from '../YT_Basketball.json';
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const dbURI = process.env.DB_URI;
mongoose_1.default.connect(dbURI)
    .then((result) => {
    console.log('Connected to db');
    app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`); });
})
    .catch((err) => console.log(err));
// Util for sorting video dates. 
function videoDateSort(a, b) {
    const date_a = new Date(a.Published_At);
    const date_b = new Date(b.Published_At);
    if (date_a > date_b) {
        return 1;
    }
    else if (date_a < date_b) {
        return -1;
    }
    else {
        return a.Position - b.Position;
    }
}
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[GET] / ------");
    // const videoList: IVideo[] = await (Video.find().exec() as unknown as IVideo[]);
    // console.log(videoList)
    res.send('Hello from the backend!');
}));
app.get('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.time('API Access');
    console.log("[GET] /api/data ------");
    const videoListDoc = yield schema_1.VideoList.findOne().exec();
    const videoList = videoListDoc === null || videoListDoc === void 0 ? void 0 : videoListDoc.videoList;
    console.log("Length: ", videoList === null || videoList === void 0 ? void 0 : videoList.length);
    console.timeEnd('API Access');
    res.json(videoList);
}));
app.delete('/api/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[DELETE] / ------");
    const dbURI_DELETED = process.env.DB_URI_DELETED;
    const dbDELETED = mongoose_1.default.createConnection(dbURI_DELETED);
    dbDELETED.on('error', console.error.bind(console, 'connection error:'));
    console.log(req.body);
    const { vidId } = req.body;
    if (!vidId) {
        console.log("Incomplete Request");
        return res.status(400).send('All fields are required');
    }
    try {
        const videoListDoc = yield schema_1.VideoList.findOne().exec();
        const videoList = videoListDoc === null || videoListDoc === void 0 ? void 0 : videoListDoc.videoList;
        if (!videoList) {
            return res.status(404).send('Video list not found');
        }
        const videoIndex = videoList.findIndex(video => { var _a; return ((_a = video._id) === null || _a === void 0 ? void 0 : _a.toString()) === vidId; });
        if (videoIndex === -1) {
            return res.status(404).send('Video not found');
        }
        const deletedVideo = videoList.splice(videoIndex, 1)[0];
        videoList.forEach((item, index) => item.Position = index);
        yield videoListDoc.save();
        const deletedVideoModel = new deletedVideo_1.DeletedVideo({
            Video_Link: deletedVideo.Video_Link,
            Title: deletedVideo.Title,
            Published_At: deletedVideo.Published_At,
            Thumbnail_URL: deletedVideo.Thumbnail_URL,
            Description: deletedVideo.Description,
            Position: deletedVideo.Position,
            Tags: deletedVideo.Tags,
        });
        yield deletedVideoModel.save();
        res.status(200).json({ message: 'Video deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
    ;
}));
app.post('/api/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[POST] / ------");
    console.log(req.body);
    const { videoLink, title, publishedAt, thumbnailUrl, description, tag } = req.body;
    if (!videoLink || !title || !publishedAt || !thumbnailUrl || !description) {
        console.log("Incomplete Request");
        return res.status(400).send('All fields are required');
    }
    try {
        let videoListDoc = yield schema_1.VideoList.findOne().exec();
        const position = videoListDoc ? videoListDoc.videoList.length : 0;
        const tagArray = Array.from({ length: 5 }, (_, i) => i === tag);
        const vid = new schema_1.Video({
            Video_Link: videoLink,
            Title: title,
            Published_At: publishedAt,
            Thumbnail_URL: thumbnailUrl,
            Description: description,
            Position: position,
            Tags: tagArray,
        });
        console.log(vid);
        let newList;
        if (!videoListDoc) {
            newList = new schema_1.VideoList({ videoList: [vid] });
            yield newList.save();
            console.log("No doc found, new created. Video saved: ", vid);
        }
        else {
            videoListDoc.videoList.push(vid);
            videoListDoc.videoList.sort((a, b) => videoDateSort(a, b));
            videoListDoc.videoList.forEach((item, index) => item.Position = index);
            yield videoListDoc.save();
            newList = videoListDoc;
            console.log("Video saved to existing list: ", vid);
        }
        res.send(newList);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
    ;
}));
app.put('/api/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[PUT] / ------");
    console.log(req.body);
    const { videoLink, title, publishedAt, thumbnailUrl, description, vidId, tag } = req.body;
    if (!videoLink || !title || !publishedAt || !thumbnailUrl || !description || !vidId) {
        console.log("Incomplete Request");
        return res.status(400).send('All fields are required');
    }
    try {
        const videoListDoc = yield schema_1.VideoList.findOne().exec();
        const videoList = videoListDoc === null || videoListDoc === void 0 ? void 0 : videoListDoc.videoList;
        if (!videoList) {
            return res.status(404).send('Video list not found');
        }
        const videoIndex = videoList.findIndex(video => { var _a; return ((_a = video._id) === null || _a === void 0 ? void 0 : _a.toString()) === vidId; });
        if (videoIndex === -1) {
            return res.status(404).send('Video not found');
        }
        const tagArray = Array.from({ length: 5 }, (_, i) => i === tag);
        videoList[videoIndex].Video_Link = videoLink;
        videoList[videoIndex].Title = title;
        videoList[videoIndex].Published_At = publishedAt;
        videoList[videoIndex].Thumbnail_URL = thumbnailUrl;
        videoList[videoIndex].Description = description;
        videoList[videoIndex].Tags = tagArray;
        videoList.sort((a, b) => videoDateSort(a, b));
        videoList.forEach((item, index) => item.Position = index);
        yield videoListDoc.save();
        res.status(200).json({ message: 'Video updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
    ;
}));
app.put('/api/edit-tags', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[PUT] / ------");
    console.log(req.body);
    const { vidId, Tags } = req.body;
    if (!vidId || !Tags) {
        console.log("Incomplete Request");
        return res.status(400).send('All fields are required');
    }
    try {
        const videoListDoc = yield schema_1.VideoList.findOne().exec();
        const videoList = videoListDoc === null || videoListDoc === void 0 ? void 0 : videoListDoc.videoList;
        if (!videoList) {
            return res.status(404).send('Video list not found');
        }
        const videoIndex = videoList.findIndex(video => { var _a; return ((_a = video._id) === null || _a === void 0 ? void 0 : _a.toString()) === vidId; });
        if (videoIndex === -1) {
            return res.status(404).send('Video not found');
        }
        videoList[videoIndex].Tags = Tags;
        yield videoListDoc.save();
        res.status(200).json({ message: 'Video tags updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred with updating tags');
    }
    ;
}));
// app.get('/api/addTags', async (req: Request, res: Response) => { 
//   console.log("[EDIT] / ------")
//   try {
//     const videoListDoc: IVideoList | null = await VideoList.findOne().exec();
//     const videoList = videoListDoc?.videoList;
//     if (!videoList) {
//       return res.status(404).send('Video list not found');
//     }
//     videoList.forEach((item) => { item.Tags = [false, false, false, false, false]; });
//     await videoListDoc.save();
//     res.status(200).json({ message: 'Video updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred');
//   };
// });
// app.get('/pushing2mongoList', async (req: Request, res: Response) => {
//   const videoList: IVideo[] = data.map((item, index) => {
//     const vid = new Video({
//       Video_Link: item.Video_Link,
//       Title: item.Title,
//       Published_At: item.Published_At,
//       Thumbnail_URL: item.Thumbnail_URL,
//       Description: item.Description,
//       Position: index
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
