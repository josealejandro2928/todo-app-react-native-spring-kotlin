import React from 'react';
import { Text, Button, List, ListItem, IconElement, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

interface User {
  id: number;
  name: string;
}

const LoggingP: React.FC = () => {
  const users: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
  ];

  const handleCreateAccount = () => {
    console.log('Create account button clicked!');
  };

  const renderItem = ({ item, index }: { item: any; index: number }): React.ReactElement => (
    <ListItem
      title={item.name}
      description={item.name}
      accessoryLeft={(props): IconElement => <Icon {...props} name='person' />}
      accessoryRight={<Button size='tiny'>Select</Button>}
    />
  );

  return (
    <View>
      <Text category='h5'>Choose a User to Sign In:</Text>
      <List style={styles.container} data={users} renderItem={renderItem} />
      <Button onPress={handleCreateAccount}>Create Account</Button>
    </View>
  );
};

export default LoggingP;

const styles = StyleSheet.create({
  container: {
    maxHeight: 192,
  },
});
