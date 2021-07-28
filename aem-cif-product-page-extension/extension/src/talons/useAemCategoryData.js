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

import getCategoryFragment from '../queries/getCategoryFragment.gql';
import { useQuery } from '@apollo/client';
const useAemCategoryData = ({ categoryId }) => {
    const { data, error, loading } = useQuery(getCategoryFragment, {
        variables: { id: categoryId },
        context: { target: 'aem' }
    });

    let categoryData = undefined;

    if (data && data.categoryList && data.categoryList.items && data.categoryList.items.length > 0) {
        categoryData = data.categoryList.items[0];
    }

    return [
        {
            categoryData,
            loading,
            error
        }
    ];
};

export default useAemCategoryData;
