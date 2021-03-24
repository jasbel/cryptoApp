import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import Http from 'initial/src/libs/http';
import Colors from 'initial/src/res/colors';

import CoinsItem from './CoinsItem'
import CoinsSearch from './CoinsSearch';


class CoinsScreen extends React.Component {

    state = {
        coins: [],
        allCoins: [],
        loading: false
    }

    componentDidMount = () => {
        this.getCoins();
        
    }

    getCoins = async () => {
        this.setState({ loading: true })

        const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');

        this.setState({ coins: res.data, allCoins: res.data ,loading: false })
    }

    handlePress = (coin) => {

        this.props.navigation.navigate('CoinDetail', {coin});
    }

    handleSearch = (query) => {
        const { allCoins } = this.state;

        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
        });

        this.setState({ coins: coinsFiltered });
    }

    render() {

        const { coins, loading } = this.state;

        return (
            <View style={styles.container}>
                {/* <Text style={styles.titleText}> Coins Screen </Text>
                <Pressable onPress={this.handlePress} style={styles.btn}><Text style={styles.btnText}>Ir a Detalle</Text></Pressable> */}

                <CoinsSearch onChange={this.handleSearch}/> 

                {
                    loading ? <ActivityIndicator color="#fff" size="large" style={styles.loader} /> : null
                }

                <FlatList
                    data={coins}
                    renderItem={({ item }) =>
                        <CoinsItem 
                            item={item} 
                            onPress={ () => this.handlePress(item)} 
                        />
                    }
                />

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    titleText: {
        color: "#fff",
        textAlign: 'center'
    },
    textSubtitle: {
        color: "#fff",
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: 'blue',
        borderRadius: 16,
        margin: 16,
        padding: 5
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    },
    loader: {
        margin: 50
    }
})


export default CoinsScreen
