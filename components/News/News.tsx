import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './PostList';
import NewPost from './NewPost';
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Stack = createNativeStackNavigator();

const News = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firestore()
      .collection('News')
      .doc(auth().currentUser?.uid)
      .get()
      .then(res => {
        const data = res.data();
        if (data?.posts) {
          setPosts(data.posts);
        }
      });
  }, [])

  return (
    <Stack.Navigator initialRouteName='PostList'>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="PostList"
      >
        {(props: any) => <PostList {...props} posts={posts} setPosts={setPosts} />}
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

export default News