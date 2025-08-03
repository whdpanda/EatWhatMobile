import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import RestaurantSearchForm, { Restaurant } from '../../components/RestaurantSearchForm';
import RestaurantList from '../../components/RestaurantList';
import Header from '../../components/Header'; // 新增这行
import styles from './HomeScreen.styles';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>{t('title')}</Text>
      <RestaurantSearchForm
        onResult={setRestaurants}
        onError={setError}
        setLoading={setLoading}
      />
      <RestaurantList
        restaurants={restaurants}
        error={error}
        loading={loading}
      />
    </View>
  );
}
