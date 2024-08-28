import { useState } from "react";
import './Form.css';

interface Video {
  Video_Link: string;
  Title: string;
  Published_At: string;
  Thumbnail_URL: string;
  Description: string;
  Tags: boolean[];
  Position: number;
  _id: string;
}

interface FormProps {
  video?: Video;
  type: string;
  callback: (value: string) => void;
  setResponseData: React.Dispatch<React.SetStateAction<Video[] | null>>;
}
const Form = ( {video, type, callback, setResponseData}: FormProps) => {
  // Better practice would be to do this, but I don't want to refactor the code and break something
  // const [form, setForm] = useState({
  //   Video_Link: video?.Video_Link,
  //   Title : video?.Title,
  //   Published_At: video?.Published_At,
  //   Thumbnail_URL: video?.Thumbnail_URL,
  //   Description: video?.Description,
  // })
  const [videoLink, setVideoLink] = useState(video?.Video_Link || '');
  const [title, setTitle] = useState(video?.Title || '');
  const [publishedAt, setPublishedAt] = useState(video?.Published_At || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.Thumbnail_URL || '');
  const [description, setDescription] = useState(video?.Description || '');
  const [tags, setTags] = useState( video?.Tags || new Array(16).fill(false) ); // Finds the index of first true

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const hasConfirmed = confirm(
      "Are you sure you want to delete this video?"
    );
    if (!hasConfirmed) return
    const payload = JSON.stringify({vidId: video?._id})
    console.log(payload)
    try {
      const API_URL = import.meta.env.VITE_API_URL
      console.log(`${API_URL}/api/delete`);
      const response = await fetch(`${API_URL}/api/delete`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },  
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setResponseData(data.videoList);
      callback('');
    } catch (error) {
      alert("Submission Failed")
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = {
      videoLink,
      thumbnailUrl,
      title,
      publishedAt,
      description,
      tags,
      ...(video?._id && { vidId: video._id })
    };
    console.log(JSON.stringify(formData))
    

    try {
      const API_URL = import.meta.env.VITE_API_URL
      const method = type === "Add" ? "POST" : "PUT";
      console.log(`${API_URL}/api/${type}`);
      const response = await fetch(`${API_URL}/api/${type.toLowerCase()}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setResponseData(data.videoList);
      callback('');
    } catch (error) {
      alert("Submission Failed")
      console.error('Error:', error);
    }
  };



  const TAGS = [
    "Suns",
    "Pels",
    "Mavs",
    "Jazz",
    "Warr",
    "Nuggs",
    "Grizs",
    "Timbs",
    "Heat",
    "Hawks",
    "76ers",
    "Rapts",
    "Bucks",
    "Bulls",
    "Celts",
    "Nets",
  ];
  const COLORS = [
    "bg-orange-500",
    "bg-teal-800",
    "bg-blue-600",
    "bg-gray-800",
    "bg-blue-500",
    "bg-yellow-700",
    "bg-teal-600",
    "bg-teal-600",
    "bg-red-600",
    "bg-red-400",
    "bg-blue-400",
    "bg-red-800",
    "bg-green-700",
    "bg-red-500",
    "bg-green-300",
    "bg-gray-800",
  ];



  const handleTagClick = (index: number) => {
    setTags(prev => prev.map((item, i) => (i !== index ? item : !item)));
  };


  return (
    <div className="overlay">
      <div className="my_container">
        <form onSubmit={handleSubmit}>
          <label className="text-2xl my-1">{type}</label>
          <input
            className="modal_content"
            type='text'
            value={videoLink}
            placeholder={videoLink || "Video Link"}
            required
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <input
            className="modal_content"
            type='text'
            value={thumbnailUrl}
            placeholder={thumbnailUrl || "Thumbnail_URL"}
            required
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
          <input
            className="modal_content"
            type='text'
            value={title}
            placeholder={title || "Title"}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="modal_content"
            type='text'
            value={publishedAt}
            placeholder={publishedAt || "Published_At"}
            required
            onChange={(e) => setPublishedAt(e.target.value)}
          />
          <textarea
            className="modal_content h-48"
            value={description}
            placeholder={description || "Description"}
            required
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="w-full flex flex-wrap justify-between gap-2 mt-3">
            {TAGS.map((item, index) => (
              <button
                type="button"
                key={index}
                className={`w-1/5 py-[1px] rounded-lg ${COLORS[index]} ${
                  (tags[index]) ? "font-bold" : "bg-opacity-15 font-semibold"
                }`}
                onClick={() => handleTagClick(index)}
              >
                {item}
              </button> //
            ))}
          </div>

          <div className="w-auto m-3 mb-0 flex justify-between">
            {video && <button type="button" className='clickable bg-red-400 py-1 px-2 rounded-2xl border-1 border-gray-700' onClick={handleDelete}>Delete</button>}
            <div className="flex gap-6">
              <input className='clickable bg-blue-400 py-1 px-2 rounded-2xl border-1 border-gray-700' type="submit" value="Submit" disabled={!videoLink || !thumbnailUrl || !title || !publishedAt || !description || !tags} />
              <button type="button" className='clickable py-1 px-2 rounded-2xl border-1 border-gray-700' onClick={() => callback('')}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form