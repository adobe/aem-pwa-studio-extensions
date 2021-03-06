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
import { AfterProductData } from '../index';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import 'regenerator-runtime/runtime';

import { productFragmentMock } from '../../../testUtils';

describe('AfterProductData', () => {
    it('renders the component with data', async () => {
        const sampleComponent = (
            <MockedProvider addTypename={false} mocks={[productFragmentMock]}>
                <AfterProductData productDetails={{ sku: 'VT01', name: 'backup' }} />
            </MockedProvider>
        );

        render(sampleComponent);

        await waitFor(() => {
            screen.getByText('This is the mock data');
            screen.getAllByRole('img');
        });
    });
});
