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
module.exports = {
    applyProductPageCustomization: targetables => {
        const productFullDetail = targetables.reactComponent(
            '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
        );

        // Uncomment the lines below if you want some data before the product data from Magento

        // productFullDetail.addImport(`import {BeforeProductData} from '@adobe/aem-cif-product-page-extension'`);
        // productFullDetail.insertBeforeJSX(
        //     `section className={classes.title}`,
        //     `<BeforeProductData productDetails={productDetails}>`
        // );

        productFullDetail.addImport(`import {ProductTitle} from '@adobe/aem-cif-product-page-extension'`);
        productFullDetail.replaceJSX(
            `<h1 className={classes.productName}>{productDetails.name}</h1>`,
            `<ProductTitle productDetails={productDetails}/>`
        );

        productFullDetail.addImport(`import {AfterProductData} from '@adobe/aem-cif-product-page-extension'`);
        productFullDetail.appendJSX(`Fragment`, `<AfterProductData productDetails={productDetails}/>`);
    },

    applyCategoryPageCustomization: targetables => {
        const categoryContent = targetables.reactComponent(
            '@magento/venia-ui/lib/RootComponents/Category/categoryContent.js'
        );

        categoryContent.addImport(`import {CategoryTitle} from '@adobe/aem-cif-product-page-extension'`);
        categoryContent.replaceJSX(
            `<div className={classes.categoryTitle}>{categoryName}</div>`,
            `<CategoryTitle categoryDetails={{categoryId, categoryName}}/>`
        );
    }
};
