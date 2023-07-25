import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './PostList';
import NewPost from './NewPost';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const News = ({ userData }: any) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const posts: any = [];

    const promise = new Promise((resolve, reject) => {
      const users = [auth().currentUser?.uid, ...userData.friends];

      users.forEach((id: string, index: number) => {
        firestore()
          .collection('News')
          .doc(id)
          .get()
          .then(res => {
            const data = res.data();

            if (data?.posts) {
              posts.push(...data.posts);
            }
          })
          .catch(err => reject(err))

        if (index === users.length - 1) {
          resolve(posts);
        }
      })
    });

    promise
      .then((data: any) => setPosts(data))
      .finally(() => setIsLoading(false))
  }, [userData])

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
          else return <PostList {...props} userData={userData} posts={posts} setPosts={setPosts} />
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