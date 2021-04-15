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
import React from 'react';
import { shape, string } from 'prop-types';
import getProductFragmentBySku from '../../queries/getProductFragment.gql';
import { useQuery } from '@apollo/client';
import classes from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.css';

const ProductTitle = ({ productDetails }) => {
    const { sku, name } = productDetails;
    const { loading, error, data } = useQuery(getProductFragmentBySku, {
        variables: { sku },
        context: { target: 'aem' }
    });

    let content = '';
    if (loading) {
        content = <p>Loading AEM data...</p>;
    }
    if (error) {
        content = (
            <p>
                <em>Error getting data from AEM</em>
            </p>
        );
        console.error(error);
    }
    if (data && data.productList && data.productList.items && data.productList.items.length > 0) {
        const productData = data.productList.items[0];
        content = productData ? <p>{productData.title}</p> : '';
    } else {
        content = name;
    }

    return <h1 className={classes.productName}>{content}</h1>;
};
ProductTitle.propTypes = {
    productDetails: shape({ sku: string.isRequired, name: string.isRequired })
};
export default ProductTitle;
