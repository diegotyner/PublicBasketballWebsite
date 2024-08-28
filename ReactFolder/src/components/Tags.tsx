// import { useState, useEffect, useRef } from "react";

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
interface VideoProps {
  video: Video;
  // setResponseData: React.Dispatch<React.SetStateAction<Video[] | null>>;
}


// const useDebouncedValue = (inputValue: boolean[], delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(inputValue);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(inputValue);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [inputValue, delay]);

//   return debouncedValue;
// };

const Tags = ({ video }: VideoProps) => {
// const Tags = ({ video, setResponseData }: VideoProps) => {
//   const [selected, setSelected] = useState<boolean[]>(video.Tags)
//   const debouncedSelected = useDebouncedValue(selected, 500);
//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     // Skip the first render
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }
//     const makeApiCall = async () => {
//       try {
//         const payload = JSON.stringify({vidId: video?._id, Tags: debouncedSelected});
//         console.log(payload)

//         const API_URL = import.meta.env.VITE_API_URL
//         const response = await fetch(`${API_URL}/api/edit-tags`, {
//           method: "PUT",
//           headers: {
//             'Content-Type': 'application/json'
//           },  
//           body: payload,
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
  
//         const data = await response.json();
//         console.log('Success:', data);
//       } catch (error) {
//         console.error(error);
//         alert("Oops! Something with the tag selection went wrong");
//       }
//     };

//     if (debouncedSelected !== video.Tags) {
//       makeApiCall();
//     }
//     setResponseData((prev) =>
//       prev?.map((item) =>
//         item._id === video._id ? { ...item, Tags: debouncedSelected } : item
//       ) || null
//     );  }, [debouncedSelected]);

//   const handleClick = (index: number) => {
//     setSelected(prev => prev.map((item, i) => (i !== index ? item : !item)));
//   };


  const TAGS = ["SR", "SR-SM", "JR", "JR-SM", "SO"];
  const COLORS = [
    "bg-yellow-500",
    "bg-orange-600",
    "bg-rose-600",
    "bg-purple-600",
    "bg-blue-500",
  ];


  return (
    <div className="flex flex-col items-center gap-2">
      {TAGS.map((tag, index) => (
        <div
          key={index}
          className={`w-full rounded-lg text-sm ${COLORS[index]} ${
            video.Tags[index] ? "bg-opacity-90" : "hidden"
          }`}
          // onClick={() => handleClick(index)}
        >
          {tag}
        </div> //
      ))}
    </div>
  );
};

export default Tags;
