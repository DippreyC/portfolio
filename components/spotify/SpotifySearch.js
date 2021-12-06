import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Playlist from './Playlist'
import Track from './Track'

const SpotifySearch = ({addTrackHandler}) => {
    const [search, setSearch] = useState()
    const [searchResults, setSearchResults] = useState()

    useEffect(() => {
        const getSearchResults = async () => {
            const {data} = await axios.get(`/api/spotify/search/${search}`)
            setSearchResults(data)
        }
        if(search)
        getSearchResults()
    },[search])

    

    return (
        <div className='flex flex-col h-screen'>
            <div className='p-5 text-4xl text-white'><h1>Suggest a track</h1></div>
            <input 
                    type='text' 
                    placeholder='Suggest a track' 
                    className='p-3 rounded'
                    onChange={(e)=>setSearch(e.target.value)}
            />
               
            <div className='flex flex-col h-full overflow-y-hidden'>
                {searchResults &&
                    <div className='flex flex-col mt-3 scrollbar-thin scrollbar-thumb-gray-600'>
                        {searchResults.tracks.items.map(track=>{
                            return (
                                <Track addTrackHandler={addTrackHandler} track={track} key={track.id} >
                                    
                                </Track>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default SpotifySearch
