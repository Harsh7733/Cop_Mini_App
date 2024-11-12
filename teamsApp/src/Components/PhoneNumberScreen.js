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
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (text) => {
    // Remove any non-numeric characters from the input
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Limit the input to 10 digits
    if (cleanedText.length <= 10) {
      setInputValue(cleanedText);
      setErrorMessage(''); // Clear error message when input is valid
    } else {
      setErrorMessage('Phone number cannot be more than 10 digits');
    }
  };

  const handleContinue = () => {
    // If the input is valid (exactly 10 digits), navigate to OTP screen
    if (inputValue.length === 10) {
      navigation.navigate('OTP', { phoneNumber: inputValue });
    } else {
      setErrorMessage('Please enter a valid 10-digit phone number');
    }
  };

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
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={PLACEHOLDER_COLOR}
              keyboardType="phone-pad"
              maxLength={10} // Ensures no more than 10 digits can be typed
              value={inputValue}
              onChangeText={handleInputChange}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>

          <CustomButton
            title="Continue"
            onPress={handleContinue} // Call the handleContinue function to validate before navigation
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

PhoneNumberScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
const ERROR_COLOR = '#E74C3C';  // You can customize this color


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
  errorText: {
    color: ERROR_COLOR,
    fontSize: 12,
    marginTop: 5,
  },
  heading: {
    color: DARK_TEXT_COLOR, // Darker text for better readability
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
