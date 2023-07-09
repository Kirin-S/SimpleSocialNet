import { View, Text } from 'react-native';
import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import ErrorDialog from './ErrorDialog';

const Auth = () => {
  const [visible, setVisible] = useState(false);
  const [errText, setErrText] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <View style={{ height: '100%', padding: 10, justifyContent: 'center' }}>
        {
          hasAccount
            ? <Login setErrText={setErrText} setVisible={setVisible} />
            : <SignUp setErrText={setErrText} setVisible={setVisible} />
        }
        <Text
          onPress={() => setHasAccount(prev => !prev)}
          style={{ marginTop: 20, fontSize: 14, textDecorationLine: 'underline', textAlign: 'center' }}
        >
          {
            hasAccount
              ? "Don't have an account? Sign up"
              : "Return to sign in"
          }
        </Text>
      </View>

      <ErrorDialog
        errText={errText}
        visible={visible}
        hideDialog={hideDialog}
      />
    </View>

  )
}

export default Auth