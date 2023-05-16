import { Image } from 'react-native';
import React, { FC } from 'react';

interface IIcons {
  icon: string;
}

const Icons: FC<IIcons> = ({icon}) => {
  const icons: any = {
    user: require(`../../static/icons/user.png`), 
    userOutlined: require(`../../static/icons/userOutlined.png`),
    favorites: require(`../../static/icons/favorites.png`),
    favoritesOutlined: require(`../../static/icons/favoritesOutlined.png`),
    settings: require(`../../static/icons/settings.png`),
    settingsOutlined: require(`../../static/icons/settingsOutlined.png`),
    news: require(`../../static/icons/news.png`),
    newsOutlined: require(`../../static/icons/newsOutlined.png`),
    heartOutlined: require(`../../static/icons/heartOutlined.png`),
    heartRed: require(`../../static/icons/heartRed.png`),
  }

  return (
    <Image
      source={icons[icon]}
      style={{
        width: 25,
        height: 25
      }}
    />
  )
}

export default Icons