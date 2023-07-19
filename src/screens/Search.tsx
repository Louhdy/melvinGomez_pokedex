import { useState, useEffect } from 'react';
import { TextInput, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemon, Pokemon } from '../utils/api';
import { MainStackScreenProps } from '../navigators/Types';

export function Search({ navigation }: MainStackScreenProps<'Search'>) {
    const [text, setText] = useState('');
    const { data, fetchStatus, error } = useQuery<Pokemon>(
        ['pokemon', text],
        () => fetchPokemon(text.toLowerCase()),
        {
            enabled: !!text,
        }
    );

    useEffect(() => {
        if (data) {
            navigation.replace('Detail', {
                name: data.name,
            });
        }
    }, [data]);

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Buscar Pokemon"
                value={text}
                onChangeText={setText}
                autoFocus
                inlineImageLeft='search_icon'
            />
            <View style={styles.text}>
                {!!error && (
                    <Text>
                        No se encontró el Pokemon '{text}'
                    </Text>
                )}
                {fetchStatus === 'fetching' && <ActivityIndicator />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        border: '1px solid grey',
        margin: 10,
        borderRadius: 10,
        height: 35,
    },
    text: {
        padding: 5,
        margin: 10,
    },
});
