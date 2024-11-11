import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, Dimensions, Image, StyleSheet, ImageBackground } from 'react-native';
import CustomButton from './CustomButton'; // Import the reusable button component
import PropTypes from 'prop-types';

// Define color constants for consistency
const PLACEHOLDER_COLOR = '#7F8C8D';
const DARK_TEXT_COLOR = '#2C3E50';
const INPUT_BACKGROUND_COLOR = '#fff';
const { width, height } = Dimensions.get('window');

const PhoneNumberScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ImageBackground
      source={require('../assets/BackgroundImg.jpg')}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Image source={require('../assets/Cop_Mini.png')} style={styles.Cop_Mini} />
          <Text style={styles.heading}>Enter a Phone Number</Text>

          <View style={styles.inputWrapper}>
            {/* Simple Placeholder */}
            <TextInput
              style={styles.input} // Use the style directly
              placeholder="Phone Number"
              placeholderTextColor={PLACEHOLDER_COLOR}
              keyboardType="phone-pad"
              value={inputValue}
              onChangeText={setInputValue}
            />


          </View>

          <CustomButton
            title="Continue"
            onPress={() => navigation.navigate('OTP', { phoneNumber: inputValue })} // Pass phoneNumber to OTP screen
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

PhoneNumberScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  Cop_Mini: {
    height: height * 0.2,
    marginBottom: 150,
    marginTop: -220,
    width: width * 0.4,
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
    color: DARK_TEXT_COLOR,  // Darker text for better readability
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: INPUT_BACKGROUND_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  inputWrapper: {
    width: '80%',
  },
});

export default PhoneNumberScreen;
