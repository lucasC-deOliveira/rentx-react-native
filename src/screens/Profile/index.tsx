import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard

} from "react-native"


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
  Section
} from './styles'
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';



export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit")

  const { user } = useAuth()

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
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
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
            {
              option === 'dataEdit' ?
                <Section>
                  <Input
                    iconName='user'
                    placeholder='Nome'
                    autoCorrect={false}
                    defaultValue={user.name}
                  />
                  <Input
                    iconName='mail'
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName='credit-card'
                    placeholder='CNH'
                    keyboardType='numeric'
                    defaultValue={user.drive_license}
                  />
                </Section>
                :
                <Section>
                  <PasswordInput
                    iconName='lock'
                    placeholder='Senha atual'
                  />
                  <PasswordInput
                    iconName='lock'
                    placeholder='Nova senha'

                  />
                  <PasswordInput
                    iconName='lock'
                    placeholder='Repetir senha'

                  />
                </Section>}
          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}