import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import Storage from '../../libs/storage'
import colors from '../../res/colors'
import CoinsItem from '../coins/CoinsItem'
import FavoritesEmptyState from './FavoritesEmptyState'

const FavoritesScreen = ({navigation}) => {

    const [favorites, setFavorites] = useState([])

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();

            const keys = allKeys.filter((key) => key.includes('favorite-'));

            const favs = await Storage.instance.multiGet(keys);

            const favorites = favs.map((fav) => JSON.parse(fav[1]));

            setFavorites( favorites )

        } catch (error) {
            console.log("Get Favorites Err", error);
        }
    }
    
    const handlePress = () => {
        navigation.navigate("CoinDetail", { coin });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => getFavorites());
        return unsubscribe;
    }, [navigation])

    //or

    // useEffect(() => {
    //     navigation.addListener('focus', () => getFavorites());
    //     return () => {
    //         navigation.removeListener('focus', () => getFavorites());
    //     }
    // }, [])

    return (
        <View style={styles.container}>
            {  !favorites && <FavoritesEmptyState /> }
            <FlatList
                data={favorites}
                renderItem={({item})=>
                    <CoinsItem item={item} onPress={() => handlePress(item)} />
                }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1,
    }
})

export default FavoritesScreen
