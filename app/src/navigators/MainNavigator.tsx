import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail } from '../screens/Detail';
import { Home } from '../screens/Home';
import { Search } from '../screens/Search';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { MainStackParamList } from './Types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                    headerLargeTitle: true,
                    headerTitle: 'Listado de Pokemon',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <MaterialIcons style={styles.icon} name="search" color="black" size={32} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Search" component={Search} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        paddingRight: 15,
    },
});

