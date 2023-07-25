import React from "react";
import { typeColors } from "../../utils/helpers";
import "./Card.css";
import { useQuery } from '@tanstack/react-query';
import { fetchFn, Pokemon } from '../../utils/api';

const Card = ({ pokemon, details }) => {

    let { isLoading, error, data } = useQuery (['pokemon', pokemon.name], () =>
        fetchFn(pokemon.url)
    );

    if (!data || error) return null;

    const getTypeColor = (type) => {
        return typeColors[type] || 'light';
    };

    return (
        <>
            {isLoading ? (
                <h1>Cargando...</h1>
            ) : <>
                <div
                    className="card mb-5 flex items-center justify-center flex-col pb-8"                
                    onClick={() => details(data)}
                    style={{ backgroundColor: `${getTypeColor(data.types[0].type.name)}` }}
                >
                    <img
                        src={data.sprites.other['official-artwork'].front_default}
                        height={128}
                        width={128}
                        alt=""
                    />
                    <span className="capitalize font-bold py-2">#{data.id}</span>
                    <span className="capitalize font-bold">{data.name}</span>
                </div>
            </>
            }
        </>
    );
};
export default Card;
