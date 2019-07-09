import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({

    loading: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingText: {
        fontSize: 16,
        color: '#999999',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    main: {
        flex: 1,
        flexDirection:'column',
    },

    itemsHeader: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        padding: 20,
        borderBottomColor: '#636363',
        borderBottomWidth: 1,
    },

    stockList: {
        flex:1,
    },

    items: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderColor: '#636363',
        borderWidth: 0.5,
    },

});

interface Datum {
    symbol: string;
    name: string;
    price: number;
}

const Item = ({ item }: { item: Datum }) => (

    <View style={styles.items}>
        <View style={{ flex: 1 , padding: 20}}>
            <View>
                <Text>{item.symbol}</Text>
            </View>
        </View>
        <View style={{ flex: 3, alignSelf: 'stretch', padding: 20 }}>
            <View>
                <Text>{item.name}</Text>
            </View>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' , padding: 20}}>
            <View>
                <Text>{item.price}</Text>
            </View>
        </View>
    </View>
);

interface Props {
}
interface State {
    isLoading: boolean;
    dataSource?: Datum[];
}

export default class App extends React.Component<Props, State> {

    private mounted: boolean;

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
        }
        this.mounted = false;
    }

    componentDidMount(){
        this.mounted = true;
        const url = 'https://financialmodelingprep.com/api/v3/company/stock/list';

        return fetch(url)
            .then(response => response.json())
            .then((responseJson) => {
                if (!this.mounted) {
                    return;
                }

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.symbolsList,
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render(){
        const {
            dataSource,
            isLoading,
        } = this.state;


        if(isLoading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator/>
                    <Text style={styles.loadingText}> Fetching Stock data. Please wait...</Text>
                </View>
            )
        }

        return(
            <View style={styles.main}>
                <View style={styles.itemsHeader}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={{fontWeight: 'bold'}}>Symbol</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, alignSelf: 'stretch' }}>
                        <View>
                            <Text style={{fontWeight: 'bold', paddingHorizontal: 20}}>Name</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'stretch' }}>
                        <View>
                            <Text style={{fontWeight: 'bold', paddingHorizontal: 10}}>Price</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={dataSource}
                    renderItem={Item}
                    keyExtractor={({symbol}, index) => String(symbol)}
                    style={styles.stockList}
                />
            </View>
        );
    }
}
