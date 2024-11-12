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

const DiagnosisScreen = ({ navigation }) => {
    const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
    const [newDiagnosis, setNewDiagnosis] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [diagnosises, setDiagnosises] = useState([
        "Asthma",
        "Heart Condition",
        "Diabetes Mellitus",
        "Hypertension",
        "Osteoarthritis",
        "Migraine",
        "Acute Appendicitis",
        "Influenza",
        "Chronic Kidney Disease",
        "Thyroid Disorders",
    ]);

    const handleSelectDiagnosis = (diagnosis) => {
        setSelectedDiagnosis((prev) =>
            prev.includes(diagnosis)
                ? prev.filter((item) => item !== diagnosis)
                : [...prev, diagnosis]
        );
    };

    const handleAddDiagnosis = () => {
        if (newDiagnosis.trim() && !diagnosises.includes(newDiagnosis)) {
            setDiagnosises((prevDiagnosises) => [...prevDiagnosises, newDiagnosis]); // Add the new speciality
            setNewDiagnosis(''); // Clear the input field
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
                <Text style={styles.heading}>Select Diagnosis?</Text>
                <Text style={styles.subheading}>You can change it later!</Text>

                <ScrollView contentContainerStyle={styles.diagnosisList}>
                    {diagnosises.map((diagnosis) => (
                        <TouchableOpacity
                            key={diagnosis}
                            style={[
                                styles.diagnosisItem,
                                selectedDiagnosis.includes(diagnosis) && styles.selected,
                            ]}
                            onPress={() => handleSelectDiagnosis(diagnosis)}
                        >
                            <Text style={styles.diagnosisText}>{diagnosis}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.addText}>+ Add Diagnosis</Text>
                </TouchableOpacity>

                <CustomButton
                    title="Next"
                onPress={() => navigation.navigate('Medicine')}
                />
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
                        <Text style={styles.modalTitle}>Add a New Diagnosis</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Diagnosis"
                            value={newDiagnosis}
                            onChangeText={setNewDiagnosis}
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
                                onPress={handleAddDiagnosis}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

DiagnosisScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: colors.addButton,
        borderRadius: 5,
        color: colors.addButton,
        marginTop: 20,
        padding: 10,
    },
    addText: { color: colors.addText },
    cancelButton: { backgroundColor: colors.lightGrey },
    container: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 20 },
    diagnosisItem: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        borderWidth: 1,
        color: colors.backgroundColor,
        height: 50,
        justifyContent: 'center',
        marginBottom: 20,
        marginRight: 10,
        width: 137,
    },
    diagnosisList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },

    diagnosisText: { color: colors.darkGrey, fontSize: 16, textAlign: 'center' },

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
    saveButton: { backgroundColor: colors.addButton },
    selected: { backgroundColor: colors.selectedColor },
    subheading: { color: colors.subheading, fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
});

export default DiagnosisScreen;
