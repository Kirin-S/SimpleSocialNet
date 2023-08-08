import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React, { FC, useState } from 'react';
import Icons from '../../UI/Icons/Icons';
import { IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


interface IPost {
  posts: any;
  post: {
    title: string;
    description: string;
    imgLink?: string;
    id: number;
    like: any;
    show: boolean;
    creator: string;
  };
  setPosts: any;
  setWasLikeClick: any;
}

const Post: FC<IPost> = ({ posts, post, setPosts, setWasLikeClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const onLikeDislike = () => {
    const isLike = !post.like.includes(auth()?.currentUser?.uid);

    firestore()
      .collection('News')
      .doc(post.creator)
      .update({
        posts: posts.map((item: any) => {
          if (item.id === post.id) {
            return {
              ...item,
              like: isLike
                ? [...post.like, auth()?.currentUser?.uid]
                : [...post.like.filter((item: string) => item !== auth()?.currentUser?.uid)]
            }
          } else return item;
        })
      })
      .then(() => setWasLikeClick((prev: boolean) => !prev))
  }

  const onRemovePost = () => {
    Alert.alert('Alert', 'Sure?', [
      {
        text: 'OK', onPress: () => removePost()
      },
      {
        text: 'cancel', onPress: () => null
      },
    ]);
  }

  const removePost = () => {
    setIsLoading(true);
    
    firestore()
      .collection('News')
      .doc(auth().currentUser?.uid)
      .update({
        posts: posts.map((item: any) => {
          if (item.id === post.id) {
            return {...item, show: false}
          } else return item;
        })
      })
      .then(() => {
        setWasLikeClick((prev: boolean) => !prev)
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <View style={!isLoading ? styles.post : {...styles.post, backgroundColor: '#bbb'}}>
      <Text>asdf</Text>
      {/* <View style={styles.iconBox}>
        <IconButton style={styles.remove} onPress={onRemovePost} icon={() => <Icons icon='remove' />} />
      </View>
      <View style={styles.postData}>
        <Image
          source={{
            uri: post.imgLink
          }}
          alt='Image Error'
          style={styles.image}
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{post.description}</Text>
        <IconButton
          style={styles.like}
          onPress={onLikeDislike}
          icon={() => <Icons icon={post.like.includes(auth()?.currentUser?.uid) ? 'heartRed' : 'heartOutlined'} />}
        />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
    width: '100%',
    height: 400
  },
  postData: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10
  },
  description: {
    marginLeft: 10
  },
  like: {
    marginLeft: 5,
    marginTop: -2.5
  },
  image: {
    width: '100%',
    height: '60%',
    marginBottom: 20,
    borderRadius: 10
  },
  iconBox: {
    alignItems: 'flex-end',
    marginBottom: 10,
    marginLeft: 30
  },
  remove: {
    padding: 0,
    margin: 0
  }
})

export default Post