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

    const targetables = Targetables.using(targets);
    const productFullDetail = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    productFullDetail.addImport(`import {AfterProductData} from '../../../../../../src/components/AfterProductData'`);
    productFullDetail.addImport(`import {BeforeProductData} from '../../../../../../src/components/BeforeProductData'`);
    productFullDetail.insertBeforeJSX(`<Form>`, `<BeforeProductData productDetails={productDetails}>`);
    productFullDetail.insertAfterJSX(`<Form>`, `<AfterProductData productDetails={productDetails}>`);
};
