import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from './RestaurantCard.styles';
import { useTranslation } from 'react-i18next';
import type { Restaurant } from './RestaurantSearchForm';

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.info}>{t('score')}: {restaurant.rating}</Text>
      <Text style={styles.info}>{t('type')}: {restaurant.types.join('、')}</Text>
      <Text style={styles.info}>{t('address')}: {restaurant.address}</Text>
      {restaurant.url && (
        <TouchableOpacity onPress={() => Linking.openURL(restaurant.url!)}>
          <Text style={styles.link}>{t('detail')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
