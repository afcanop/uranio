import {Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Menu, Pressable} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';

const Index = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Menu
          // eslint-disable-next-line react/no-unstable-nested-components
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                shouldOverlapWithTrigger={'Bottom Left'}
                {...triggerProps}>
                <Ionicons name="add-outline" size={25} color={colores.blanco} />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={() => navigation.navigate('OfertaNuevo')}>
            <Ionicons name="add" size={20} color={colores.gris} />
            Nuevo
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('OfertaChat')}>
            <Ionicons
              name="chatbubbles-outline"
              size={20}
              color={colores.gris}
            />
            Mis chats
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('OfertaAnuncios')}>
            <Ionicons name="easel-outline" size={20} color={colores.gris} />
            Mis anuncionos
          </Menu.Item>
        </Menu>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default Index;
