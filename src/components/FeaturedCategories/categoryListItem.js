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
import {string} from 'prop-types';
import React from 'react';

import classes from './featuredCategories.css';

const CategoryListItem = ({url_path, name, image, assetPath}) => {
    const imageSrc = assetPath ? assetPath : image;

    return (
        <a className={classes.anchor} href={url_path}>
            <span className={classes.imagewrapper} style={{backgroundImage: `url(${imageSrc})`}}>
                <img className={classes.image} src={imageSrc} alt={name} />
            </span>
            <span className={classes.name}>{name}</span>
        </a>
    );
};

export default CategoryListItem;

CategoryListItem.propTypes = {
    name: string.isRequired,
    assetPath: string,
    url_path: string,
    image: string,
};
