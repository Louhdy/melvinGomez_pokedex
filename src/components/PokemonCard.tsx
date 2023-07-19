import {
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchFn, Pokemon } from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../navigators/Types';
import { types } from '../utils/helpers';

interface PokemonCardProps {
    url: string;
    name: string;
}

export function PokemonCard({ url, name }: PokemonCardProps) {
    const { isLoading, error, data } = useQuery<Pokemon>(['pokemon', name], () =>
        fetchFn(url)
    );
    const navigation =
        useNavigation<MainStackScreenProps<'Home'>['navigation']>();

    const getTypeColor = (type: string) => {
        return types[type as keyof typeof types] || 'light';
    };

    if (isLoading) return <ActivityIndicator />;

    if (!data || error) return null;
    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: getTypeColor(data.types[0].type.name) }]}
            onPress={() => navigation.navigate('Detail', { name })}
        >
            <Image
                source={{
                    uri: data.sprites.other['official-artwork'].front_default,
                }}
                style={styles.image}
            />
            <Text>#{data.id.toString()}</Text>
            <Text>{data.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 4,
        paddingBottom: 10,
        margin: 5,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    image: {
        width: 100,
        height: 100,
    },
});
