import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const CustomButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = 'primary',
    size = 'medium',
    ...props
}) => {
    const getButtonStyle = () => {
        const baseStyle = [styles.button, styles.mediumButton];
        
        if (variant === 'primary') {
            baseStyle.push(styles.primaryButton);
        } else if (variant === 'secondary') {
            baseStyle.push(styles.secondaryButton);
        } else if (variant === 'outline') {
            baseStyle.push(styles.outlineButton);
        }

        if (size === 'small') {
            baseStyle.push(styles.smallButton);
        } else if (size === 'large') {
            baseStyle.push(styles.largeButton);
        }

        if (disabled) {
            baseStyle.push(styles.disabledButton);
        }

        return baseStyle;
    };

    const getTextStyle = () => {
        const baseStyle = [styles.buttonText];
        
        if (variant === 'outline') {
            baseStyle.push(styles.outlineButtonText);
        } else if (variant === 'secondary') {
            baseStyle.push(styles.secondaryButtonText);
        }

        if (size === 'small') {
            baseStyle.push(styles.smallButtonText);
        } else if (size === 'large') {
            baseStyle.push(styles.largeButtonText);
        }

        if (disabled) {
            baseStyle.push(styles.disabledButtonText);
        }

        return baseStyle;
    };

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={title}
            accessibilityState={{disabled: disabled || loading}}
            {...props}
        >
            {loading ? (
                <ActivityIndicator 
                    size="small" 
                    color={variant === 'outline' ? Colors.primary : Colors.text.light} 
                />
            ) : (
                <Text style={getTextStyle()}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primaryButton: {
        backgroundColor: Colors.primary,
    },
    secondaryButton: {
        backgroundColor: Colors.secondary,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    smallButton: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        minHeight: 40,
    },
    mediumButton: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        minHeight: 48,
    },
    largeButton: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        minHeight: 56,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        fontSize: Fonts.medium,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    primaryButtonText: {
        color: Colors.text.light,
    },
    secondaryButtonText: {
        color: Colors.text.light,
    },
    outlineButtonText: {
        color: Colors.primary,
    },
    smallButtonText: {
        fontSize: Fonts.small,
    },
    largeButtonText: {
        fontSize: Fonts.large,
    },
    disabledButtonText: {
        opacity: 0.7,
    },
});

export default CustomButton;