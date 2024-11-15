import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import diagnosisData from './medicinesForDiagnosis.json';

const colors = {
    borderColor: '#ccc',
    subheading: '#55a630',
    fixedDomain: 'blue',
    text: 'black',
    selectedColor: '#9ef01a',
    white: '#fff',
    lightGrey: '#ccc',
    darkGrey: '#333',
    grey: 'rgba(0, 0, 0, 0.5)'
};

const DiagnosisScreen = ({ navigation }) => {
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [isDiagnosisVisible, setIsDiagnosisVisible] = useState(false);
    const [isMedicinesVisible, setIsMedicinesVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [diagnosisHistory, setDiagnosisHistory] = useState([]);
    const [newDiagnosis, setNewDiagnosis] = useState('');

    const handleSelectDiagnosis = (diagnosis) => {
        setSelectedDiagnosis(diagnosis);
        setSelectedMedicines([]); // Reset medicines when a new diagnosis is selected
        setIsMedicinesVisible(false); // Close medicines list when new diagnosis is selected
    };

    const handleToggleMedicine = (medicine) => {
        setSelectedMedicines((prev) => {
            if (prev.includes(medicine)) {
                return prev.filter(item => item !== medicine);
            } else {
                return [...prev, medicine];
            }
        });
    };

    const handleAddDiagnosis = () => {
        if (newDiagnosis && !diagnosisHistory.includes(newDiagnosis)) {
            setDiagnosisHistory(prev => [...prev, newDiagnosis]);
            setNewDiagnosis('');
            setIsModalVisible(false);
        }
    };

    const handleDone = () => {
        navigation.navigate('Diagnosis'); // Finalize the selection
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select Diagnosis and Medicines</Text>
            <Text style={styles.subheading}>Pick a diagnosis and select the medicines you want.</Text>

            {/* Diagnosis Selection with Dropdown Toggle */}
            <TouchableOpacity onPress={() => setIsDiagnosisVisible(!isDiagnosisVisible)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>Select Diagnosis</Text>
            </TouchableOpacity>

            {isDiagnosisVisible && (
                <View style={styles.dropdownList}>
                    {diagnosisData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.diagnosisItem, selectedDiagnosis?.diagnosis === item.diagnosis && styles.selected]}
                            onPress={() => handleSelectDiagnosis(item)}
                        >
                            <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Medicines List for Selected Diagnosis with Toggle */}
            {selectedDiagnosis && (
                <View style={styles.medicinesContainer}>
                    <TouchableOpacity onPress={() => setIsMedicinesVisible(!isMedicinesVisible)} style={styles.dropdownButton}>
                        <Text style={styles.dropdownButtonText}>Select Medicines</Text>
                    </TouchableOpacity>

                    {isMedicinesVisible && (
                        <View style={styles.dropdownList}>
                            {selectedDiagnosis.medicines.map((medicine, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.medicineItem, selectedMedicines.includes(medicine) && styles.selected]}
                                    onPress={() => handleToggleMedicine(medicine)}
                                >
                                    <Text style={styles.medicineText}>{medicine}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            )}

            {/* Add New Diagnosis Modal */}
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addDiagnosisButton}>
                <Text style={styles.addDiagnosisText}>+ Add New Diagnosis</Text>
            </TouchableOpacity>

            {/* Modal for Adding Diagnosis */}
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
                            placeholder="Enter new diagnosis"
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

            {/* Done Button */}
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

DiagnosisScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    addDiagnosisButton: {
        backgroundColor: colors.fixedDomain,
        borderRadius: 5,
        marginTop: 20,
        padding: 10
    },
    addDiagnosisText: {
        color: colors.white,
        fontSize: 16
    },
    container: { 
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'center', 
        padding: 20 
    },
    diagnosisItem: { 
        backgroundColor: colors.white, 
        borderRadius: 5, 
        marginVertical: 5, 
        padding: 10 
    },
    diagnosisText: { 
        fontSize: 16 
    },
    doneButton: { 
        backgroundColor: colors.fixedDomain, 
        borderRadius: 5, 
        marginTop: 30, 
        padding: 15, 
    },
    doneButtonText: { 
        color: colors.white, 
        fontSize: 16 
    },
    dropdownButton: {
        alignItems: 'center',
        backgroundColor: colors.fixedDomain,
        borderRadius: 5,
        marginTop: 20,
        padding: 10,
        width: '100%',
    },
    dropdownButtonText: {
        color: colors.white, 
        fontSize: 16,
    },
    dropdownList: {
        marginTop: 10,
        width: '100%',
    },
    heading: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    input: { 
        borderColor: colors.borderColor, 
        borderWidth: 1, 
        marginBottom: 20, 
        padding: 10, 
    },
    medicineItem: { 
        backgroundColor: colors.white, 
        borderRadius: 5, 
        marginVertical: 5, 
        padding: 10 
    },
    medicineText: { 
        fontSize: 16 
    },
    medicinesContainer: { 
        marginTop: 20, 
        width: '100%' 
    },
    modalButton: { 
        borderRadius: 5, 
        flex: 1, 
        marginHorizontal: 5, 
        padding: 10 
    },
    modalButtonText: { 
        color: colors.white, 
        fontSize: 16 
    },
    modalButtons: { 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    modalContainer: { 
        backgroundColor: colors.white, 
        borderRadius: 10, 
        padding: 20, 
        width: '80%' 
    },
    modalOverlay: { 
        alignItems: 'center', 
        backgroundColor: colors.grey, 
        flex: 1, 
        justifyContent: 'center' 
    },
    modalTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 15 
    },
    saveButton: { 
        backgroundColor: colors.fixedDomain 
    },
    selected: { 
        backgroundColor: colors.selectedColor 
    },
    subheading: { 
        color: colors.subheading, 
        fontSize: 16, 
        marginBottom: 20 
    },

});

export default DiagnosisScreen;
