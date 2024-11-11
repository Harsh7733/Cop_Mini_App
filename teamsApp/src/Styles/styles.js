import React from 'react';
import { SafeAreaView, Text, View, Button, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centered}>
                <Image source={require('../assets/Cop_Mini.png')} style={styles.Cop_Mini} />
                <Text style={styles.heading}>Welcome to App</Text>
                <Image source={require('../assets/sample-image (1).png')} style={styles.image} />
                <Button title="Get Started" onPress={() => navigation.navigate('PhoneNumber')} />
            </View>
        </SafeAreaView>
    );
};

StartScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    Cop_Mini: {
        height: 100,
        marginBottom: 20,
        width: 100,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        height: 200,
        marginBottom: 20,
        width: 200,

    },
});

export default StartScreen;
