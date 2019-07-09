import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import PricePull from './components/PricePull';
import Navbar from './components/Navbar';

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },

});


interface Props {
}
interface State {
}

export default class App extends React.Component<Props, State> {

    render(){
        return(
            <View style={styles.main}>
                <Navbar />
                <PricePull />
            </View>
        );
    }
}
