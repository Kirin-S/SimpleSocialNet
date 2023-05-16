import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import Icons from '../../UI/Icons/Icons';
import { IconButton } from 'react-native-paper';


interface IPost {
  title: string;
  description: string;
}

const Post: FC<IPost> = ({ title, description }) => {
  
  const onLike = (id: string): void => {
    console.log(`LIKED ${id}`);
  }

  return (
    <View style={styles.post}>
      <Image
        source={{
          uri: 'https://sun1-23.userapi.com/impg/c857616/v857616347/1683dc/nAgyz1ZWOqg.jpg?size=2157x2160&quality=96&sign=a43d5c616bba0fd531797350b0d8c785&type=album'
        }}
        alt='Image Error'
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={3} ellipsizeMode='tail'>{description}</Text>
      <IconButton style={styles.like} onPress={() => onLike(title)} icon={() => <Icons icon='heartOutlined' />} />
    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
    padding: 15,
    width: '100%',
    height: 400
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  like: {
    marginLeft: -5
  },
  image: {
    width: '100%',
    height: '60%',
    marginBottom: 20,
    borderRadius: 10
  }
})

export default Post