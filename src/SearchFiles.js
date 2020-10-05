import React, { useState } from 'react';
import './App.css';
import { useQuery } from 'react-query';
import fetchData from './fetchData';
import sortData from './sortData';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const SearchFiles = React.memo(() => {

    const { status, data } = useQuery('', fetchData);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedData, setSortedData] = useState([]);

    const handleChange = (event) => {
        const term = event.target.value;
        setSearchQuery(term);
        setSortedData(sortData(term, data));
    }

    return (
        <div className='search-files'>
            {status === 'loading' && <Loader className="loader"
                type="Watch"
                color="grey"
                height={80}
                width={80} />}
            {status === 'success' && (
                <>
                    <div className='search-bar'>
                        <input
                            type="text"
                            placeholder="Search files from Google Drive..."
                            name="search"
                            value={searchQuery}
                            onChange={handleChange} />
                    </div>
                    {searchQuery.length > 0 &&
                        <div>
                            {sortedData.slice(0, 20).map((item) => (
                                <div className='search-items' key={item.id}><img alt='icons' src={item.iconLink} />{item.name}<a href={item.webViewLink} target="_blank" rel='noreferrer noopener'>Open this file</a></div>
                            ))}
                        </div>
                    }
                </>
            )}
            {status === 'error' && <div className='loader error'>Error Fetching... Try with a different access_Token</div>}
        </div>
    )
})


export default SearchFiles


