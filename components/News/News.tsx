import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './PostList';
import NewPost from './NewPost';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const News = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    firestore()
      .collection('News')
      .doc('Posts')
      .get()
      .then(res => {
        const data = res.data();

        if (data?.posts) {
          setPosts(data.posts);
        }
      })
      .catch(err => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Stack.Navigator initialRouteName='PostList'>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="PostList"
      >
        {(props: any) => {
          if (isLoading) return (
            <View style={styles.loader}>
              <ActivityIndicator size={40} animating={true} color={MD2Colors.blue900} />
              <Text style={styles.loaderText}>Loading</Text>
            </View>
          )
          else if (isError) return (
            <View>
              <Text style={styles.loaderText}>Got some error, try again later.</Text>
            </View>
          )
          else return <PostList {...props} posts={posts} setPosts={setPosts} />
        }}
      </Stack.Screen>
      <Stack.Screen
        options={{
          title: 'New Post',
          headerStyle: {
            backgroundColor: '#aaa',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="NewPost"
      >
        {(props: any) => <NewPost {...props} postsLength={posts.length} setPosts={setPosts} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderText: {
    fontSize: 24,
    marginLeft: 20
  }
})

export default News