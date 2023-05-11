import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Button } from 'react-native';
import Auth from './components/Auth/Auth';


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out"))
  }

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Auth />
    );
  }

  return (
    <View>
      <Text>{user.email}</Text>
      <Button title='Logout' onPress={logout}></Button>
    </View>
  );
}

export default App;
