import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

// Define color constants
const colors = {
    primary: '#007BFF',
    secondary: '#4CAF50',
    white: '#fff',
    heading:'#22577a',
    subheading:'#55a630',
};

const OTPScreen = ({ route, navigation }) => {
    const { phoneNumber } = route.params;
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    // Create refs for each OTP input field
    const inputRefs = useRef([]);

    // Start the timer immediately when the screen loads
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        
        // Clear interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setIsResendDisabled(false); // Enable resend button when timer reaches 0
        }
    }, [timer]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next field if value is entered
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpBackspace = (index) => {
        // Move to previous field if backspace is pressed and current field is empty
        if (otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const otpEntered = otp.join('');
        if (otpEntered === '123456') {
            navigation.navigate('Speciality');
        } else {
            alert('Invalid OTP!');
            setTimer(30);  // Restart the timer after invalid OTP
            setIsResendDisabled(true);  // Disable resend button
        }
    };

    const handleResend = () => {
        setTimer(30);  // Restart the timer
        setIsResendDisabled(true);  // Disable resend button while timer runs
        alert('OTP has been resent!');
    };

    // Compute opacity outside JSX
    const opacityStyle = isResendDisabled ? 0.5 : 1;

    return (
        <ImageBackground
            source={require('../assets/BackgroundImg.jpg')}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Please Enter OTP</Text>
                <Text style={styles.subHeading}>Sent to {phoneNumber}</Text>

                <View style={styles.otpContainer}>
                    {otp.map((value, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            maxLength={1}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') {
                                    handleOtpBackspace(index);
                                }
                            }}
                            ref={(ref) => { inputRefs.current[index] = ref; }}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.resendButton, { opacity: opacityStyle }]}
                    disabled={isResendDisabled}
                    onPress={handleResend}
                >
                    <Text style={styles.resendText}>
                        Didn’t receive OTP? Re-send in {timer}s
                    </Text>
                </TouchableOpacity>

                <CustomButton
                    title="Verify OTP"
                    onPress={handleVerify}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

OTPScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            phoneNumber: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

// Styles with reordered properties and color constants
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    heading: {        
        color: colors.heading,
        fontSize: 24,
        fontWeight: 'bold',
    },
    otpContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    otpInput: {
        borderWidth: 1,
        fontSize: 20,
        height: 40,
        marginHorizontal: 5,
        textAlign: 'center',
        width: 40,
    },
    resendButton: {
        marginBottom: 20,
    },
    resendText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    subHeading: {
        color: colors.subheading,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default OTPScreen;
