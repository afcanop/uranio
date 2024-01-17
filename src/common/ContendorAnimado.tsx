import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';

interface ContenedorAnimadoProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const ContenedorAnimado: React.FC<ContenedorAnimadoProps> = ({
  children,
  delay = 100,
  duration = 1000,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(duration).springify()}>
      {children}
    </Animated.View>
  );
};

export default ContenedorAnimado;
