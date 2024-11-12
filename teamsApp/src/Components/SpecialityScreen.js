import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground, Modal, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

const colors = {
    addText: '#000000',
    backgroundColor: '#000000',
    selectedColor: '#9ef01a',
    subheading: '#55a630',
    addButton: '#007BFF',
    heading: '#22577a',
    white: '#fff',
    lightGrey: '#ccc',
    darkGrey: '#333',
    modalOverlayColor: 'rgba(0,0,0,0.5)',
};

const SpecialityScreen = ({ navigation }) => {
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [newSpeciality, setNewSpeciality] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [specialities, setSpecialities] = useState([
        'Cardiology', 'Neurology', 'Dermatology', 'Pediatrics', 'Orthopedics',
        'Psychiatry', 'Gastroenterology', 'Surgery', 'Dentistry', 'ENT'
    ]);

    const handleSelectSpeciality = (speciality) => {
        setSelectedSpecialities((prev) =>
            prev.includes(speciality)
                ? prev.filter((item) => item !== speciality)
                : [...prev, speciality]
        );
    };

    const handleAddSpeciality = () => {
        if (newSpeciality.trim() && !specialities.includes(newSpeciality)) {
            setSpecialities((prevSpecialities) => [...prevSpecialities, newSpeciality]); // Add the new speciality
            setNewSpeciality(''); // Clear the input field
            setIsModalVisible(false); // Close the modal
        } else {
            alert('Please enter a valid speciality or avoid duplicates');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/BackgroundImg.jpg')}
            style={styles.container}
        >
            <View style={styles.container}>
                <Text style={styles.heading}>What is your Speciality?</Text>
                <Text style={styles.subheading}>You can change it later!</Text>

                <ScrollView contentContainerStyle={styles.specialityList}>
                    {specialities.map((speciality) => (
                        <TouchableOpacity
                            key={speciality}
                            style={[
                                styles.specialityItem,
                                selectedSpecialities.includes(speciality) && styles.selected,
                            ]}
                            onPress={() => handleSelectSpeciality(speciality)}
                        >
                            <Text style={styles.specialityText}>{speciality}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.addText}>+ Add Specialisation</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Previous"
                        onPress={() => navigation.navigate('Start')}
                        style={styles.previousButton}
                    />

                    <CustomButton
                        title="Next"
                        onPress={() => navigation.navigate('BrandName')}
                        style={styles.nextButton}
                    />
                </View>
            </View>

            {/* Modal for adding new speciality */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add a New Speciality</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter speciality"
                            value={newSpeciality}
                            onChangeText={setNewSpeciality}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleAddSpeciality}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
};

SpecialityScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: colors.addButton,
        borderRadius: 5,
        color: colors.addButton,
        marginBottom: 20, // Adds some space between the button and the specialty list
        marginTop: 20,
        padding: 10,
    },
    addText: { color: colors.addText },
    buttonContainer: {
        bottom: 20, // Ensure buttons are placed at the bottom
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: 0,
        paddingHorizontal: 20,
        position: 'absolute',
        right: 0,
        width: '100%',
    },
    cancelButton: { backgroundColor: colors.lightGrey },
    container: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 20 },
    heading: { color: colors.heading, fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderColor: colors.lightGrey,
        borderRadius: 5,
        borderWidth: 1,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    modalButton: {
        borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10,
    },
    modalButtonText: { color: colors.white, fontSize: 16 },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalOverlay: {
        alignItems: 'center',
        backgroundColor: colors.modalOverlayColor,
        flex: 1,
        justifyContent: 'center',
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    nextButton: {
        marginTop: 20, // Adds space between the buttons
    },
    previousButton: {
        marginTop: 20, // Adds space between the buttons
    },
    selected: { backgroundColor: colors.selectedColor },
    specialityItem: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        borderWidth: 1,
        color: colors.backgroundColor,
        height: 40,
        justifyContent: 'center',
        marginBottom: 20,
        marginRight: 10,
        width: 130,
    },
    specialityList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
    specialityText: { color: colors.darkGrey, fontSize: 16, textAlign: 'center' },
    subheading: { color: colors.subheading, fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
});

export default SpecialityScreen;
