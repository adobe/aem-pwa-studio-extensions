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
import { ProductTitle } from '../index';
import 'regenerator-runtime/runtime';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { productFragmentMock, productFragmentEmpty } from '../../../testUtils';

describe('Product title', () => {
    it('renders the component with correct data', async () => {
        const sampleComponent = (
            <MockedProvider addTypename={false} mocks={[productFragmentMock]}>
                <ProductTitle productDetails={{ sku: 'VT01', name: 'backup' }} />
            </MockedProvider>
        );

        render(sampleComponent);

        await waitFor(() => {
            screen.getByText('Mock title');
        });
    });
    it('renders the component with fall-back data', async () => {
        const sampleComponent = (
            <MockedProvider addTypename={false} mocks={[productFragmentEmpty]}>
                <ProductTitle productDetails={{ sku: 'VT01', name: 'Product name' }} />
            </MockedProvider>
        );

        render(sampleComponent);

        await waitFor(() => {
            screen.getByText('Product name');
        });
    });
});
