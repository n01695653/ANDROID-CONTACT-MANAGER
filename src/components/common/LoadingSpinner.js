import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
} from 'react-native';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const LoadingSpinner = ({message = 'Loading...', size = 'large'}) => {
    return (
        <View style={[GlobalStyles.container, GlobalStyles.centered]}>
            <ActivityIndicator 
                size={size} 
                color={Colors.primary} 
            />
            <Text style={styles.loadingText}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingText: {
        marginTop: Spacing.md,
        fontSize: Fonts.medium,
        color: Colors.text.secondary,
        textAlign: 'center',
    },
});

export default LoadingSpinner;