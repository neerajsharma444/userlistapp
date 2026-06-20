import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetUsers } from '../hooks/useGetUsers';
import { RootStackParamList } from '../navigation/types';
import UserListItem from '../components/UserListItem';
import SearchBar from '../components/SearchBar';
import ErrorView from '../components/ErrorView';
import { User } from '../types';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'UserList'>;

const UserListScreen = ({ navigation }: Props) => {
  const {
    filteredUsers,
    isLoading,
    isFetching,
    isError,
    refetch,
    loadMore,
    searchQuery,
    setSearchQuery,
  } = useGetUsers(5);

  const handlePressUser = useCallback((user: User) => {
    navigation.navigate('UserDetail', { user });
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: User }) => (
    <UserListItem user={item} onPress={handlePressUser} />
  ), [handlePressUser]);

  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) return null;
    if (isError) return <ErrorView message="Failed to fetch users. Please check your internet connection." onRetry={refetch} />;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>No results found</Text>
        <Text style={styles.emptyText}>
          We couldn't find any users matching "{searchQuery}".
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <SearchBar
      value={searchQuery}
      onChangeText={setSearchQuery}
      placeholder="Search users by name..."
    />
  );

  if (Platform.OS === 'ios') {
    return (
      <FlatList
        style={styles.container}
        data={filteredUsers}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={isLoading && !isFetching}
        onRefresh={refetch}
        initialNumToRender={5}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={isLoading && !isFetching}
        onRefresh={refetch}
        initialNumToRender={5}
      />
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 400,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
