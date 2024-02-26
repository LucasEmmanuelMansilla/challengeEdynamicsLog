/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

interface Props {
  photos: Array<{uri: string}>;
}

const CarouselComponent = ({photos}: Props) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleImagePress = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  return (
    <View style={styles.container}>
      {photos.map((item, index) => {
        const zIndex = photos.length - (index + selectedPhotoIndex);
        return (
          <Animated.View
            key={index}
            style={[
              {
                transform: [
                  {rotate: `${10 * index}deg`},
                  {translateY: index * -8},
                ],
                zIndex,
                position: 'absolute',
                top: 0,
                left: 6 * index + 1,
                overflow: index > 2 ? 'hidden' : 'visible',
              },
            ]}>
            <TouchableOpacity
              style={[styles.background]}
              onPress={() => handleImagePress(selectedPhotoIndex + index)}>
              <Image
                style={styles.image}
                source={{uri: `data:image/jpeg;base64,${item.uri}`}}
              />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
      {photos.length > 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{photos.length}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    zIndex: 9999
  },
  image: {
    width: 45,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  background: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    zIndex: 100
  },
  text: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'white',
    width: 30,
    textAlign: 'center',
    borderRadius: 100,
    height: 30,
    textAlignVertical: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    zIndex: 9999,
  },
});

export default CarouselComponent;
