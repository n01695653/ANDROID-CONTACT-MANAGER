import React, {useState, useMemo} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import ContactListItem from '../../components/common/ContactListItem';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';
import {searchContacts} from '../../data/contactsData';

const ContactListScreen = () => {
    const {contacts, loading, toggleFavorite, refreshContacts} = useContacts();
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const filteredContacts = useMemo(() => {
        return searchContacts(contacts, searchTerm);
    }, [contacts, searchTerm]);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshContacts();
        setRefreshing(false);
    };

    const handleContactPress = (contact) => {
        // Navigation to contact details will be implemented later
        console.log('Contact pressed:', contact);
        alert(`Contact Details for ${contact.firstName} ${contact.lastName}\n\nWe'll implement navigation to details screen next!`);
    };

    const handleFavoritePress = (contactId) => {
        toggleFavorite(contactId);
    };

    if (loading) {
        return (
            <View style={[GlobalStyles.container, GlobalStyles.centered]}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading contacts...</Text>
            </View>
        );
    }

    return (
        <View style={GlobalStyles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Contacts</Text>
                <Text style={styles.headerSubtitle}>
                    {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
                </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color={Colors.text.secondary} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    accessible={true}
                    accessibilityLabel="Search contacts"
                    accessibilityHint="Type to search through your contacts"
                />
                {searchTerm.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => setSearchTerm('')}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Clear search"
                    >
                        <Icon name="close" size={20} color={Colors.text.secondary} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Contact List */}
            {filteredContacts.length === 0 ? (
                <View style={[GlobalStyles.container, GlobalStyles.centered]}>
                    <Icon name="contacts" size={64} color={Colors.text.secondary} />
                    <Text style={styles.emptyText}>
                        {searchTerm ? 'No contacts found' : 'No contacts yet'}
                    </Text>
                    <Text style={styles.emptySubtext}>
                        {searchTerm ? 'Try a different search term' : 'Add your first contact to get started'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <ContactListItem
                            contact={item}
                            onPress={handleContactPress}
                            onFavoritePress={handleFavoritePress}
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.primary]}
                            tintColor={Colors.primary}
                        />
                    }
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Add Contact Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => alert('Add contact functionality coming next!')}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Add new contact"
            >
                <Icon name="add" size={24} color={Colors.text.light} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.md,
    },
    headerTitle: {
        fontSize: Fonts.xlarge,
        fontWeight: 'bold',
        color: Colors.text.light,
        marginBottom: Spacing.xs,
    },
    headerSubtitle: {
        fontSize: Fonts.small,
        color: Colors.text.light,
        opacity: 0.8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        margin: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    searchIcon: {
        marginRight: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: Fonts.medium,
        paddingVertical: Spacing.md,
        color: Colors.text.primary,
    },
    clearButton: {
        padding: Spacing.xs,
    },
    listContent: {
        paddingBottom: Spacing.xl,
    },
    loadingText: {
        marginTop: Spacing.md,
        fontSize: Fonts.medium,
        color: Colors.text.secondary,
    },
    emptyText: {
        fontSize: Fonts.large,
        color: Colors.text.secondary,
        marginTop: Spacing.md,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: Fonts.medium,
        color: Colors.text.secondary,
        marginTop: Spacing.sm,
        textAlign: 'center',
        opacity: 0.7,
    },
    addButton: {
        position: 'absolute',
        right: Spacing.lg,
        bottom: Spacing.lg,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default ContactListScreen;