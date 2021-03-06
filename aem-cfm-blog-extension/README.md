[![CircleCI](https://circleci.com/gh/adobe/aem-pwa-studio-extensions.svg?style=svg)](https://circleci.com/gh/aadobe/aem-pwa-studio-extensions)
# PWA Studio Extension for AEM headless

With this extension for Magento PWA Studio, you can integrate headless content from Adobe Experience Manager via its GraphQL API. This GitHub code demonstrates this with an embedded blog example where the content is managed in AEM.

# Setup

## AEM
1. Start an author and publish instance of AEMaaCS SDK. Make sure the local replication configuration works properly (via http://localhost:4502/etc/replication/agents.author.html). The author part is only required, if you want to change any of the CFM data or models.

2. Download the `GraphQL Sample Configuration` package from [Software Distribution](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html), build it and install the all package on both instances.

3. In `/aem/config`, update the following configurations to include the hostname of the PWA Studio app. This hostname is generated during step 2 of the PWA Studio setup.
    * `src/main/content/jcr_root/apps/blog-demo/config/com.adobe.granite.cors.impl.CORSPolicyImpl~blogpost.cfg.json`

        Update the `alloworigin` property to the full hostname of your local PWA installation.

        Example: `https://pwa-studio-test-vflyn.local.pwadev:9366`
    
    * `src/main/content/jcr_root/apps/blog-demo/config/org.apache.sling.security.impl.ReferrerFilter.cfg.json`

        Update the `allow.hosts` property to the hostname of your local PWA installation.

        Example: `pwa-studio-test-vflyn.local.pwadev`.

4. Build the packages in `/aem` using `mvn clean install`.
5. Install the `content` and `config` packages on both author and publish instance using the package manager.

## PWA Studio
1. Create a new PWA studio project. You can find more information about the process in the Magento [documentation](https://magento.github.io/pwa-studio/tutorials/pwa-studio-fundamentals/project-setup/). This extension supports PWA Studio version 10 only.

    ```bash
    yarn create @magento/pwa
    ```

    When the scaffolding tool asks for the template, please use the following value:

    ```bash
    Which template would you like to use to bootstrap pwa-aem? Defaults to "@magento/venia-concept". 
    @magento/venia-concept@10.0.0
    ```

    If the build of your project generated with PWA Studio version 10 fails, you might need to apply https://github.com/magento/pwa-studio/issues/3339.

2. Setup hostname and SSL certificate. In the PWA root folder, run:

    ```bash
    yarn buildpack create-custom-origin ./
    ```

3. Add the PWA Studio extension by running:

    ```bash
    # For local development
    yarn add --dev file:../extension

    # Use the released version
    yarn add --dev @adobe/pwa-studio-aem-cfm-blog-extension
    ```

4. Add the Apollo Link wrapper to your application. In `pwa-root/src/index.js`, make the following changes:

    ```javascript
    import { linkWrapper } from '@adobe/pwa-studio-aem-cfm-blog-extension';

    // ...

    <Adapter apiBase={apiBase} apollo={{ link: linkWrapper(apolloLink) }} store={store}>
    ```

5. Add the Blog entry to the navigation components by adding the following adaptions to `pwa-root/local-intercept.js`:

    ```javascript
    const addBlogToNavigation = require('@adobe/pwa-studio-aem-cfm-blog-extension/src/addBlogToNavigation');

    function localIntercept(targets) {
        addBlogToNavigation(targets);
    }
    ```

6. Add the following line to `pwa-root/.env` and adapt it to point to your AEM Content Fragments GraphQL endpoint:

    ```
    AEM_CFM_GRAPHQL=http://localhost:4503/content/graphql/global
    ```

    Update the UPWARD configuration in `pwa-root/upward.yml` to proxy the AEM Content Fragments GraphQL endpoint to disable CORS:

    ```yaml
    response:
      resolver: conditional
      when:
        - matches: request.url.pathname
          pattern: ^/endpoint.json(/|$)
          use: aemProxy
      default: veniaResponse

    aemProxy:
      resolver: proxy
      target: env.AEM_CFM_GRAPHQL
      ignoreSSLErrors: true

    status: response.status
    headers: response.headers
    body: response.body
    ```

7. Build and start the PWA using:

    ```bash
    yarn build
    yarn start
    ```
