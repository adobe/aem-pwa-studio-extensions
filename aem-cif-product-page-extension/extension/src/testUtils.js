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
                            html: 'This is the mock data',
                            markdown: 'This is the mock data',
                            plaintext: 'This is the mock data',
                            json: [
                                {
                                    nodeType: 'paragraph',
                                    content: [
                                        {
                                            nodeType: 'text',
                                            value: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        productImage: {
                            type: 'image',
                            _path: '/the/path/of/the/image.jpg'
                        }
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
export { productFragmentMock, productFragmentEmpty };
