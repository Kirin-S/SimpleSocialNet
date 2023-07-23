import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { IconButton } from 'react-native-paper';
import Icons from '../../UI/Icons/Icons';

const People = ({ userData }: any) => {
  const [users, setUsers] = useState([]);

  const onAddFriend = (id: string) => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .update({
        friends: firestore.FieldValue.arrayUnion(id)
      })
  }


  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then(data => {
        const arr: any = [];

        data.forEach(user => {
          arr.push({...user.data(), id: user.id});
        });

        setUsers(arr);
      })
  }, [])

  return (
    <View style={styles.peopleScreen}>
      {users.map((user: any) => user.nickname !== userData.nickname && (
        <View key={user.id} style={styles.userView}>
          <Text style={styles.userText}>{user.nickname}</Text>
          <IconButton onPress={() => onAddFriend(user.id)} icon={() => <Icons icon={userData.friends.includes(user.id) ? 'approve' : 'add'} />} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  peopleScreen: {
    paddingHorizontal: 10
  },
  userView: {
    marginTop: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10
  },
  userText: {
    fontSize: 18
  }
})

export default People