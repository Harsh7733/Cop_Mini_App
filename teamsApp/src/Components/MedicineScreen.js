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

const MedicineScreen = ({navigation}) => {
    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [newMedicines, setNewMedicines] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [medicines, setMedicines] = useState([
        "Dolo",
        "Cheston - Cold",
        "Sorbitrate",
        "Azithromycin",
        "Telma - 40"
    ]);

    const handleSelectMedicines = (medicine) => {
        setSelectedMedicines((prev) =>
            prev.includes(medicine)
                ? prev.filter((item) => item !== medicine)
                : [...prev, medicine]
        );
    };

    const handleAddMedicine = () => {
        if (newMedicines.trim() && !medicines.includes(newMedicines)) {
            setMedicines((prevmedicines) => [...prevmedicines, newMedicines]); // Add the new speciality
            setNewMedicines(''); // Clear the input field
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
                <Text style={styles.heading}>Select Medicines</Text>
                <Text style={styles.subheading}>You can change it later!</Text>

                <ScrollView contentContainerStyle={styles.medicineList}>
                    {medicines.map((medicine) => (
                        <TouchableOpacity
                            key={medicine}
                            style={[
                                styles.medicineItem,
                                selectedMedicines.includes(medicine) && styles.selected,
                            ]}
                            onPress={() => handleSelectMedicines(medicine)}
                        >
                            <Text style={styles.medicineText}>{medicine}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.addText}>+ Add Medicine</Text>
                </TouchableOpacity>

                <CustomButton
                    title="Next"
                onPress={() => navigation.navigate('BrandName')}
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
                        <Text style={styles.modalTitle}>Add a New Medicine</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Medicine"
                            value={newMedicines}
                            onChangeText={setNewMedicines}
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
                                onPress={handleAddMedicine}
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

MedicineScreen.propTypes = {
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
    medicineItem: {
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
    medicineList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
    medicineText: { color: colors.darkGrey, fontSize: 16, textAlign: 'center' },

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

export default MedicineScreen;
