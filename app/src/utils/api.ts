export interface Pokemon {
    name: string;
    id: number;
    weight: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
    moves: {
        move: {
            name: string;
        }
    }[];
}

export interface Pokemons {
    count: number;
    next: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}

export async function fetchFn(endpoint: string) {
    const response = await fetch(endpoint);
    return response.json();
}

export async function fetchPokemons({ pageParam }: { pageParam?: string }) {
    const response = await fetch(
        pageParam || 'https://pokeapi.co/api/v2/pokemon/?limit=4'
    );
    return response.json();
}

export async function fetchPokemon(name: string) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
    if (!response.ok) {
        throw new Error(`Pokemon ${name} not found`);
    }
    return response.json();
}