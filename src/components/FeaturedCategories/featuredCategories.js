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
import { useQuery } from '@apollo/client';
import { any, arrayOf, bool, shape, string } from 'prop-types';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

import CategoryListItem from './categoryListItem';
import getCategoryByIds from './getCategoriesByIds.graphql';
import classes from './featuredCategories.css';

export const FeaturedCategoriesEditConfig = {
    emptyLabel: 'Featured categories',
    isEmpty: props => {
        const isEmpty = props.categoryItems.length === 0;
        return isEmpty;
    },
    resourceType:
        'core/cif/components/commerce/featuredcategorylist/v1/featuredcategorylist'
};

const FeaturedCategories = props => {
    const { categoryItems, title } = props;

    const { data, loading, error } = useQuery(getCategoryByIds, {
        variables: {
            ids: categoryItems.map(item => item.categoryIdentifier.value)
        }
    });

    if (loading) {
        return <LoadingIndicator />;
    }

    let categories = [];
    if (data && data.categories) {
        categories = data.categories.items;
    }

    if (!props.configured) {
        return null;
    }

    const getOverlayImage = id => {
        const item = categoryItems.find(
            item => item.categoryIdentifier.value === id.toString()
        );
        return item && item.assetPath !== null
            ? `${AEM_URL}${item.assetPath}`
            : '';
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                {title && <h2 class={classes.title}>{title}</h2>}
            </div>
            <div className={classes.content}>
                {categories.map(item => {
                    return (
                        <CategoryListItem
                            key={item.id}
                            {...item}
                            assetPath={getOverlayImage(item.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

FeaturedCategories.propTypes = {
    categoryItems: arrayOf(
        shape({
            categoryIdentifier: shape({
                type: string.isRequired,
                value: any.isRequired,
                entityType: string.isRequired
            }).isRequired,
            assetPath: string
        })
    ),
    title: string,
    configured: bool
};

export default FeaturedCategories;
