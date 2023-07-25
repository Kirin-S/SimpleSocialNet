import { View, Text, Alert, StyleSheet } from 'react-native';
import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const NewPost = ({ navigation, setPosts, postsLength }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const onAddPost = () => {
    if (title && description) {
      firestore()
        .collection('News')
        .doc(auth().currentUser?.uid)
        .update({
          posts: firestore.FieldValue.arrayUnion({
            id: postsLength ? postsLength + 1 : 1,
            title: title,
            description: description,
            imgLink: link ? link : 'https://images.barrons.com/im-709895?width=639&size=1.5',
            like: false,
            show: true,
            creator: auth().currentUser?.uid
          })
        })
        .then(() => {
          firestore()
            .collection('News')
            .doc(auth().currentUser?.uid)
            .get()
            .then(res => {
              const data = res.data();
              if (data?.posts) {
                setPosts(data.posts);
                navigation.navigate('PostList');
              }
            });
        })
    } else {
      Alert.alert('Alert', 'You need to fill title and description at least', [
        { text: 'OK', onPress: () => null },
      ]);
    }
  }

  return (
    <View style={styles.page}>
      <TextInput
        style={styles.input}
        mode='outlined'
        label='Set post title'
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        mode='outlined'
        label='Set post description'
        multiline
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        mode='outlined'
        label='Set post image link'
        value={link}
        onChangeText={text => setLink(text)}
      />

      <Button style={styles.addBtn} onPress={onAddPost}>
        <Text style={styles.btnLabel}>
          Publish post
        </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 10
  },
  input: {
    marginTop: 10,
  },
  addBtn: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    marginHorizontal: 30
  },
  btnLabel: {
    color: '#000'
  }
})

export default NewPost