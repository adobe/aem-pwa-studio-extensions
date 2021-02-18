/*******************************************************************************
 *
 *    Copyright 2020 Adobe. All rights reserved.
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
import {string, arrayOf, shape} from 'prop-types';
import React from 'react';

const ProductCarouselEditConfig = {
    isEmpty: (props) => {
        return !props.productIdenfiers || props.productIdenfiers.length === 0;
    },
    resourceType: 'core/cif/components/commerce/productcarousel/v1/productcarousel',
};

const ProductCarousel = (props) => {
    const {productIdentifiers} = props;

    const skus = productIdentifiers.map((item) => item.commerceIdentifier.value);

    console.log(`Got skus `, skus);

    const carouselSettings = {
        slidesToShow: 4,
        dots: true,
        infinite: true,
        skus,
        appearance: 'carousel',
    };

    //  return <Products {...carouselSettings} />;
    return <div>This will be the product carousel</div>;
};

ProductCarousel.propTypes = {
    productIdentifiers: arrayOf(
        shape({
            id: string,
            commerceIdentifier: shape({
                entityType: string.isRequired,
                value: string.isRequired,
                type: string.isRequired,
            }).isRequired,
        })
    ),
};

export {ProductCarouselEditConfig};
export default ProductCarousel;
