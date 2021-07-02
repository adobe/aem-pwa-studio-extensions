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
import React, { Fragment } from 'react';
import Image from '@magento/venia-ui/lib/components/Image';
import { number } from 'prop-types';
import useAemCategoryData from '../../talons/useAemCategoryData';
import classes from './categoryPage.css';

const CategoryPage = ({ categoryId }) => {
    const [{ categoryData, error, loading }] = useAemCategoryData({ categoryId });

    if (loading) {
        return null;
    }
    let content = categoryData && categoryData.text ? categoryData.text.html : '';
    const image =
        categoryData && categoryData.heroBanner ? (
            <div className={classes.bannerContainer}>
                <Image alt="banner" src={categoryData.heroBanner._publishUrl} className={classes.banner} />
            </div>
        ) : (
            ''
        );
    console.log(categoryData);
    return (
        <div className={classes.container}>
            {image}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    );
};
CategoryPage.propTypes = {
    categoryId: number.isRequired
};

export default CategoryPage;
