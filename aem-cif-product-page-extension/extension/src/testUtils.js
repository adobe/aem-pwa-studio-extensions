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
import getCategoryFragment from './queries/getCategoryFragment.gql';
import getProductFragmentBySku from './queries/getProductFragment.gql';

const productFragmentMock = {
    request: {
        query: getProductFragmentBySku,
        variables: { sku: 'VT01' },
        context: { target: 'aem' }
    },
    result: {
        data: {
            productList: {
                items: [
                    {
                        title: 'Mock title',
                        sku: 'VT01',
                        text: {
                            html: 'This is the mock data'
                        },
                        productImages: [
                            {
                                _publishUrl: 'http://localhost:4503/content/dam/venia/landing_page_image1.jpg',
                                __typename: 'ImageRef'
                            },
                            {
                                _publishUrl: 'http://localhost:4503/content/dam/venia/landing_page_image3.jpg',
                                __typename: 'ImageRef'
                            },
                            {
                                _publishUrl: 'http://localhost:4503/content/dam/venia/shop_the_latest_image2.jpg',
                                __typename: 'ImageRef'
                            }
                        ]
                    }
                ]
            }
        }
    }
};

const productFragmentEmpty = {
    request: {
        query: getProductFragmentBySku,
        variables: { sku: 'VT01' },
        context: { target: 'aem' }
    },
    result: {
        data: {
            productList: {
                items: []
            }
        }
    }
};

const categoryFragment = {
    request: {
        query: getCategoryFragment,
        variables: { id: '37' },
        context: { target: 'aem' }
    },
    result: {
        data: {
            categoryList: {
                items: [
                    {
                        categoryId: '37',
                        categoryName: 'Mock category name',
                        text: {
                            html: 'Mock text'
                        },
                        heroBanner: {
                            _publishUrl: 'http://localhost:4503/content/dam/venia/shop_the_latest_image1.jpg',
                            __typename: 'ImageRef'
                        }
                    }
                ]
            }
        }
    }
};
export { productFragmentMock, productFragmentEmpty, categoryFragment };
