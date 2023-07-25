import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import React from 'react';
import Post from './Post';
import { Button } from 'react-native-paper';

const PostList = ({ navigation, posts, setPosts, userData }: any) => {
  return (
    <SafeAreaView style={styles.news}>
      <FlatList
        data={posts}
        renderItem={({item}) => item.show && <Post userData={userData} posts={posts} post={item} setPosts={setPosts} />}
        keyExtractor={item => item.id}
      />

      <Button style={styles.addBtn} onPress={() => navigation.navigate('NewPost')}>
        <Text style={styles.btnLabel}>ADD POST</Text>
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  news: {
    padding: 10,
    height: '100%'
  },
  addBtn: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#000',
    backgroundColor: '#fff'
  },
  btnLabel: {
    fontWeight: 'bold'
  }
});

export default PostList