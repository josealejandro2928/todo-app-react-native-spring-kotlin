import React from 'react';
import { SafeAreaView, View } from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

export const DetailsScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='MyApp'
        alignment='center'
      />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};
