/*******************************************************************************
 *
 *    Copyright 2021 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/
module.exports = targets => {
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

    // Add routes for blog index and article pages
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'BlogIndexPageRoute',
            pattern: '/blog',
            exact: true,
            path: require.resolve(
                '@adobe/pwa-studio-aem-cfm-blog-extension/src/components/BlogIndexPage/BlogIndexPage.js'
            )
        });
        routes.push({
            name: 'ArticlePageRoute',
            pattern: '/blog/:slug+',
            path: require.resolve(
                '@adobe/pwa-studio-aem-cfm-blog-extension/src/components/BlogPostPage/BlogPostPage.js'
            )
        });
        return routes;
    });
};
