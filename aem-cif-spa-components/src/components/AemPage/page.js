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
import {Page, MapTo, withMappable, ResponsiveGrid} from '@adobe/aem-react-editable-components';
import {ProductTeaser, ProductTeaserEditConfig} from '../ProductTeaser';
import {ContentTeaser, ContentTeaserEditConfig} from '../ContentTeaser';
import {FeaturedCategories, FeaturedCategoriesEditConfig} from '../FeaturedCategories';
import {ProductCarousel, ProductCarouselEditConfig} from '../ProductCarousel';
import {ModelManager} from '@adobe/aem-spa-page-model-manager';
import {AemClient} from '../../AemClient';
import {useLocation} from 'react-router-dom';

const AemPage = (props) => {
    console.log(`Rendering an <AemPage> with `, props);
    const {url} = useLocation();

    let newProps = props;
    if (url === '/') {
        props = {cqPath: '/content/venia/us/en/home', ...props};
    }

    const modelClient = new AemClient({
        url: AEM_URL,
        config: {
            headers: {
                Authorization: `Basic ${AEM_AUTH_TOKEN}`,
            },
        },
    });

    ModelManager.initialize({modelClient, path: props.cqPath});
    ModelManager.getData(props.cqPath);

    return <Page {...newProps} />;
};

export default withMappable(AemPage);

MapTo('venia/components/commerce/productteaser')(ProductTeaser, ProductTeaserEditConfig);
MapTo('venia/components/container')(ResponsiveGrid, {
    emptyLabel: 'Container',
    isEmpty: (props) => {
        return props.cqItemsOrder && props.cqItemsOrder.length > 0;
    },
    resourceType: 'venia/components/container',
});
MapTo('core/cif/components/content/teaser/v1/teaser')(ContentTeaser, ContentTeaserEditConfig);
MapTo('core/cif/components/commerce/featuredcategorylist/v1/featuredcategorylist')(
    FeaturedCategories,
    FeaturedCategoriesEditConfig
);
MapTo('core/cif/components/commerce/productcarousel/v1/productcarousel')(ProductCarousel, ProductCarouselEditConfig);
