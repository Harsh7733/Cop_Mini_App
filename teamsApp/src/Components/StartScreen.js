import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton'; // Import the reusable button component

const HEADING_COLOR = '#38b000';
const SUBHEADING_COLOR = '#00a5cf';

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get('window');

const StartScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/BackgroundImg.jpg')}
            style={styles.container}
        >
            <View style={styles.centered}>
                <Image source={require('../assets/Cop_Mini.png')} style={styles.Cop_Mini} />

                <View style={styles.imageContainer}>
                    <Text style={styles.heading}>
                        Provide diagnoses &
                    </Text>
                    <Text style={styles.heading}>
                        medical treatment
                    </Text>
                    <Text style={styles.subheading}>
                        to patients at all times...
                    </Text>
                    <Image source={require('../assets/sample-image (1).png')} style={styles.image} />
                </View>

                {/* Use the CustomButton component here */}
                <CustomButton
                    title="Get Started"
                    onPress={() => navigation.navigate('PhoneNumber')}
                />
            </View>
        </ImageBackground>
    );
};

StartScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    Cop_Mini: {
        height: height * 0.2, 
        marginBottom: 20,
        marginTop: -100,
        width: width * 0.4, 
    },
    centered: {
        alignItems: 'center',
        flex: 1,
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
        color: HEADING_COLOR,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        borderRadius: 10,
        height: height * 0.4, 
        width: width * 0.8,  
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    subheading: {
        color: SUBHEADING_COLOR,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default StartScreen;