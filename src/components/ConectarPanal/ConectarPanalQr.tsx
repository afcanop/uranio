import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { Box, Button, VStack } from 'native-base';

const ConectarPanalQr = () => {

  const [accesoCamara, setAccesoCamara] = useState<Boolean>(false);
  const camera = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPermisoCamara();
      unsubscribe();
    }, []),
  );

  const consultarPermisoCamara = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setAccesoCamara(true)
      } else {
        setAccesoCamara(false)
      }
    } catch (err) {
      console.log(err);
      
      setAccesoCamara(false)
    }
  }

  const LeerCodigo = (code:any) =>{
    const dataQr = JSON.parse(code.nativeEvent.codeStringValue);

  }


  return (
    <>
      {
        accesoCamara ? (
          <View style={{ flex: 1 }}>

          <Camera
            ref={camera}
            cameraType={CameraType.Back} // front/back(default)
            flashMode='auto'
            style={StyleSheet.absoluteFill}
            scanBarcode={true}
            onReadCode={(event:any) => LeerCodigo(event)} // optional
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
            laserColor='red' // (default red) optional, color of laser in scanner frame
            frameColor='white' // (default white) optional, color of border of scanner frame
          />

        </View>
        ) : 
        (
          <Box flex={1} padding={2}>
            <VStack space={3} mt="5">
              <Text>Veeci no tiene permiso a la cámara del dispositivo, por favor intentar solicitar permiso.</Text>
              <Button title="Solicitar permiso" onPress={requestCameraPermission} />

            </VStack>
          </Box>
        )
      }
    </>
  )
}

export default ConectarPanalQr