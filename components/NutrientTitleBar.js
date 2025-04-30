import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NutrientTitleBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.left} onPress={() => navigation.navigate('Carbohydrate')}>
        <Text style={styles.text}>Carbohydrate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Protein')}>
        <Text style={styles.text}>Protein</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.right} onPress={() => navigation.navigate('Fat')}>
        <Text style={styles.text}>Fat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1fb28a',
  },
}); 