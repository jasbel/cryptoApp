import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../../res/colors';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blackPearl,
                    shadowColor: colors.blackPearl
                },
                headerTintColor: colors.white
            }}
        >
            <Stack.Screen name="favorites" component={FavoritesScreen}/>
        </Stack.Navigator>
    )
}

export default FavoritesStack
