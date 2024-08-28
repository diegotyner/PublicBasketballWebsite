import { useState } from "react";
import './Form.css';

interface Video {
  Video_Link: string;
  Title: string;
  Published_At: string;
  Thumbnail_URL: string;
  Description: string;
  _id?: any;
  Tags: boolean[];
}

interface FormProps {
  video?: Video;
  type: string;
  callback: (value: string) => void;
}
const Form = ( {video, type, callback}: FormProps) => {
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
  const [tag, setTag] = useState(() => {
    return video?.Tags.findIndex((element) => element === true) || -1;
  }); // Finds the index of first true

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
      window.location.reload();
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
      tag,
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
      window.location.reload();
    } catch (error) {
      alert("Submission Failed")
      console.error('Error:', error);
    }
  };



  const TAGS = ["Senior", "Senior Summer", "Junior", "Junior Summer", "Sophomore"];
  const COLORS = [
    "bg-yellow-500",
    "bg-orange-600",
    "bg-rose-600",
    "bg-purple-600",
    "bg-blue-500",
  ];

  const handleTagClick = (index: number) => {
    console.log(tag)
    setTag(index);
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

          <div className="w-full flex justify-between gap-2 mt-3">
            {TAGS.map((item, index) => (
              <button
                type="button"
                key={index}
                className={`w-1/5 py-[1px] rounded-lg font-semibold ${COLORS[index]} ${
                  (tag === index) ? "" : "bg-opacity-25"
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
              <input className='clickable bg-blue-400 py-1 px-2 rounded-2xl border-1 border-gray-700' type="submit" value="Submit" disabled={!videoLink || !thumbnailUrl || !title || !publishedAt || !description || (tag < 0 || tag > 4)} />
              <button type="button" className='clickable py-1 px-2 rounded-2xl border-1 border-gray-700' onClick={() => callback('')}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form