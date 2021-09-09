[![CircleCI](https://circleci.com/gh/adobe/aem-pwa-studio-extensions.svg?style=svg)](https://circleci.com/gh/aadobe/aem-pwa-studio-extensions)
# PWA Studio Extension for AEM headless

With this extension for Magento PWA Studio, you can integrate headless content from Adobe Experience Manager via its GraphQL API. This GitHub code demonstrates this with an embedded blog example where the content is managed in AEM.

# Setup

## AEM
1. Start an author and publish instance of AEMaaCS SDK. Make sure the local replication configuration works properly (via http://localhost:4502/etc/replication/agents.author.html). The author part is only required, if you want to change any of the CFM data or models.

2. Download the `GraphQL Sample Configuration` package from [Software Distribution](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html), build it and install the all package on both instances.

3. In `/aem/config`, update the following configurations to include the hostname of the PWA Studio app. This hostname is generated during step 2 of the PWA Studio setup.
    * `src/main/content/jcr_root/apps/blog-demo/config/com.adobe.granite.cors.impl.CORSPolicyImpl~blogpost.cfg.json`

        Update the `allowedorigin` property to the full hostname of your local PWA installation.

        Example: `https://pwa-studio-test-vflyn.local.pwadev:9366`
    
    * `src/main/content/jcr_root/apps/blog-demo/config/org.apache.sling.security.impl.ReferrerFilter.cfg.json`

        Update the `allow.hosts` property to the hostname of your local PWA installation.

        Example: `pwa-studio-test-vflyn.local.pwadev`.

4. Build the packages in `/aem` using `mvn clean install`.
5. Install the `content` and `config` packages on both author and publish instance using the package manager.

## PWA Studio
1. Create a new PWA studio project. You can find more information about the process in the Magento [documentation](https://magento.github.io/pwa-studio/tutorials/pwa-studio-fundamentals/project-setup/). This extension supports PWA Studio version 11.

    ```bash
    yarn create @magento/pwa
    ```

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

4. Some customizations cannot be applied by the extension directly, but need to be added to the intercept file of your project. Please add the following code to `pwa-root/local-intercept.js`:

    ```javascript
    const applyTargetables = require('@adobe/pwa-studio-aem-cfm-blog-extension/src/applyTargetables');

    function localIntercept(targets) {
        applyTargetables(targets);
    }
    ```

    This will apply a Apollo Link wrapper to your application, so Apollo can target AEM. It will also add a Blog entry to the navigation components.

4. Add the following line to `pwa-root/.env` and adapt it to point to your AEM Content Fragments GraphQL endpoint:

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