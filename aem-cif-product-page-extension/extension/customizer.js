module.exports = {
    applyCustomization: productFullDetail => {
        productFullDetail.addImport(`import {AfterProductData} from '@adobe/aem-cif-product-page-extension'`);
        productFullDetail.addImport(`import {BeforeProductData} from '@adobe/aem-cif-product-page-extension'`);
        productFullDetail.addImport(`import {ProductTitle} from '@adobe/aem-cif-product-page-extension'`);
        productFullDetail.insertBeforeJSX(
            `section className={classes.title}`,
            `<BeforeProductData productDetails={productDetails}>`
        );
        productFullDetail.insertAfterJSX(
            `section className={classes.details}`,
            `<AfterProductData productDetails={productDetails}>`
        );

        productFullDetail.replaceJSX(
            `<h1 className={classes.productName}>{productDetails.name}</h1>`,
            `<ProductTitle productDetails={productDetails}/>`
        );
    }
};
