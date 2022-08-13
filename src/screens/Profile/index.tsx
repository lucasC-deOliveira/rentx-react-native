import React from 'react';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton

} from './styles'

import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons"


export function Profile() {
  const theme = useTheme()

  const navigation = useNavigation<any>()

  function handleBack() {
    navigation.goBack()
  }
  function handleSignOut() {

  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton
            color={theme.colors.shape}
            onPress={handleBack}
          />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather
              name="power"
              size={24}
              color={theme.colors.shape}
            />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo
            source={{ uri: "https://github.com/lucasC-deOliveira.png" }}
          />
          <PhotoButton onPress={() => { }}>
            <Feather
              name='camera'
              size={24}
              color={theme.colors.shape}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}