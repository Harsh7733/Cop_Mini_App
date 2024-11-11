import React, { useState } from 'react';
import { StyleSheet, TextInput,  Text, View, ImageBackground } from 'react-native';
import CustomButton from './CustomButton';

const colors = {
    borderColor: '#ccc',
    subheading: '#55a630',
    fixedDomain: 'blue',
    text: 'black',

};

const BrandIdentityScreen = () => {
    const [identity, setIdentity] = useState('');

    const handleDone = () => {
        // Do something when the user clicks "Done"
        console.log('Online identity created:', identity);
    };

    return (
        <ImageBackground
            source={require('../assets/BackgroundImg.jpg')}
            style={styles.container}
        >
            <View style={styles.container}>
                <Text style={styles.heading}>Create Your Online Identity</Text>
                <Text style={styles.subheading}>To share it in your Instagram bio and on WhatsApp for people to easily browse your website!</Text>

                <TextInput
                    style={styles.input}
                    // placeholder="Enter online identity"
                    value={identity}
                    onChangeText={setIdentity}
                />
                <Text style={styles.fixedDomain}>.copious.care</Text>

                <CustomButton
                    title="Done" onPress={handleDone}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 20 },
    fixedDomain: { color: colors.fixedDomain, fontSize: 16, marginTop: 5 },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        // color: colors.borderColor,
        color: colors.text,
        marginBottom: 10,
        padding: 10,
        width: '100%',

    },
    subheading: { color: colors.subheading, fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
});

export default BrandIdentityScreen;