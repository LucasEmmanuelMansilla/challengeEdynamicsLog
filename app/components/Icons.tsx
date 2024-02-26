import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from './Icon';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text} from 'react-native-elements';

interface Props {
  isFront: boolean;
  setIsFront: Dispatch<SetStateAction<boolean>>;
  setFlash: Dispatch<SetStateAction<boolean>>;
  supportsFlash: boolean | undefined;
  flash: boolean;
  setIsSoundCapture: Dispatch<SetStateAction<boolean>>;
  isSoundCapture: boolean;
  setFPS: () => void;
  is60FPS: boolean;
}

export default function Icons({
  flash,
  is60FPS,
  isFront,
  isSoundCapture,
  supportsFlash,
  setFPS,
  setFlash,
  setIsFront,
  setIsSoundCapture,
}: Props) {
  return (
    <View style={styles.buttonsContainer}>
      <Icon
        isActive={isFront}
        type="feather"
        handle={() => setIsFront(!isFront)}
        name="refresh-cw"
      />
      <Icon
        type="font-awesome"
        isActive={flash}
        handle={() => setFlash(supportsFlash ? !flash : false)}
        name="bolt"
      />
      <Icon
        isActive={isSoundCapture}
        type="font-awesome"
        handle={() => setIsSoundCapture(!isSoundCapture)}
        name="volume-off"
      />
      <Pressable
        onPress={() => setFPS()}
        style={is60FPS ? styles.textContainerIsFPS : styles.textContainer}>
        <Text style={is60FPS ? styles.textIS60FPS : styles.text}>60 FPS</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    position: 'absolute',
    right: 10,
    top: 20,
    zIndex: 10,
    height: hp('25%'),
    padding: wp('2%'),
    width: wp('15%'),
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  textContainer: {
    backgroundColor: 'white',
    height: hp('5%'),
  },
  textContainerIsFPS: {
    backgroundColor: '#0174DF',
    height: hp('5%'),
  },
  text: {
    color: 'black',
    fontSize: hp('1.8%'),
    textAlign: 'center',
  },
  textIS60FPS: {
    color: 'white',
    fontSize: hp('2%'),
    textAlign: 'center',
  },
});
