import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { Confirmation } from "../../Confirmation"

interface Params {
  user: {
    name: string
    email: string
    driverLicense: number
  }
}

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles'

export function SignUpSecondStep() {

  const [password, setPassword] = useState('')

  const [passwordConfirm, setPasswordConfirm] = useState('')

  const navigation = useNavigation<any>()

  const route = useRoute()

  const theme = useTheme()

  const { user } = route.params as Params

  function handleBack() {
    navigation.goBack()
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.')
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não conferem.')
    }

    navigation.navigate('Confirmation',{
      nextScreenRoute:'SignIn',
      title:"Conta Criada",
      message:`Agora é so fazer login\ne aproveitar.`
    })
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>
            Crie sua {'\n'} conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rapida e facil
          </SubTitle>
          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            color={theme.colors.success}
            title='Cadastrar'
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}