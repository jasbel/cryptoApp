import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../res/colors'
import FavoritesEmptyState from './FavoritesEmptyState'

const FavoritesScreen = () => {
    return (
        <View style={styles.container}>
            <FavoritesEmptyState />

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
