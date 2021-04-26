# AEM Product Data Page content fragments

This AEM project contains the Content Fragment model required by the PWA Studio extension along with the configurations that AEM

## Setting up the project

1. Start an author and publish instance of AEMaaCS SDK. Make sure the local replication configuration works properly (via http://localhost:4502/etc/replication/agents.author.html). The author part is only required, if you want to change any of the CFM data or models.

2. Download the `GraphQL Sample Configuration` package from [Software Distribution](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html), build it and install the all package on both instances.

3. In the [config](./config) project, update the following configurations to include the hostname of the PWA Studio app. This hostname is generated during step 2 of the PWA Studio setup.

    - `src/main/content/jcr_root/apps/cif-extension/config/com.adobe.granite.cors.impl.CORSPolicyImpl~pwa.cfg.json`

        Update the `allowedorigin` property to the full hostname of your local PWA installation.

        Example: `https://pwa-studio-test-vflyn.local.pwadev:9366`

    - `src/main/content/jcr_root/apps/cif-extension/config/org.apache.sling.security.impl.ReferrerFilter.cfg.json`

        Update the `allow.hosts` property to the hostname of your local PWA installation.

        Example: `pwa-studio-test-vflyn.local.pwadev`.

4. Build and install the the packages using `mvn clean install -PautoInstallPackage` for the author instance and `mvn clean install -PautoInstallPackagePublish` for the publish instance
