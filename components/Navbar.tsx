import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#2b2b2b',
        padding: 20,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },

    navbarText: {
        fontSize: 24,
        paddingTop: 20,
        color: '#ffc40d',
        fontWeight: 'bold',
    },

});


interface Props {
}
interface State {
}

export default class Navbar extends React.Component<Props, State> {

    render(){
        return(
            <View style={styles.navbar}>
                <Text style={styles.navbarText}>Stock Price</Text>
            </View>
        );
    }
}
