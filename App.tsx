import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Auth from './components/Auth/Auth';
import { BottomNavigation } from 'react-native-paper';
import Profile from './components/Profile/Profile';
import Icons from './UI/Icons/Icons';
import News from './components/News/News';
import Settings from './components/SettingsScene/Settings';
import { NavigationContainer } from '@react-navigation/native';
import People from './components/People/People';


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [userData, setUserData] = useState({});
  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);

  const routes = [
    { key: 'news', title: 'News', focusedIcon: () => <Icons icon='news' />, unfocusedIcon: () => <Icons icon='newsOutlined' /> },
    { key: 'people', title: 'People', focusedIcon: () => <Icons icon='people' />, unfocusedIcon: () => <Icons icon='peopleOutlined' /> },
    { key: 'profile', title: 'Profile', focusedIcon: () => <Icons icon='user' />, unfocusedIcon: () => <Icons icon='userOutlined' /> },
    { key: 'settings', title: 'Settings', focusedIcon: () => <Icons icon='settings' />, unfocusedIcon: () => <Icons icon='settingsOutlined' /> },
  ];

  const renderScene = BottomNavigation.SceneMap({
    news: () => <News userData={userData} />,
    people: () => <People userData={userData} setIsUserInfoChanged={setIsUserInfoChanged} />,
    profile: () => <Profile userData={userData} setUserData={setUserData} />,
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

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .get()
      .then(res => {
        const data = res.data();
        if (data?.nickname) {
          setUserData(data);
        }
      });
  }, [user, isUserInfoChanged])

  if (initializing) return null;

  if (!user) {
    return (
      <Auth />
    );
  }

  return (
    <NavigationContainer>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </NavigationContainer>
  );
}

export default App;
