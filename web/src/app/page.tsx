"use client";
import Image from 'next/image'
import Search from "../components/Search/Search";
import Card from "../components/Card/Card";
import Details from "../components/Details/Details";
import React from "react";
import { useState } from "react";
import { useInfiniteQuery } from '@tanstack/react-query';
import { Pokemon, Pokemons, fetchPokemons } from '@/utils/api';

export default function Home() {
  const [page, setPage] = useState(0);
  const [select, setSelect] = useState<Pokemon | undefined>(undefined);


  const { data, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Pokemons>(['pokemons'], fetchPokemons, {
      getNextPageParam: (lastPage) => lastPage.next,
    });

  if (!data) return null;


  const fetchSearch = async (value: Pokemon) => {    
    setSelect(value);
  };

  const setPokemon = (value: any) => {
    setSelect(value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <div className="pt-8 pb-4 text-center text-2xl">
        Listado de Pokemon
      </div>
      <div className="text-center self-start pl-10 pr-20 w-1/2">
        <Search fetchSearch={fetchSearch} />
      </div>
      <div className="flex w-full gap-40 p-10 pt-6">
        <div className="flex-1 columns-2">
          {data.pages[page]?.results.map((page, index) => {
            return (
              <Card
                key={page.name}
                pokemon={page}
                details={setPokemon}
              />
            )
          })}
        </div>
        <div className="flex-1">
          <Details data={select} />
        </div>
      </div>
      <div className="fixed left-0 bottom-0 w-full h-auto text-white text-center flex items-center justify-around pt-2">
        {page && (
          <button
            className='bg-sky-600 w-40 h-10 m-4 pr-2 text-base font-bold text-white rounded-lg flex justify-center items-center'
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <Image
              src="/left.svg"
              alt="left arrow"
              className="dark:invert"
              width={24}
              height={24}
            />
            Atrás
          </button>
        )}
        {hasNextPage && (
          <button
            className='bg-sky-600 w-40 h-10 m-4 pl-5 text-base font-bold text-white rounded-lg flex justify-center items-center'
            onClick={() => {
              fetchNextPage();
              setPage(page + 1);
            }}
          >
            Siguiente
            <Image
              src="/right.svg"
              alt="right arrow"
              className="dark:invert"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </main>
  )
}
