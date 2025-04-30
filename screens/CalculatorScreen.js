import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput, Animated } from 'react-native';
import carbohydrateFoods from '../data/dataCarbohydrate';
import proteinFoods from '../data/dataProtein';
import fatFoods from '../data/dataFat';

const foodTypes = [
  { label: 'Carbohydrate', data: carbohydrateFoods },
  { label: 'Protein', data: proteinFoods },
  { label: 'Fat', data: fatFoods },
];

export default function CalculatorScreen() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentType, setCurrentType] = useState(foodTypes[0]);
  const [servingInput, setServingInput] = useState('');
  const [foodToAdd, setFoodToAdd] = useState(null);

  // Animation state
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const boxFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (modalVisible) {
      scaleAnim.setValue(0.5);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          bounciness: 18,
          speed: 12,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.5);
      opacityAnim.setValue(0);
    }
  }, [modalVisible]);

  // ผลรวม
  const total = selectedFoods.reduce(
    (acc, item) => {
      acc.carbohydrate += item.food.carbohydrate * item.serving;
      acc.protein += item.food.protein * item.serving;
      acc.fat += item.food.fat * item.serving;
      acc.energy += item.food.energy * item.serving;
      return acc;
    },
    { carbohydrate: 0, protein: 0, fat: 0, energy: 0 }
  );

  // เพิ่มอาหาร
  const handleAddFood = () => {
    if (foodToAdd && servingInput && !isNaN(servingInput)) {
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(boxFadeAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setSelectedFoods([
          ...selectedFoods,
          { food: foodToAdd, serving: parseFloat(servingInput), key: Date.now().toString() },
        ]);
        setModalVisible(false);
        setServingInput('');
        setFoodToAdd(null);
        headerOpacity.setValue(1); // reset สำหรับรอบถัดไป
        boxFadeAnim.setValue(1);   // reset สำหรับรอบถัดไป
      });
    }
  };

  // ลบอาหาร
  const handleRemoveFood = key => {
    setSelectedFoods(selectedFoods.filter(item => item.key !== key));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nutrition Calculator</Text>
      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addBtnText}>+ Add more foods</Text>
      </TouchableOpacity>

      {/* รายการอาหารที่เลือก */}
      <FlatList
        data={selectedFoods}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.selectedRow}>
            <Text style={styles.selectedName}>{item.food.name} ({item.serving} serving)</Text>
            <Text style={styles.selectedNutrient}>
              C:{(item.food.carbohydrate * item.serving).toFixed(1)}g
              P:{(item.food.protein * item.serving).toFixed(1)}g
              F:{(item.food.fat * item.serving).toFixed(1)}g
              E:{(item.food.energy * item.serving).toFixed(1)}kcal
            </Text>
            <TouchableOpacity onPress={() => handleRemoveFood(item.key)}>
              <Text style={styles.removeBtn}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888' }}>There is none. Add one!</Text>}
      />

      {/* ผลรวม */}
      <View style={styles.resultBox}>
        <Text style={styles.resultHeader}>Total</Text>
        <Text style={styles.resultText}>
          Carbohydrate: {total.carbohydrate.toFixed(1)} g{"\n"}
          Protein: {total.protein.toFixed(1)} g{"\n"}
          Fat: {total.fat.toFixed(1)} g{"\n"}
          Energy: {total.energy.toFixed(1)} kcal
        </Text>
      </View>

      {/* Modal เลือกอาหาร */}
      <Modal visible={modalVisible} animationType="none" transparent>
        <View style={styles.modalBg}>
          <Animated.View
            style={[
              styles.modalBox,
              {
                transform: [{ scale: scaleAnim }],
                opacity: boxFadeAnim,
              },
            ]}
          >
            <Animated.Text style={[styles.modalHeader, { opacity: headerOpacity }]}>Category</Animated.Text>
            <View style={styles.typeRow}>
              {foodTypes.map(type => (
                <TouchableOpacity
                  key={type.label}
                  style={[
                    styles.typeBtn,
                    currentType.label === type.label && styles.typeBtnActive,
                  ]}
                  onPress={() => {
                    setCurrentType(type);
                    setFoodToAdd(null);
                  }}
                >
                  <Text style={styles.typeBtnText}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <FlatList
              data={currentType.data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.foodOption,
                    foodToAdd && foodToAdd.id === item.id && styles.foodOptionActive,
                  ]}
                  onPress={() => setFoodToAdd(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 120 }}
            />
            <TextInput
              style={styles.input}
              placeholder="serving(*100g)"
              keyboardType="numeric"
              value={servingInput}
              onChangeText={setServingInput}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#1fb28a' }]}
                onPress={handleAddFood}
                disabled={!foodToAdd || !servingInput}
              >
                <Text style={{ color: '#fff' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  addBtn: { backgroundColor: '#1fb28a', padding: 10, borderRadius: 8, marginBottom: 16, alignSelf: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  selectedRow: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10, marginBottom: 10 },
  selectedName: { fontWeight: 'bold', fontSize: 16 },
  selectedNutrient: { fontSize: 14, color: '#555', marginTop: 4 },
  removeBtn: { color: 'red', marginTop: 4 },
  resultBox: { marginTop: 24, padding: 16, backgroundColor: '#e0f7ef', borderRadius: 8 },
  resultHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  resultText: { fontSize: 16 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '85%' },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  typeRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  typeBtn: { padding: 8, borderRadius: 6, backgroundColor: '#eee', marginHorizontal: 4 },
  typeBtnActive: { backgroundColor: '#1fb28a' },
  typeBtnText: { color: '#222', fontWeight: 'bold' },
  foodOption: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
  foodOptionActive: { backgroundColor: '#b9e4c9' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, width: '100%', padding: 8, marginTop: 8, marginBottom: 12 },
  modalBtn: { padding: 10, borderRadius: 8, backgroundColor: '#eee', marginTop: 8, minWidth: 80, alignItems: 'center' },
}); 