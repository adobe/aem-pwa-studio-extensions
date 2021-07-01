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
import { CategoryTitle } from '../index';
import { categoryFragment } from '../../../testUtils';
import { render, screen, waitFor } from '@testing-library/react';
import 'regenerator-runtime/runtime';

describe('Category title', () => {
    it('renders the component with the correct data', async () => {
        const sampleComponent = (
            <MockedProvider addTypename={false} mocks={[categoryFragment]}>
                <CategoryTitle categoryDetails={{ categoryId: 37, categoryName: 'backup' }} />
            </MockedProvider>
        );

        render(sampleComponent);

        await waitFor(() => {
            screen.getByText('Mock category name');
        });
    });

    it('renders the component with fallback data', async () => {
        const sampleComponent = (
            <MockedProvider addTypename={false} mocks={[categoryFragment]}>
                <CategoryTitle categoryDetails={{ categoryId: 38, categoryName: 'Backup category name' }} />
            </MockedProvider>
        );

        render(sampleComponent);

        await waitFor(() => {
            screen.getByText('Backup category name');
        });
    });
});
