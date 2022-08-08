import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from "@expo/vector-icons"
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  IconContainer,
  InputText,
} from './styles'

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"]
}

export function PasswordInput({ iconName, ...rest }: InputProps) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(true)

  function handlePasswordVisibilityChange(){
    setIsPasswordVisible(prevState => !prevState)
  }

  const theme = useTheme()

  return (
    <Container >
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
      secureTextEntry={isPasswordVisible}
      {...rest} 
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather
            name={ isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton >

    </Container>
  );
}