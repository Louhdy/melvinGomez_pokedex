import { useQuery } from '@tanstack/react-query';
import { MainStackScreenProps } from '../navigators/Types';
import { Pokemon, fetchPokemon } from '../utils/api';
import { types } from '../utils/helpers';
import {
    Text,
    StyleSheet,
    Image,
    View,
    ScrollView,
} from 'react-native';


export function Detail({ route }: MainStackScreenProps<'Detail'>) {
    const { name } = route.params;
    const { data } = useQuery<Pokemon>(['pokemon', name], () =>
        fetchPokemon(name)
    );

    const getTypeColor = (type: string) => {
        return types[type as keyof typeof types] || 'light';
    };

    let sprites: string[] = [];

    const getSprite = (obj: any) => {
        const values = obj ? Object.values(obj) : [];

        values.forEach(val =>
            val && typeof val === "object" ? getSprite(val) : sprites.push(val as string))
    }

    getSprite(data?.sprites)

    if (!data) return null;

    return (
        <View
            style={[styles.card, { backgroundColor: getTypeColor(data.types[0].type.name) }]}
        >
            <ScrollView>
                <View
                    style={styles.header}
                >
                    <Image
                        source={{
                            uri: data.sprites.other['official-artwork'].front_default,
                        }}
                        style={styles.image}
                        alt="image"
                    />
                    <Text>{name}</Text>
                    <Text>#{data.id.toString()}</Text>
                </View>
                <View
                    style={styles.details}
                >
                    <Text style={styles.infoText}>Types</Text>
                    <View style={styles.info}>
                        {data.types.map((type) => (
                            <Text
                                key={type.type.name}
                            >
                                {type.type.name}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.infoText}>Peso</Text>
                    <Text style={styles.info}>{data.weight}</Text>
                    <Text style={styles.infoText}>Sprites</Text>
                    <View style={styles.info}>
                        {sprites.map((sprite, index) => (
                            <View key={index} >
                                <Image
                                    source={{
                                        uri: sprite,
                                    }}
                                    style={styles.sprite}
                                    alt="image"
                                />
                            </View>
                        ))}
                    </View>
                    <Text style={styles.infoText}>Movimientos</Text>
                    <View style={styles.info}>
                        {data.moves.map((move) => (
                            <Text
                                key={move.move.name}
                            >
                                {move.move.name}
                            </Text>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
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
        justifyContent: 'flex-start',
        color: 'white'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    details: {
        margin: 15,
        display: 'flex',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },
    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        color: 'black',
        paddingBottom: 10,
    },
    infoText: {
        fontSize: 20,
        fontWeight: '500',
    },
    sprite: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    image: {
        width: 100,
        height: 100,
    },
});