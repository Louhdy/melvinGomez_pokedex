import {
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { PokemonCard } from '../components/PokemonCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Pokemons, fetchPokemons } from '../utils/api';

export function Home() {
    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery<Pokemons>(['pokemons'], fetchPokemons, {
            getNextPageParam: (lastPage) => lastPage.next,
        });

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    if (isLoading) return <ActivityIndicator />;
    if (!data) return null;

    return (

        <FlatList
            data={data.pages.flatMap((page) => page.results)}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <PokemonCard url={item.url} name={item.name} />
            )}
            onEndReached={loadMore}
            numColumns={2}
            ListFooterComponent={() =>
                isFetchingNextPage ? <ActivityIndicator /> : null
            }
            contentContainerStyle={styles.main}
        />
    );
}

const styles = StyleSheet.create({
    main: {
        padding: 2,
        backgroundColor: 'white',
    },
});
