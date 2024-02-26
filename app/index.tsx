import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icons from './components/Icons';
import CameraComponent from './components/CameraComponent';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import CarouselComponent from './components/CarouselComponent';
import RNFS from 'react-native-fs';
import ButtonTakePhoto from './components/ButtonTakePhoto';

export default function App() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [is60FPS, setIs60FPS] = useState<boolean>(false);
  const [isFront, setIsFront] = useState<boolean>(false);
  const [flash, setFlash] = useState(false);
  const [isSoundCapture, setIsSoundCapture] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Array<{uri: string}>>([]);

  const device = useCameraDevice(isFront ? 'front' : 'back');
  const camera = useRef<Camera>(null);
  const supportsFlash = device?.hasFlash;
  const format = useCameraFormat(device, [
    {videoAspectRatio: 16 / 9},
    {videoResolution: {width: 3048, height: 2160}},
  ]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  const handlePhotos = async () => {
    try {
      const res = await camera.current?.takePhoto({
        flash: flash ? 'on' : 'off',
      });
      const data = await RNFS.readFile(res ? res?.path : '', 'base64');
      setPhotos([...photos, {uri: res ? data : ''}]);
    } catch (error) {
      console.log('errorr al sacar la: ', error);
    }
  };

  let fps;
  const setFPS = () => {
    if (format) {
      if (format.maxFps >= 60) {
        setIs60FPS(true);
        fps = 60;
      } else {
        setIs60FPS(false);
        fps = format.maxFps;
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraComponent
        flash={flash}
        fps={fps}
        device={device}
        camera={camera}
        isFront={isFront}
        isSoundCapture={isSoundCapture}
      />
      <Icons
        supportsFlash={supportsFlash}
        flash={flash}
        is60FPS={is60FPS}
        isFront={isFront}
        isSoundCapture={isSoundCapture}
        setFPS={setFPS}
        setFlash={setFlash}
        setIsFront={setIsFront}
        setIsSoundCapture={setIsSoundCapture}
      />
      <ButtonTakePhoto handlePhotos={handlePhotos} />
      <CarouselComponent photos={photos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
