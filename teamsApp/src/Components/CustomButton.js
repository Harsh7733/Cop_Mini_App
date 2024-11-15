import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

// Define color constants
const COLORS = {
    primary: '#184e77',  // Button background color
    white: '#fff',
    border: '#70e000',   // Border color
};

const CustomButton = ({ title, onPress, style }) => {
    return (
        <View style={[styles.buttonContainer, style]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired, // onPress must be passed and should be a function
    style: PropTypes.object,  // Accept additional styles
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: COLORS.primary, // Use the primary color for the button background
        borderColor: COLORS.border,      // Border color set to green
        borderRadius: 13,                // Rounded corners for the button
        borderWidth: 4,                  // Border width of 4
        justifyContent: 'center',
        paddingHorizontal: 24,           // Horizontal padding inside the button
        paddingVertical: 12,             // Vertical padding inside the button
    },
    buttonContainer: {
        marginTop: 20,
        // paddingHorizontal: 16,
    },
    buttonText: {
        color: COLORS.white, // White color for the text
        fontSize: 16,        // Font size for the button text
        fontWeight: 'bold',  // Bold text style
    },
});

export default CustomButton;
