import { useState, useEffect } from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

import Caret from "./Caret";
import Form from "./Form";
import Tags from "./Tags";

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
interface TableProps {
  data: Video[];
  setResponseData: React.Dispatch<React.SetStateAction<Video[] | null>>;
}
const Table = ({ data, setResponseData }: TableProps) => {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [sortedData, setSortedData] = useState([...data]);
  const [popUp, setPopUp] = useState("");
  const [video, setVideo] = useState<Video | undefined>(undefined);

  function videoDateSort(a: Video, b: Video) {
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
  useEffect(() => {
    const sortedArray = [...data];
    if (sort === "asc") {
      sortedArray.sort((a, b) => videoDateSort(a, b));
    } else {
      sortedArray.sort((a, b) => videoDateSort(b, a));
    }
    setSortedData(sortedArray);
  }, [sort, data]);

  function handleHeaderClick() {
    setSort((prevSort) => (prevSort === "asc" ? "desc" : "asc")); // direction = sort === 'asc' ? 'desc' : 'asc';
  }
  const handleEditClick = (video: Video) => {
    setVideo(video);
    setPopUp("Edit");
  };
  const handleAddClick = () => {
    setVideo(undefined);
    setPopUp("Add");
  };
  return (
    <>
      {popUp && (
        <Form
          type={popUp}
          callback={setPopUp}
          video={video}
          setResponseData={setResponseData}
        />
      )}

      <table className="table table-bordered align-middle">
        <thead className="table-dark sticky top-[69px] z-10">
          <tr>
            <th className="custom-width-num">
              <span>#</span>
            </th>
            <th className="w-[80px]">
              <span>Tags</span>
            </th>
            <th className="custom-width-thumb">
              <span>Thumbnail and Title</span>
            </th>
            <th
              className="custom-width-pub clickable"
              onClick={() => handleHeaderClick()}
            >
              <div className="flex gap-1">
                <span>Published</span>
                <span className="flex-grow">
                  <Caret direction={sort} />
                </span>
              </div>
            </th>
            <th>
              <span>Description</span>
            </th>
            <th className="custom-width-add ">
              <button
                className="clickable border border-white px-[5px] rounded-2xl"
                onClick={handleAddClick}
              >
                Add New
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 && (
            <tr key="1">
              <td colSpan={6}>
                <span>No videos found</span>
              </td>
            </tr>
          )}
          {sortedData.map((item, index) => (
            <tr key={item._id}>
              <td className="fw-bold">{index + 1}</td>
              <td>
                <Tags video={item} />
                {/* <Tags video={item} setResponseData={setResponseData}/>                */}
              </td>
              {/* Thumbnail is 480x360 */}
              <td className="thumb-col">
                <div className="m-2">
                  <AspectRatio.Root ratio={16 / 9} className="border-3 border-gray-800">
                    <img
                      loading="lazy"
                      className="h-full w-full object-cover clickable"
                      src={item.Thumbnail_URL}
                      alt="Thumbnail of YT vid"
                      onClick={() => window.open(item.Video_Link, "_blank")} 
                    />
                  </AspectRatio.Root>
                </div>
                <div>
                  <span>{item.Title}</span>
                </div>
              </td>
              <td>{item.Published_At}</td>
              <td className="whitespace-pre-wrap break-words text-left p-4">
                {item.Description}
              </td>
              <td>
                <div className="flex justify-center">
                  <img
                    src={"assets/wrench.svg"}
                    alt="wrench icon"
                    className="clickable self-center"
                    onClick={() => handleEditClick(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Table;
