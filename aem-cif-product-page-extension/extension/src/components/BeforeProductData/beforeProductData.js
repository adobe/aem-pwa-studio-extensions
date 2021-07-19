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
import useAemProductData from '../../talons/useAemProductData';
import classes from './beforeProductData.css';

const BeforeProductData = ({ productDetails }) => {
    const { sku } = productDetails;
    const [{ loading, productData }] = useAemProductData({ sku });

    let content = '';

    if (loading) {
        content = <p>Loading AEM data...</p>;
    }

    content = productData ? productData.text.html : '';

    return <section className={classes.section} dangerouslySetInnerHTML={{ __html: content }}></section>;
};

BeforeProductData.propTypes = {
    productDetails: shape({ sku: string.isRequired })
};

export default BeforeProductData;
