# AEM Product Data Page extension

This project is a [PWA Studio](https://pwastudio.io) extension which fetches data from AEM and decorates the Venia product and category pages with it.

## Decorating the Product Page

For decorating the product page, we update the `@magento/venia-ui/lib/components/ProductFullDetail` component. The AEM data used to decorate the product page is the following:

-   product title (optional). If the product title is not stored in AEM, the original title is used
-   a text and up to five images, displayed under the product details from Magento

## Decorating the Category Page

For decorating the category page, we update the `@magento/venia-ui/lib/RootComponents/Category` component. The category page is decorated using the title stored in AEM (if present), a marketing text, and a hero banner.

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
    applyCategoryPageCustomization, applyProductPageCustomization
} = require('@adobe/aem-cif-product-page-extension/customizer');

function localIntercept(targets) {
    ...
    const targetables = Targetables.using(targets);
    // call the function to apply customizations
    applyProductPageCustomization(targetables);
    applyCategoryPageCustomization(targetables);
}
```

Obviously, you can choose to apply only the category page customizations or the product page one if you want.

## Configuring the PWA Studio app

To configure your app to connect to the AEM instance you have to add the URL of the instance in the `.env` file of the app:

```
AEM_CFM_GRAPHQL=<your publish instance url>
```

The default value for this setting is `http://localhost:4503`

## Local development (Yarn 1.x)

For local development (or play around with the SNAPSHOT versions) you have must follow these steps:

1. Clone this repository

```bash
git clone git@github.com:adobe/aem-pwa-studio-extensions.git
```

2. Navigate to the extension folder using `cd aem-pwa-studio-extensions/aem-cif-product-page-extension/extension`

3. Run `yarn link`

4. Go to your PWA Studio app folder and run

```bash
yarn link <extension module name>
```

5. Go the the package.json file of your PWA Studio app and make sure the extension is listed as a dependency, using the `link:` directive, similar to:

```json
"devDependencies":{
   "@adobe/aem-cif-product-page-extension":"link: ../the/path/to/your/extension"
}
```
