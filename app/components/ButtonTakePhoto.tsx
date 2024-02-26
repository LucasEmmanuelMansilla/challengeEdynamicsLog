import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface Props {
  handlePhotos: () => void;
}

export default function ButtonTakePhoto({handlePhotos}: Props) {
  return (
    <View style={styles.conntainer}>
      <TouchableOpacity onPress={handlePhotos} style={styles.externalButton}>
        <TouchableOpacity
          onPress={handlePhotos}
          style={styles.internalButton}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: wp('7%'),
  },
  externalButton: {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1%'),
  },
  internalButton: {
    backgroundColor: 'white',
    width: wp('26%'),
    height: hp('13%'),
    borderRadius: wp('15%'),
  },
});
