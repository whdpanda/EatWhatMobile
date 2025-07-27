import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, PermissionsAndroid, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import styles from './RestaurantSearchForm.styles';
import { fetchRandomRestaurants } from '../services/restaurant';

export type Restaurant = {
  name: string;
  rating: number;
  types: string[];
  address: string;
  url?: string;
};

type Props = {
  onResult: (restaurants: Restaurant[]) => void;
  onError: (msg: string) => void;
  setLoading: (b: boolean) => void;
};

// 币种选项
const CURRENCY_OPTIONS = [
  { code: "CNY", label: "CNY" },
  { code: "USD", label: "USD" },
  { code: "JPY", label: "JPY" },
  { code: "EUR", label: "EUR" },
  { code: "GBP", label: "GBP" },
];

// 预算选项
const PRICE_OPTIONS_MAP: Record<string, { label: string; value: number }[]> = {
  CNY: [
    { label: "请选择", value: -1 },
    { label: "¥100", value: 100 },
    { label: "¥200", value: 200 },
    { label: "¥300", value: 300 },
    { label: "¥500", value: 500 },
    { label: "¥1000", value: 1000 },
  ],
  USD: [
    { label: "Please select", value: -1 },
    { label: "$10", value: 10 },
    { label: "$30", value: 30 },
    { label: "$50", value: 50 },
    { label: "$100", value: 100 },
    { label: "$200", value: 200 }
  ],
  JPY: [
    { label: "選択してください", value: -1 },
    { label: "¥1000", value: 1000 },
    { label: "¥2000", value: 2000 },
    { label: "¥3000", value: 3000 },
    { label: "¥5000", value: 5000 },
    { label: "¥10000", value: 10000 },
  ],
  EUR: [
    { label: "Please select", value: -1 },
    { label: "€10", value: 10 },
    { label: "€30", value: 30 },
    { label: "€50", value: 50 },
    { label: "€100", value: 100 },
    { label: "€200", value: 200 }
  ],
  GBP: [
    { label: "Please select", value: -1 },
    { label: "£10", value: 10 },
    { label: "£30", value: 30 },
    { label: "£50", value: 50 },
    { label: "£100", value: 100 },
    { label: "£200", value: 200 }
  ],
};

const DISTANCE_OPTIONS = [
  { label: "1km", value: 1000 },
  { label: "3km", value: 3000 },
  { label: "5km", value: 5000 },
  { label: "10km", value: 10000 },
];

// 定位权限申请
async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '位置权限',
          message: '我们需要您的定位权限用于推荐附近餐厅。',
          buttonNeutral: '稍后询问',
          buttonNegative: '拒绝',
          buttonPositive: '允许',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  }
  return true; // iOS 只需要 plist 配置
}

// 获取当前定位
function getLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      _err => reject(new Error("定位失败")),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  });
}

export default function RestaurantSearchForm({
  onResult,
  onError,
  setLoading,
}: Props) {
  const { t } = useTranslation();
  const [distance, setDistance] = useState(1000);
  const [currency, setCurrency] = useState("CNY");
  const [price, setPrice] = useState(-1);
  const [fetching, setFetching] = useState(false);

  // 切换币种时重置预算
  useEffect(() => {
    setPrice(-1);
  }, [currency]);

  // 当前币种预算选项
  const priceOptions = PRICE_OPTIONS_MAP[currency];

  async function handleRandom() {
    // 首先请求权限
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("权限不足", "请授予定位权限");
      return;
    }
    setLoading(true);
    setFetching(true);
    onError('');
    onResult([]);
    try {
      const { lat, lng } = await getLocation();
      const data = await fetchRandomRestaurants({
        latitude: lat,
        longitude: lng,
        distance,
        price,
        currency,
      });
      onResult(data.restaurants || []);
    } catch (e: any) {
      Alert.alert("错误", e.message || "发生未知错误");
      onError(e.message || "发生未知错误");
    }
    setLoading(false);
    setFetching(false);
  }

  return (
    <View style={styles.form}>
      <View style={styles.row}>
        <Text style={styles.label}>{t("distance")}:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={distance}
            onValueChange={setDistance}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            {DISTANCE_OPTIONS.map(opt => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{t("budget")}:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={price}
            onValueChange={setPrice}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            {priceOptions.map(opt => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={currency}
            onValueChange={v => setCurrency(v)}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            {CURRENCY_OPTIONS.map(opt => (
              <Picker.Item key={opt.code} label={opt.label} value={opt.code} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRandom}
        disabled={fetching}
      >
        {fetching ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t("random")}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
