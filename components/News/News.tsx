import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import React from 'react';
import Post from './Post';

const News = () => {

  const mochPosts = [
    { title: 'Post 1', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sed suscipit dolore nulla eum aliquam alias eos Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sed suscipit dolore nulla eum aliquam alias eos' },
    { title: 'Post 2', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sed suscipit dolore nulla eum aliquam alias eos' },
    { title: 'Post 3', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sed suscipit dolore nulla eum aliquam alias eos' },
    { title: 'Post 4', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sed suscipit dolore nulla eum aliquam alias eos' },
    { title: 'Post 5', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sed suscipit dolore nulla eum aliquam alias eos' },
  ];

  return (
    <SafeAreaView style={styles.news}>
      <FlatList
        data={mochPosts}
        renderItem={({item}) => <Post title={item.title} description={item.description} />}
        keyExtractor={item => item.title}
      />

      {/* Floating Button */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  news: {
    padding: 10
  }
})

export default News