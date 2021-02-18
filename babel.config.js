module.exports = (api) => {
    api.cache(true);

    //This is the preset for parsing React
    const presets = ['@babel/preset-react'];

    // We need this plugin for optional chaining to work
    const plugins = ['@babel/plugin-proposal-optional-chaining'];

    return {presets, plugins};
};
