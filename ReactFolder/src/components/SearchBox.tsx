import * as Popover from "@radix-ui/react-popover";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  tagFilter: boolean[];
  setTagFilter:React.Dispatch<React.SetStateAction<boolean[]>>;
}
const SearchBox = ({ searchQuery, setSearchQuery, tagFilter, setTagFilter }: SearchBoxProps) => {

  const handleClick = (index: number) => {
    setTagFilter((prev: boolean[]) => 
      prev.map((_, i) => (i !== index ? false : true))
    );
  };


  const TAGS = ["Senior", "Senior Summer", "Junior", "Junior Summer", "Sophomore", "No Tag", "All"];

  return (
    <>
      <label htmlFor="searchBoxForm" className="w-95-100 text-white font-bold m-auto pt-3 p-2 bg-bluePrimary text-center">
        &#127936; Search for Videos &#127936;
      </label>
      <div className="w-95-100 p-3 m-auto flex gap-4 sticky top-0 bg-bluePrimary z-10">
        <input
          type="text"
          className="form-control"
          id="searchBoxForm"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Popover.Root>
          <Popover.Trigger asChild>
            <img className="clickable" src="assets/tag.svg" width={30} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="z-20 rounded p-4 w-[260px] bg-white"
              sideOffset={5}
            >
              <div className="flex flex-col gap-2.5">
                <p className="text-[15px] font-medium mb-2.5">Tag Filter</p>
                {TAGS.map((item, index) => (
                  <fieldset className="flex gap-5 items-center" key={index}>
                    <label className="text-[13px] w-[90px]" htmlFor={item}>
                      {item}
                    </label>
                    <input
                      type="checkbox"
                      className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none h-[25px]"
                      id={item}
                      checked={tagFilter[index]}
                      onChange={() => {handleClick(index)}}
                    />
                  </fieldset>
                ))}
              </div>
              <Popover.Close
                className="inline-flex items-center justify-center absolute top-[10px] right-[10px]"
                aria-label="Close"
              >
                <img src="assets/exit.svg"/>
              </Popover.Close>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </>
  );
};

export default SearchBox;
