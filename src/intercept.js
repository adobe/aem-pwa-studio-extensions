module.exports = (targets) => {
    targets.of('@magento/pwa-buildpack').specialFeatures.tap((flags) => {
        /**
         *  Wee need to activated esModules and cssModules to allow build pack to load our extension
         * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
         */
        flags[targets.name] = {esModules: true, cssModules: true, graphqlQueries: true};
    });
};
