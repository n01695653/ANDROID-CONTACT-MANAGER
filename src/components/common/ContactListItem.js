import React, {memo} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const {width} = Dimensions.get('window');

const ContactListItem = memo(({contact, onPress, onFavoritePress}) => {
    const handleFavoritePress = () => {
        onFavoritePress(contact.id);
    };

    const handleContactPress = () => {
        onPress(contact);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleContactPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Contact ${contact.firstName} ${contact.lastName}`}
            accessibilityHint="Press to view contact details"
        >
            <Image
                source={{uri: contact.avatar}}
                style={styles.avatar}
                accessible={true}
                accessibilityLabel={`Profile picture of ${contact.firstName} ${contact.lastName}`}
            />
            
            <View style={styles.content}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                        {contact.firstName} {contact.lastName}
                    </Text>
                    {contact.favorite && (
                        <Icon name="star" size={16} color={Colors.accent} style={styles.favoriteIcon} />
                    )}
                </View>
                
                <Text style={styles.company} numberOfLines={1}>
                    {contact.company}
                </Text>
                
                <Text style={styles.email} numberOfLines={1}>
                    {contact.email}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={handleFavoritePress}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={contact.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Icon
                    name={contact.favorite ? 'star' : 'star-outline'}
                    size={24}
                    color={contact.favorite ? Colors.accent : Colors.text.secondary}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        marginVertical: Spacing.xs,
        marginHorizontal: Spacing.md,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: Spacing.md,
    },
    content: {
        flex: 1,
        marginRight: Spacing.md,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    name: {
        fontSize: Fonts.medium,
        fontWeight: 'bold',
        color: Colors.text.primary,
        marginRight: Spacing.xs,
    },
    favoriteIcon: {
        marginLeft: Spacing.xs,
    },
    company: {
        fontSize: Fonts.small,
        color: Colors.text.secondary,
        marginBottom: 2,
    },
    email: {
        fontSize: Fonts.small,
        color: Colors.primary,
    },
    favoriteButton: {
        padding: Spacing.xs,
    },
});

export default ContactListItem;