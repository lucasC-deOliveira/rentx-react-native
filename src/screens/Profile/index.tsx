import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from "expo-image-picker"
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert

} from "react-native"
import * as Yup from "yup"

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
import { Button } from '../../components/Button';



export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit")

  const { user, signOut, updatedUser } = useAuth()

  const [avatar, setAvatar] = useState(user.avatar);

  const [name, setName] = useState(user.name);

  const [driverLicense, setDriverLicense] = useState(user.name)

  const theme = useTheme()

  const navigation = useNavigation<any>()

  function handleBack() {
    navigation.goBack()
  }


  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected)
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (result.cancelled) {
      return;
    }
    const { uri } = result as ImageInfo
    if (uri) {
      setAvatar(uri)
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required("CNH é obrigatória"),
        name: Yup.string()
          .required("Nome é obrigatório")
      })

      const data = { name, driverLicense };

      await schema.validate(data)

      await updatedUser({
        id: user.id,
        user_id: user.id,
        email: user.email,
        name,
        drive_license: driverLicense,
        avatar,
        token: user.token
      })

      Alert.alert("Perfil atualizado!")
    }
    catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)
      }
      else {
        Alert.alert('Não foi possivel atualizar o perfil')
      }
    }
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
              <LogoutButton onPress={signOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer >
              {!!avatar && <Photo
                source={{ uri: avatar }}
              />}
              <PhotoButton onPress={handleAvatarSelect}>
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
                    onChangeText={setName}
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
                    onChangeText={setDriverLicense}
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
            <Button
              title='Salvar alterações'
              onPress={handleProfileUpdate}
            />
          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}