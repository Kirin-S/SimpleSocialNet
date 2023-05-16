import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { validateEmail } from '../../lib/lib';

interface ILoginProps {
  setErrText: any;
  setVisible: any;
}

export default function Login(props: ILoginProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsLoading(true);
    if (validateEmail(email) && pass.length > 5) {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            props.setErrText('That email is already in use');
          }

          if (err.code === 'auth/invalid-email') {
            props.setErrText('That email is invalid');
          }

          console.log(err);
          props.setVisible(true);
        })
        .finally(() => setIsLoading(false))
    } else {
      props.setVisible(true);
      props.setErrText("Input correct email and password (length is 6 at least)");
      setIsLoading(false);
    }
  }

  return (
    <View>
      <Text variant='displayMedium' style={{ textAlign: 'center', marginBottom: 10 }}>Login</Text>
      <TextInput
        label='Email'
        mode='flat'
        style={{ borderWidth: 1, marginBottom: 5 }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label='Password'
        secureTextEntry={true}
        mode='flat'
        style={{ borderWidth: 1, marginBottom: 5 }}
        value={pass}
        onChangeText={text => setPass(text)}
      />
      <Button loading={isLoading} onPress={login}>
        Login
      </Button>
    </View>
  )
}