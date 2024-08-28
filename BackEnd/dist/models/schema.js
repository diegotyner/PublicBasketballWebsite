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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoList = exports.Video = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const videoSchema = new mongoose_1.Schema({
    Video_Link: { type: String, required: true },
    Title: { type: String, required: true },
    Published_At: { type: String, required: true },
    Thumbnail_URL: { type: String, required: true },
    Description: { type: String, required: true },
    Position: { type: Number, required: false },
    Tags: { type: [], required: true },
});
const videoListSchema = new mongoose_1.Schema({
    videoList: { type: [videoSchema], required: true }
});
const Video = mongoose_1.default.model('Video', videoSchema);
exports.Video = Video;
const VideoList = mongoose_1.default.model('VideoList', videoListSchema);
exports.VideoList = VideoList;
