import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Table from './components/Table';
import SearchBox from './components/SearchBox';

const API_URL = import.meta.env.VITE_API_URL

interface Video { // For passing props to Table (through filteredData)
  Video_Link: string;
  Title: string;
  Published_At: string;
  Thumbnail_URL: string;
  Description: string;
  Tags: boolean[];
  Position: number;
  _id: string;
}

function App() {
  const [responseData, setResponseData] = useState<Video[] | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<boolean[]>([false, false, false, false, false, false, true])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/data`);
        console.log(response.data)
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const matchesFilters = (tags: boolean[]) => {
    if (tagFilter[6]) return true;
    if (tagFilter[5]) return (tags.every(value => value == false)) ? true : false;
    for (let i = 0; i < 5; i++) { 
      if (tagFilter[i] && tags[i]) return true;
    } // if they all fit filter...
     
    return false;
  }

  const filteredData = responseData?.filter((item: Video) =>
    (matchesFilters(item.Tags)) && ((
    item.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Description.toLowerCase().includes(searchQuery.toLowerCase())))
  ) || [];

  return (
    <>
      {!responseData ? <p>Loading data... (First loadup of backend server tends to be a bit slow, 5 seconds expected)</p> : (
        <>
          <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} tagFilter={tagFilter} setTagFilter={setTagFilter} />
          <Table data={filteredData} />
          {/* <Table data={filteredData} setResponseData={setResponseData}/> */}
        </>
      )}
    </>
  )
}

export default App
