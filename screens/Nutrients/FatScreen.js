import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import fatFoods from '../../data/dataFat';

export default function FatScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={fatFoods}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Image source={item.image} style={styles.foodImage} />
            <Text style={styles.foodName}> {item.name} 100 g</Text>
            <Text>Carbohydrate: {item.carbohydrate} g</Text>
            <Text>Protein: {item.protein} g</Text>
            <Text>Fat: {item.fat} g</Text>
            <Text>Energy: {item.energy} kcal</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 16 },
  foodItem: { marginBottom: 16, padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8, alignItems: 'center' },
  foodName: { fontWeight: 'bold', fontSize: 18, marginTop: 8 },
  foodImage: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
});