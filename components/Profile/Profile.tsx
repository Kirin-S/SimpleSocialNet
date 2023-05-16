import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { FC, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

interface IProfile {
  nickname?: string;
  imageUri?: string;
}

const Profile: FC<IProfile> = ({ nickname, imageUri }) => {
  const [nick, setNick] = useState('');

  const onSaveNick = () => {
    // Server saving...

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
        nickname
          ? <Text style={styles.nickname}>{nickname}</Text>
          : <View style={styles.changeNickView}>
              <TextInput style={styles.nickInput} label='Set nickname' value={nick} onChangeText={text => setNick(text)} />
              <Button onPress={onSaveNick}>Save</Button>
            </View>
      }
      

      {/* <Button onPress={logout}>Logout</Button> */}
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
    marginTop: 80,
    fontSize: 30,
    fontWeight: 'bold'
  },
  changeNickView: {
    width: '95%'
  },
  nickInput: {
    marginTop: 80,
  }
})

export default Profile