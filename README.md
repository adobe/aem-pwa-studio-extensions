# AEM PWA Studio Extensions

This projects is a collection of AEM extensions for [PWA Studio](https://pwastudio.io):

1. [AEM Blog PWA Extension](./aem-cfm-blog-extension) is an extension that allows you to hook a blog to your PWA Studio app.
2. [AEM CIF Product Page Extension](./aem-cif-product-page-extension) is an extension that allows you decorate the product and category pages with content from an AEM content fragment

For details about using the extension please refer to the extension's README file. For general instructions on how to run them locally, read below:

## Running the extensions locally

Currently, there are no released versions of these extensions as they are merely for demo. If you want to run them locally, you need to do the following:

-   go to the source folder of the extension and run `yarn link`.
-   go to your PWA Studio app folder and run `yarn link <extension module name>`

Go the the `package.json` file of your PWA Studio app and make sure the extension is listed as a dependency, using the `link:` directive, similar to:

```json
"devDependencies":{
    "@adobe/aem-cif-product-page-extension":"link: ../the/path/to/your/extension"
}
```
