import React from 'react';
import { Text, FlatList, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import RestaurantCard from './RestaurantCard';
import styles from './RestaurantList.styles';
import type { Restaurant } from './RestaurantSearchForm';

type Props = {
  restaurants: Restaurant[];
  error: string;
  loading: boolean;
};

export default function RestaurantList({ restaurants, error, loading }: Props) {
  const { t } = useTranslation();

  if (error) return <Text style={styles.error}>{error}</Text>;
  if (loading) return <ActivityIndicator style={styles.loading} />;
  if (!restaurants.length) return <Text style={styles.empty}>{t('暂无数据')}</Text>;

  return (
<FlatList
  data={restaurants}
  keyExtractor={(_, idx) => String(idx)}
  renderItem={({ item }) => <RestaurantCard restaurant={item} />}
  contentContainerStyle={styles.contentContainer}
/>
  );
}
