const { Targetables } = require('@magento/pwa-buildpack');
module.exports = targets => {
    console.log(`Targets?!`, targets);
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        flags[targets.name] = {
            esModules: true,
            cssModules: true
        };
    });

    // Add variable for AEM CFM GraphQL endpoint
    targets.of('@magento/pwa-buildpack').envVarDefinitions.tap(defs => {
        defs.sections.push({
            name: 'AEM CFM',
            variables: [
                {
                    name: 'AEM_CFM_GRAPHQL',
                    type: 'str',
                    desc: 'AEM CFM GraphQL Endpoint. Remove the endpoint.json part.',
                    default: 'http://localhost:4503/content/graphql/global'
                }
            ]
        });
    });
};
