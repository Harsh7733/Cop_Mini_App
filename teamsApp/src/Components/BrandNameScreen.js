import React, { useState } from 'react';
import { StyleSheet, TextInput,  Text, View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

const colors = {
    borderColor: '#ccc',
    subheading: '#55a630',
    text:'black',

};

const BrandNameScreen = ({ navigation }) => {
    const [brandName, setBrandName] = useState('');


    return (
        <ImageBackground
            source={require('../assets/BackgroundImg.jpg')}
            style={styles.container}
        >
            <View style={styles.container}>
                <Text style={styles.heading}>Enter your Brands Name</Text>
                <Text style={styles.subheading}>You can change it later!</Text>
                <TextInput
                    style={styles.input}
                    // placeholder="Brand Name"
                    value={brandName}
                    onChangeText={setBrandName}
                />
                <CustomButton
                  title="Next"
                  onPress={() => navigation.navigate('BrandIdentity')}
                />
                
            </View>
        </ImageBackground>
    );
};

BrandNameScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 20 },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        // color: colors.borderColor,
        color:colors.text,

        marginBottom: 20,
        padding: 10,
        width: '100%',
    },
    subheading: { color: colors.subheading, fontSize: 16,fontWeight: 'bold', marginBottom: 20 },

});

export default BrandNameScreen;
