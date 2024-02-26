import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Icon as IconRNE} from 'react-native-elements';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface Props {
  name: string;
  handle: () => void;
  type: string;
  isActive: boolean;
}

export default function Icon({name, handle, type, isActive}: Props) {
  return (
    <Pressable
      style={isActive ? styles.containerIsActive : styles.container}
      onPress={() => handle()}>
      <IconRNE
        name={name}
        size={30}
        type={type}
        color={isActive ? 'white' : 'black'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: hp('5%'),
    justifyContent: 'center',
    borderRadius: 4,
  },
  containerIsActive: {
    backgroundColor: '#0174DF',
    height: hp('5%'),
    justifyContent: 'center',
    borderRadius: 4,
  },
});
