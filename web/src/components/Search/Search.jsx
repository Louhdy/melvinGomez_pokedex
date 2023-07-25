import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '@/utils/api';
import "./Search.css";

const Search = ({ fetchSearch }) => {
    const [search, setSearch] = useState("");
    const { data, fetchStatus, error, refetch } = useQuery(
        ['pokemon', search],
        () => fetchPokemon(search.toLowerCase()), 
        {
            enabled: !!search,
        }
           
    );

    const searched = (e) => {
        setSearch(e.target.value);
        refetch();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {        
            setSearch(e.target.value);            
            refetch();
            if (search) {
                fetchSearch(data);
            }   
        }        
    }

    useEffect(() => {    
        if (search) {
            fetchSearch(data);
        }        
    }, [search]);

    return (
        <input
            className="search-field rounded-lg p-4 text-base block ml-auto mr-auto w-full"
            type="search"
            value={search}
            placeholder="Buscar Pokemon"
            onKeyDown={handleKeyDown}
            onChange={(e) => searched(e)}
        ></input>
    );
};
export default Search;
