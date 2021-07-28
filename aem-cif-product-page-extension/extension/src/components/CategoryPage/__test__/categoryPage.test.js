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
import { MockedProvider } from '@apollo/client/testing';
import CategoryPage from '../categoryPage';
import { render, waitFor, screen } from '@testing-library/react';
import { categoryFragment } from '../../../testUtils';
import 'regenerator-runtime/runtime';

jest.mock('@magento/venia-ui/lib/components/Image', () => {
    // eslint-disable-next-line react/display-name
    return () => <img alt="no-img" role="img"></img>;
});
describe('Category page', () => {
    it('renders the correct data', async () => {
        const sampleComponent = (
            <MockedProvider addTypename={false} mocks={[categoryFragment]}>
                <CategoryPage categoryId={37} />
            </MockedProvider>
        );

        render(sampleComponent);

        await waitFor(() => {
            screen.getByText('Mock text');
        });
    });
});
