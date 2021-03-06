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
import { string, shape, number } from 'prop-types';
import classes from './categoryTitle.css';
import useAemCategoryData from '../../talons/useAemCategoryData';

const CategoryTitle = ({ categoryDetails }) => {
    const { categoryId, categoryName } = categoryDetails;
    const [{ categoryData, loading }] = useAemCategoryData({ categoryId });

    let title = '';

    if (loading) {
        title = '';
    } else {
        title = categoryData && categoryData.categoryName.length > 0 ? categoryData.categoryName : categoryName;
    }

    return <div className={classes.categoryTitle}>{title}</div>;
};

CategoryTitle.propTypes = {
    categoryDetails: shape({ categoryId: number.isRequired, categoryName: string.isRequired })
};

export default CategoryTitle;
