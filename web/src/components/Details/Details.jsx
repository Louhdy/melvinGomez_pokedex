import React from "react";
import { typeColors } from "../../utils/helpers";

import "./Details.css";

const Details = ({ data }) => {

  const getTypeColor = (type) => {
    return typeColors[type] || 'light';
  };

  let sprites = [];

  const getSprite = (obj) => {
    const values = obj ? Object.values(obj) : [];

    values.forEach(val =>
      val && typeof val === "object" ? getSprite(val) : sprites.push(val))
  }

  getSprite(data?.sprites)

  sprites = sprites.filter(Boolean)

  return (
    <>
      {!data ? (
        ""
      ) : (
        <div className="info-card w-full flex flex-col items-center rounded-lg relative">
          <img
            className="h-36"
            src={data.sprites.other['official-artwork'].front_default}
            alt=""
            height={80}
          />
          <span role="id" className="text-lg font-semibold capitalize text-center block">{data.id}</span>
          <span role="name" className="text-lg font-semibold capitalize text-center block">{data.name}</span>
          <div className="flex flex-col w-fullv p-5">
            <span className="font-semibold">Types</span>
            <div className="flex">
              {data.types.map((poke, index) => {
                return (                
                  <div key={index} className="type" style={{ backgroundColor: `${getTypeColor(poke.type.name)}` }}>

                    <span>{poke.type.name}</span>
                  </div>                
                );
              })}
            </div>
            <span className="font-semibold mt-3">Peso</span>
            <span>{data.weight}</span>
            <span className="font-semibold mt-3">Sprites</span>
            <div className="flex flex-row flex-wrap pb-2">
              {sprites.map((sprite, index) => (
                <img
                  key={index}
                  src={sprite}
                  className="w-10 h-10 rounded-lg"
                  alt="image"
                />
              ))}
            </div>
            <span className="font-semibold mt-3">Movimientos</span>
            <div className="flex flex-row flex-wrap pb-2">
              {data.moves.map((move) => (
                <span
                  key={move.move.name}
                >
                  {move.move.name}&nbsp;
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Details;
