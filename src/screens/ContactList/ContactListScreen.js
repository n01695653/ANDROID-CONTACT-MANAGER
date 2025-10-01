import React, { useState, useEffect, useCallback, useMemo} from 'react';
import {
    View,
    FlatList,
    Text,
    RefreshControl,
    Alert,
    Linking,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import ContactListItem from '../../components/common/ContactListItem';
import CustomInput from '../../components/common/CustomInput';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {searchContacts} from '../../data/contactsData';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const ContactListScreen = ({navigation}) => {
    const {
        contacts,
        loading,
        toggleFavorite,
        deleteContact,
        refreshContacts,
    } = useContacts();

    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [sortBy, setSortBy] = useState('name');

    const displayContacts = useMemo(() => {
        let filtered = searchContacts(contacts, searchTerm);

        filtered.sort((a, b) => {
            if (sortBy === 'name') {
                const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
                return nameA.localeCompare(nameB);
            } else if (sortBy === 'company') {
                const companyA = (a.company || '').toLowerCase();
                const companyB = (b.company || '').toLowerCase();
                return companyA.localeCompare(companyB);
            } else if (sortBy === 'recent') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });

        return filtered.sort((a, b) => {
            if (a.favorite && !b.favorite) return -1;
            if (!a.favorite && b.favorite) return 1;
            return 0;
        });
    }, [contacts, searchTerm, sortBy]);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await refreshContacts();
        setRefreshing(false);
    }, [refreshContacts]);

    const handleContactPress = useCallback((contact) => {
        Alert.alert(
            'Contact Details',
            `Name: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nPhone: ${contact.phone}`,
            [{ text: 'OK' }]
        );
    }, []);

    const handleFavoritePress = useCallback(async (contactId) => {
        await toggleFavorite(contactId);
    }, [toggleFavorite]);

    const handleCallPress = useCallback((phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert('Error', 'Phone calls are not supported on this device');
            }
        });
    }, []);

    const handleMessagePress = useCallback((phoneNumber) => {
        const url = `sms:${phoneNumber}`;
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert('Error', 'SMS is not supported on this device');
            }
        });
    }, []);

    const renderContactItem = useCallback(({item}) => (
        <ContactListItem
            contact={item}
            onPress={handleContactPress}
            onFavoritePress={handleFavoritePress}
            onCallPress={handleCallPress}
            onMessagePress={handleMessagePress}
        />
    ), [handleContactPress, handleFavoritePress, handleCallPress, handleMessagePress]);

    const renderEmptyState = useCallback(() => (
        <View style={styles.emptyContainer}>
            <Icon name="contacts" size={80} color={Colors.text.secondary} />
            <Text style={styles.emptyTitle}>No Contacts Found</Text>
            <Text style={styles.emptyText}>
                {searchTerm
                    ? `No contacts match "${searchTerm}"`
                    : 'Add your first contact to get started'
                }
            </Text>
        </View>
    ), [searchTerm]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <CustomInput
                    label="Search contacts"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    leftIcon="search"
                    rightIcon={searchTerm ? "clear" : null}
                    onRightIconPress={() => setSearchTerm('')}
                    placeholder="Search by name, company, or email"
                />
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>
                    {displayContacts.length} contact{displayContacts.length !== 1 ? 's' : ''}
                    {searchTerm && ` for "${searchTerm}"`}
                </Text>
            </View>

            <FlatList
                data={displayContacts}
                renderItem={renderContactItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={renderEmptyState}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[Colors.primary]}
                        tintColor={Colors.primary}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.listContainer,
                    displayContacts.length === 0 && styles.emptyListContainer,
                ]}
                getItemLayout={(data, index) => ({
                    length: 90,
                    offset: 90 * index,
                    index,
                })}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={10}
            />

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('AddContact')}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Add new contact"
            >
                <Icon name="add" size={24} color={Colors.text.light} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
    },
    searchContainer: {
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
        backgroundColor: Colors.surface,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statsContainer: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    statsText: {
        fontSize: Fonts.small,
        color: Colors.text.secondary,
    },
    listContainer: {
        paddingBottom: 80,
    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    emptyContainer: {
        ...GlobalStyles.centered,
        paddingHorizontal: Spacing.xl,
    },
    emptyTitle: {
        fontSize: Fonts.large,
        fontWeight: 'bold',
        color: Colors.text.primary,
        marginTop: Spacing.md,
        marginBottom: Spacing.sm,
    },
    emptyText: {
        fontSize: Fonts.medium,
        color: Colors.text.secondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        ...GlobalStyles.centered,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});

export default ContactListScreen;