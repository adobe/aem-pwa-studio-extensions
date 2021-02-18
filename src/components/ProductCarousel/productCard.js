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
import React from 'react';
import Price from '@magento/peregrine';

import classes from './productCard.css';

const ProductCard = (props) => {
    const {title} = props;
    return (
        <div aria-role="displaycard" className={`card ${classes.productcard}`}>
            <a href="#">
                <div className={classes['productcard-image']}>
                    <img className="product__image" src="" alt={title} />
                </div>
                <div>{title}</div>
                <div>Price placeholder</div>
            </a>
        </div>
    );
};

export default ProductCard;
