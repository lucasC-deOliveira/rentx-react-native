import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';

import * as Yup from "yup"

import {
  Container,
  Header,
  Title,
  SubTitle,
  Footer,
  Form
} from './styles'
import { useNavigation } from '@react-navigation/native';

export function SignIn() {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const navigation = useNavigation<any>()

  async function handleSignIn() {
    try {

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatorio.")
          .email("Digite um e-mail valido")
        ,

        password: Yup.string()
          .required("A senha é obrigatoria")

      })

      await schema.validate({ email, password })

      Alert.alert("tudo certo brow")
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("ops!")
      }
      else {
        Alert.alert(
          "Erro na validação",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        )
      }
    }

  }

  async function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title> Estamos{"\n"}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{"\n"}
              uma experiência incrivel.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}