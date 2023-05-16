import { View, StyleSheet } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

const Settings = () => {

  const logout = (): void => {
    auth()
      .signOut()
      .catch(err => console.log(err))
  }

  return (
    <View>
      <Button style={styles.logoutButton} onPress={logout}>Logout</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  logoutButton: {

  }
})

export default Settings