import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { User } from '../types';
import { COLORS } from '../constants/colors';

interface UserListItemProps {
  user: User;
  onPress: (user: User) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(user)}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Image 
          source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }} 
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.email} numberOfLines={1}>{user.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(UserListItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: COLORS.avatarBackground,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: COLORS.primaryLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
