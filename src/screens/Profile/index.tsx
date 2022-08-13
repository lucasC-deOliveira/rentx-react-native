import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons"

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  ContentHeader,
  Option,
  OptionTitle,

} from './styles'



export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit")

  const theme = useTheme()

  const navigation = useNavigation<any>()

  function handleBack() {
    navigation.goBack()
  }
  function handleSignOut() {

  }

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected)
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

      <Content>
        <ContentHeader>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange("dataEdit")}
          >
            <OptionTitle active={option === 'dataEdit'}>
              Dados
            </OptionTitle>
          </Option>
          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange("passwordEdit")}
          >
            <OptionTitle active={option === 'passwordEdit'}>
              Trocar Senha
            </OptionTitle>
          </Option>
        </ContentHeader>
      </Content>

    </Container>
  );
}