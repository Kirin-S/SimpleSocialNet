import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { FC, useState } from 'react';
import { Button, TextInput, IconButton } from 'react-native-paper';
import Icons from '../../UI/Icons/Icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface IProfile {
  userData?: any;
  imageUri?: string;
  setUserData: any;
}

const Profile: FC<IProfile> = ({ userData, imageUri, setUserData }) => {
  const [nick, setNick] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const onSaveNick = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .set({
        nickname: nick
      })
      .then(() => {
        firestore()
          .collection('Users')
          .doc(auth().currentUser?.uid)
          .get()
          .then(res => {
            const data = res.data();
            if (data?.nickname) {
              setUserData(data);
              setIsEdit(false);
            }
          });
      })
  }

  return (
    <View style={styles.profile}>
      <Image
        source={{ uri: 'https://sun1-89.userapi.com/impg/6wPYBJjPt08CMSvUd3-3DzKJ7ckK9aiZNR-jtw/rgE4dlP2iEU.jpg?size=888x706&quality=96&sign=582cc6c8e25f75716be1159fca8be032&type=album' }}
        alt='Image Error'
        style={styles.profileImg}
      />
      <Button onPress={() => console.log('ban')}>Change Profile Image</Button>
      {
        userData.nickname && !isEdit
          ? <View style={styles.nicknameBox}>
              <Text style={styles.nickname}>{userData.nickname}</Text>
              <IconButton style={styles.editNick} onPress={() => setIsEdit(true)} icon={() => <Icons icon='editOutlined' />} />
            </View>
          : <View style={styles.changeNickView}>
              <TextInput style={styles.nickInput} label='Set nickname' value={nick} onChangeText={text => setNick(text)} />
              <Button onPress={onSaveNick}>Save</Button>
            </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    padding: 10,
    alignItems: 'center'
  },
  profileImg: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height / 2),
  },
  nickname: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  nicknameBox: {
    marginTop: 50,
    flexDirection: 'row'
  },
  editNick: {
    marginTop: 0
  },
  changeNickView: {
    width: '95%'
  },
  nickInput: {
    marginTop: 80,
  }
})

export default Profile