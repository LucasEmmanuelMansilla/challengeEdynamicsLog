import React, {LegacyRef} from 'react';
import {StyleSheet} from 'react-native';
import {Camera, useCameraFormat} from 'react-native-vision-camera';

interface Props {
  isFront: boolean;
  flash: boolean;
  isSoundCapture: boolean;
  fps: number | undefined;
  camera: LegacyRef<Camera>;
  device: any;
}

export default function CameraComponent({
  flash,
  isSoundCapture,
  fps,
  device,
  camera,
}: Props) {
  const supportsFlash = device?.hasFlash;
  const format = useCameraFormat(device, [
    {videoAspectRatio: 16 / 9},
    {videoResolution: {width: 3048, height: 2160}},
  ]);
  return (
    <Camera
      format={format}
      style={StyleSheet.absoluteFill}
      /*@ts-ignore*/
      flash={supportsFlash ? flash : 'off'}
      /*@ts-ignore*/
      device={device}
      isActive={true}
      playSoundOnCapture={isSoundCapture}
      fps={fps}
      ref={camera}
      photo={true}
    />
  );
}
