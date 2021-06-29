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
import { arrayOf, shape, string } from 'prop-types';
import classes from './productImages.css';

const ProductImages = ({ productImages }) => {
    if (!productImages || productImages.length === 0) {
        return null;
    }

    return (
        <div className={classes.container}>
            {productImages.map(({ _publishUrl }) => {
                const name = _publishUrl.substring(_publishUrl.lastIndexOf('/'), _publishUrl.length);
                return <img key={name} src={_publishUrl} alt={name} role="img" className={classes.productImage} />;
            })}
        </div>
    );
};

ProductImages.propTypes = {
    productImages: arrayOf(shape({ _publishUrl: string.isRequired }))
};

export default ProductImages;
