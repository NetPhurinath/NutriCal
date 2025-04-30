import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

const carouselData = [
  { id: '1', image: require('../assets/food_pictures/healthyfood.jpg'), text: 'Happy without guilty from "Sausage Traybake"' },
  { id: '2', image: require('../assets/food_pictures/fastfood.jpg'), text: 'Your homemade pizza is ready to served!' },
  { id: '3', image: require('../assets/food_pictures/luxuryfood.jpg'), text: 'Fancy on Baked Stuffed Lobster?' },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.invite}>Start your lively day with NutriCal!</Text>
      <Text style={styles.text}>"No need to be a healthy person"</Text>
      <Text style={styles.text}>"No strict diet"</Text>
      <Text style={styles.endtext}>Just enjoy your eating❤️</Text>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {carouselData.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image source={item.image} style={styles.carouselImage} />
              <Text style={styles.carouselText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotsContainer}>
          {carouselData.map((_, idx) => (
            <View key={idx} style={[styles.dot, activeIndex === idx && styles.activeDot]} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'left', backgroundColor: '#fff' },
  invite: { fontSize: 20, fontWeight: 'bold', color: '#1fb28a', marginTop: 40, marginBottom: 16, marginLeft: 20, textAlign: 'left' },
  text: { fontSize: 16, marginBottom: 10, marginLeft: 30 },
  endtext: { fontSize: 25, marginBottom: 10, marginLeft: 30 },
  carouselContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', width: width },
  slide: { width: width, alignItems: 'center', justifyContent: 'center' },
  carouselImage: { width: width * 0.7, height: 300, borderRadius: 16, marginBottom: 10, resizeMode: 'cover' },
  carouselText: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 8 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 4, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', margin: 8 },
  activeDot: { backgroundColor: '#1fb28a' },
}); 