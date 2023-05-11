import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

interface ISignUpProps {
  setErrText: any;
  setVisible: any;
}


const SignUp = (props: ISignUpProps) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(email: string): boolean {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
  }

  const login = () => {
    setIsLoading(true);
    if (validateEmail(email) && pass.length > 5 && repeatPass.length > 5 && pass === repeatPass) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          console.log('User signed and logged in!');
        })
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
      <Text variant='displayMedium' style={{ textAlign: 'center', marginBottom: 10 }}>SignUp</Text>
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
      <TextInput
        label='Repeat password'
        secureTextEntry={true}
        mode='flat'
        style={{ borderWidth: 1, marginBottom: 5 }}
        value={repeatPass}
        onChangeText={text => setRepeatPass(text)}
      />
      <Button loading={isLoading} onPress={login}>
        Sign Up
      </Button>
    </View>
  )
}

export default SignUp