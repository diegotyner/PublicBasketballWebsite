// import { useState, useEffect, useRef } from "react";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

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
  // const [selected, setSelected] = useState<boolean[]>(video.Tags)
  // const debouncedSelected = useDebouncedValue(selected, 1500);
  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   // Skip the first render
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   const makeApiCall = async () => {
  //     try {
  //       const payload = JSON.stringify({vidId: video?._id, Tags: debouncedSelected});
  //       console.log(payload)

  //       const API_URL = import.meta.env.VITE_API_URL
  //       const response = await fetch(`${API_URL}/api/edit-tags`, {
  //         method: "PUT",
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },  
  //         body: payload,
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       const data = await response.json();
  //       console.log('Success:', data);
  //     } catch (error) {
  //       console.error(error);
  //       alert("Oops! Something with the tag selection went wrong");
  //     }
  //   };

  //   if (debouncedSelected !== video.Tags) {
  //     makeApiCall();
  //   }
  //   setResponseData((prev) =>
  //     prev?.map((item) =>
  //       item._id === video._id ? { ...item, Tags: debouncedSelected } : item
  //     ) || null
  //   );  
  // }, [debouncedSelected]);

  // const handleClick = (index: number) => {
  //   setSelected(prev => prev.map((item, i) => (i !== index ? item : !item)));
  // };


  const TAGS = [
    "SUNS",
    "PELS",
    "MAVS",
    "JAZZ",
    "WARR",
    "NUGG",
    "GRIZ",
    "TIMB",
    "HEAT",
    "HAWK",
    "76ERS",
    "RAPT",
    "BUCK",
    "BULL",
    "CELT",
    "NETS",
  ];
  const LOGOS = [
    "phoenix-suns",
    "orleans-pelicans",
    "dallas-mavericks",
    "utah-jazz",
    "golden-state-warriors",
    "denver-nuggets",
    "memphis-grizzlies",
    "minnesota-timberwolves",
    "miami-heat",
    "atlanta-hawks",
    "philidephia-ers",
    "toronto-raptors",
    "milwaukee-bucks",
    "chicago-bulls",
    "boston-celtics",
    "brooklyn-nets",
  ];
  const COLORS = [
    "bg-orange-600",
    "bg-blue-900",
    "bg-sky-500",
    "bg-sky-900",
    "bg-blue-500",
    "bg-yellow-600",
    "bg-slate-400",
    "bg-teal-600",
    "bg-rose-600",
    "bg-red-500",
    "bg-blue-400",
    "bg-rose-700",
    "bg-green-700",
    "bg-rose-500",
    "bg-green-400",
    "bg-neutral-400",
  ];


  return (
    <div className="w-full flex flex-col items-center gap-2">
      {TAGS.map((tag, index) => (
        <div
          key={index}
          className={`w-full py-2 flex flex-col gap-1 font-semibold rounded-lg px-1 text-sm ${COLORS[index]} ${
            video.Tags[index] ? "bg-opacity-90" : "hidden"
          }`}
        >
          {tag}
          {(index == 13 || index == 8) // I couldnt find good svgs for heat and bulls is what this is saying 
            ? <AspectRatio.Root ratio={1/1} ><img className="h-full w-full object-contain"  src={`nba_logos/${LOGOS[index]}.png`} /></AspectRatio.Root> 
            : <AspectRatio.Root ratio={1/1} ><img className="h-full w-full object-contain"  src={`nba_logos/${LOGOS[index]}.svg`} /></AspectRatio.Root>
          }
        </div> 
      ))}
    </div>
  );
};

export default Tags;
