import { View, Text } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

const Profile = () => {

  const logout = (): void => {
    auth()
      .signOut()
      .catch(err => console.log(err))
  }

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  )
}

export default Profile