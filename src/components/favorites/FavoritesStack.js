import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { View } from 'react-native'

const Stack = createStackNavigator();

const FavoritesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="favorites" />
        </Stack.Navigator>
    )
}

export default FavoritesStack
