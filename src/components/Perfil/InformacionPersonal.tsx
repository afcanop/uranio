import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Button, Center, FormControl, HStack, Heading, Input, Link, Text, VStack } from 'native-base';

const InformacionPersonal = () => {
  return (
      <Box flex={1} padding={2}>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Celular</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2">
            Confirmar
          </Button>
        </VStack>
      </Box>
  )
}

export default InformacionPersonal

const styles = StyleSheet.create({})