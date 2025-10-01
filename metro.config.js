const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
    resolver: {
        blockList: [
            /\.cxx\/.*/,
        ],
    },
    watchFolders: [],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);