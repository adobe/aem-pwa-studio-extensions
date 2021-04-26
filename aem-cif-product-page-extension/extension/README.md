# AEM Product Data Page extension

This project is a [PWA Studio](https://pwastudio.io) extension which fetches data from AEM and decorates the Venia product page with it.

## Installing the extension

In your PWA Studio app you can install the NPM module of the extension by using your package manager

```
yarn add @adobe/aem-cif-product-page-extension
```

## Applying the extension

To apply the extension you must edit the `local-intercept.js` script of your PWA Studio app and update it as follows:

```javascript
//import the script from this package
const {
    applyCustomization
} = require('@adobe/aem-cif-product-page-extension/customizer');

function localIntercept(targets) {
    ...
    const targetables = Targetables.using(targets);
    // call the function to apply customizations
    applyCustomization(targetables)
}
```

## Configure a secondary Apollo Link to point to AEM

To make your PWA Studio app query the AEM GraphQL you have to do the following steps:

1. Go to the root of your PWA Studio app and edit `src/index.js`.
2. Import the `linkWrapper` util

```javascript
import { linkWrapper } from '@adobe/aem-cif-product-page-extension';
```

3. Update the props of the `<Adapter>` component:

```javascript
 <Adapter
        apiBase={apiBase}
        apollo={{ link: linkWrapper(apolloLink) }}
        store={store}>
```

## Configuring the PWA Studio app

To configure your app to connect to the AEM instance you have to add the URL of the instance in the `.env` file of the app:

```
AEM_CFM_GRAPHQL=<your publish instance url>
```

The default value for this setting is `http://localhost:4503`

## Local development

For local development (or play around with the SNAPSHOT versions) you have must follow these steps:

1. Clone this repository

```bash
git clone git@github.com:adobe/aem-pwa-studio-extensions.git
```

2. Then you have to update your PWA Studio app dependencies using the path to this project.

```bash
cd <your PWA Studio app folder>
yarn add -D "file: <path to this repository>/extension"
```
