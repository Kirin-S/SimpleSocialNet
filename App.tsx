import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native';
import Auth from './components/Auth/Auth';
import { BottomNavigation } from 'react-native-paper';
import Profile from './components/Profile/Profile';
import Icons from './UI/Icons/Icons';
import News from './components/News/News';
import Settings from './components/SettingsScene/Settings';


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [userNick, setUserNick] = useState('');

  const routes = [
    { key: 'news', title: 'News', focusedIcon: () => <Icons icon='news' />, unfocusedIcon: () => <Icons icon='newsOutlined' /> },
    { key: 'favorites', title: 'Favorites', focusedIcon: () => <Icons icon='favorites' />, unfocusedIcon: () => <Icons icon='favoritesOutlined' /> },
    { key: 'profile', title: 'Profile', focusedIcon: () => <Icons icon='user' />, unfocusedIcon: () => <Icons icon='userOutlined' /> },
    { key: 'settings', title: 'Settings', focusedIcon: () => <Icons icon='settings' />, unfocusedIcon: () => <Icons icon='settingsOutlined' /> },
  ];

  const renderScene = BottomNavigation.SceneMap({
    news: () => <News />,
    favorites: () => <Text>Favorites</Text>,
    profile: () => <Profile nickname={userNick} setUserNick={setUserNick} />,
    settings: () => <Settings />
  });

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // Unsubscribe on unmount
  }, []);

  const getUserInfo = async () => {
    await firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .get()
      .then(res => {
        const data = res.data();
        if (data?.nickname) {
          setUserNick(data.nickname);
        }
      });
  }

  // For nickname
  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 500)
  }, [])

  if (initializing) return null;

  if (!user) {
    return (
      <Auth />
    );
  }

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export default App;
