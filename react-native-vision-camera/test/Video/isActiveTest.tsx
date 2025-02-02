import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {TestSuite, TestCase, Tester} from '@rnoh/testerino';

export function isActiveTest() {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef<Camera>(null);
  const format = useCameraFormat(device, [
    {videoResolution: {width: 1920, height: 1080}},
    {fps: 30},
  ]);

  if (!device) {
    return <Text>No Devices</Text>;
  }

  if (!hasPermission) {
    requestPermission();
  }

  const [audio, setAudio] = useState(true);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [isActive, setIsActive] = useState(true);
  const [videoCodec, setVideoCodec] = useState<'h265' | 'h264'>('h265');
  const [videoHdr, setVideoHdr] = useState(false);

  const changeIsActive = () => {
    setIsActive(v => !v);
  };

  return (
    <Tester>
      <TestSuite name="isActive">
        <TestCase itShould={`当前状态:${isActive ? '启用' : '禁用'}`}>
          <Camera
            style={style.cameraPreview}
            ref={camera}
            isActive={isActive}
            preview
            device={device}
            video={true}
            audio={audio}
            videoHdr={videoHdr}
            fps={30}
            format={format}
          />
          <View style={style.actionBtn}>
            <Button
              title={`isActive:${isActive}`}
              onPress={changeIsActive}></Button>
          </View>
        </TestCase>
      </TestSuite>
    </Tester>
  );
}

const style = StyleSheet.create({
  cameraPreview: {width: '100%', aspectRatio: 56 / 100},
  actionBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    gap: 5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
});
