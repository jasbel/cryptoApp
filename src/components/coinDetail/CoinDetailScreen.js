import React from 'react'
import { Alert, FlatList, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';


class CoinDetailScreen extends React.Component {

    state = {
        coin: {},
        markets: [],
        isFavorite: false

    }

    toggleFavorite = () => {
        if(this.state.isFavorite) {
            this.removeFavorite()
        } else {
            this.addFavorite();
        }
    }

    addFavorite =async () => {
        const coin = JSON.stringify(this.state.coin);
        const key = `favorite-${this.state.coin.id}`;

        const stored = await Storage.instance.store(key, coin);

        if(stored) {
            this.setState({ isFavorite: true });
        }
    }

    removeFavorite = () => {

        Alert.alert("Remove favorite", "Are You Sure ?", [
            {
                text: 'cancel',
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favorite-${this.state.coin.id}`;
                    
                    const instanceRemove = await Storage.instance.remove(key);

                    this.setState({ isFavorite: false });
                },
                style: "destructive"
            }
        ]);
    }

    getFavorite = async () => {
        try {
            const key = `favorite-${this.state.coin.id}`;

            const favStr = await Storage.instance.get(key);

            if(favStr !== null) {
                this.setState({ isFavorite: true })
            }
        } catch (error) {
            console.log(" Get FAvorite error:  ",error);
        }
    }

    getSymbolIcon = (coinNameId) => {
        if (coinNameId) {
            return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
        }
    };

    getSections = (coin) => {
        const sections = [
            {
                title: "Market Cap",
                data: [coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data: [coin.volume24]
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            },
        ];

        return sections;
    }

    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`

        const markets = await Http.instance.get(url);

        this.setState({ markets });
    }

    componentDidMount() {
        const { coin } = this.props.route.params;

        this.props.navigation.setOptions({ title: coin.symbol });

        this.getMarkets(coin.id);

        this.setState({ coin }, () => {
            this.getFavorite();
        })
    }

    render() {

        const { coin, markets, isFavorite } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.row}>
                        <Image
                            style={styles.iconImg}
                            source={{ uri: this.getSymbolIcon(coin.nameid) }}
                        />
                        <Text style={styles.titleText}> {coin.name} </Text>
                    </View>

                    <Pressable 
                        onPress={this.toggleFavorite}
                        style={[
                            styles.btnFavorite,
                            isFavorite ?
                                styles.btnFavoriteRemove :
                                styles.btnFavoriteAdd
                        ]}
                    >
                        <Text style={[styles.btnFavoriteText]}> { isFavorite ? "Remove Favorite" :"Add a Favorite"   }</Text>
                    </Pressable>

                </View>
                <SectionList
                    style={styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) =>
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({ section }) =>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                />

                <Text style={styles.titleText}> Markets</Text>
                <FlatList
                    horizontal
                    style={styles.list}
                    data={markets}
                    renderItem={({ item }) => 
                        <CoinMarketItem item={item}/>
                    }
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade,
    },
    row: {
        flexDirection: 'row',
    },
    subHeader: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 5
    },
    iconImg: {
        height: 25,
        width: 25,
    },
    list: {
        maxHeight: 100
    },
    section: {
        maxHeight: 220
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        color: '#fff',
        fontSize: 14,
    },
    sectionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    marketsTitle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 16,
        marginLeft: 16
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteText: {
        color: '#fff'
    },
    btnFavoriteAdd: {
        backgroundColor: colors.picton,
    },
    btnFavoriteRemove: {
        backgroundColor: colors.carmine,
    }
});

export default CoinDetailScreen


/* TRabajando con hook */
/* 
SI ESTAN TRABAJANDO CON HOOKS Y EL REMOVE FAVORITES NO LES FUNCIONA

Pase como parámetro la coin que luego recibirán en el useEffect(). Ya que si llaman directamente al estado en getFavorite() todas las criptos van a setearse en “Fav” debido a que la key se forma con el estado general.

Antes del bug

const getFavorite = async () => {
    try {
	// nótese como pasaba mi estado general directamente a la funcion
      const key = `favorite-${cryptoCoin.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr != null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('getFavorite error', error);
    }
  };
Arreglado el bug

const getFavorite = async (coin) => {
    try {
	//pasé como parámetro el coin que luego lo recibiré en el useEffect()
	// de esta forma individualizo los estados y ya funciona
      const key = `favorite-${coin.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr != null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('getFavorite error', error);
    }
  };

*/