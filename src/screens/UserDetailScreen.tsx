import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen = ({ route }: Props) => {
  const { user } = route.params;

  const renderRow = (label: string, value: string, isLast = false) => (
    <View style={[styles.row, isLast && styles.rowNoBorder]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }} 
          style={styles.avatar}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileUsername}>@{user.username}</Text>
      </View>

      <Text style={styles.sectionHeader}>CONTACT INFO</Text>
      <View style={styles.group}>
        {renderRow('Email', user.email)}
        {renderRow('Phone', user.phone)}
        {renderRow('Website', user.website, true)}
      </View>

      <Text style={styles.sectionHeader}>ADDRESS</Text>
      <View style={styles.group}>
        {renderRow('Street', `${user.address.suite}, ${user.address.street}`)}
        {renderRow('City', user.address.city)}
        {renderRow('Zipcode', user.address.zipcode, true)}
      </View>

      <Text style={styles.sectionHeader}>COMPANY</Text>
      <View style={styles.group}>
        {renderRow('Name', user.company.name)}
        {renderRow('Slogan', user.company.catchPhrase, true)}
      </View>

    </ScrollView>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: COLORS.avatarBackgroundDark,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  profileUsername: {
    fontSize: 16,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginLeft: 16,
    marginBottom: 6,
    marginTop: 16,
  },
  group: {
    backgroundColor: COLORS.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderDark,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingRight: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderDark,
  },
  rowNoBorder: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    width: 100,
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textTertiary,
    textAlign: 'right',
  },
});
