import colores from 'assets/theme/colores';
import {
  AspectRatio,
  Avatar,
  Box,
  HStack,
  Image,
  Stack,
  Text,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Index = () => {
  const [megusta, setMegusta] = useState<boolean>(false);

  return (
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1">
      <Box>
        <HStack
          p={2}
          justifyContent={'space-between'}
          alignItems={'center'}
          justifyItems={'center'}>
          <HStack space={2} alignItems={'center'}>
            <Avatar
              bg="cyan.500"
              alignSelf="center"
              size="md"
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}>
              HS
            </Avatar>
            <Text>nombre</Text>
          </HStack>

          <TouchableOpacity>
            <Ionicons
              name={'ellipsis-vertical'}
              size={32}
              color={colores.primary}
            />
          </TouchableOpacity>
        </HStack>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Stack p="2" space={3}>
        <HStack space={2}>
          <TouchableOpacity onPress={() => setMegusta(!megusta)}>
            <Ionicons
              name={megusta ? 'heart' : 'heart-outline'}
              size={25}
              color={megusta ? colores.rojo['500'] : colores.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={'chatbox-outline'}
              size={25}
              color={colores.primary}
            />
          </TouchableOpacity>
        </HStack>
        <Text fontWeight="400">
          Bengaluru (also called Bangalore) is the center of India's high-tech
          industry. The city is also known for its parks and nightlife.
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              6 mins ago
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Index;
