import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../../res/colors';


const CoinsSearch = ({ onChange }) => {

    const [query, setQuery] = useState('')

    const handleText = (query) => {
        setQuery(query);

        if (onChange) {
            onChange(query);
        }
    }

    return (
        <View>
            <TextInput 
                style={[styles.textInput,
                    Platform.OS == 'ios' ? styles.textInputIOS: styles.textInputAndroid
                ]}
                onChangeText={handleText}
                value={query}
                placeholder={'search coin'}
                placeholderTextColor="#fff"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: colors.charade,
        paddingLeft: 16,
        color: "#fff"
    },
    textInputAndroid: {
        borderWidth: 2,
        borderBottomColor: colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }
})

export default CoinsSearch
