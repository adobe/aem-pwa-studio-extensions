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
import React, {useEffect, useState} from 'react';
import {string, shape} from 'prop-types';
import {useLazyQuery} from '@apollo/client';

import getCategoryById from './getCategoryById.graphql';
const ActionItem = (props) => {
    const {title, entityIdentifier} = props;

    const [runCategoryQuery, result] = useLazyQuery(getCategoryById);
    const {data} = result;

    const [actionUrl, setActionUrl] = useState('#');

    useEffect(() => {
        if (entityIdentifier && entityIdentifier.entityType === 'CATEGORY') {
            runCategoryQuery({variables: {id: entityIdentifier.value}});
        }
    }, [entityIdentifier, runCategoryQuery]);

    useEffect(() => {
        if (data && data.category) {
            const {url_path, url_suffix} = data.category;
            setActionUrl(`/${url_path}.${url_suffix}`);
        }
    }, [data]);

    useEffect(() => {
        if (entityIdentifier && entityIdentifier.entityType === 'PRODUCT') {
            setActionUrl(`/${entityIdentifier.value}.html`);
        }
    }, [entityIdentifier]);

    return (
        <button priority="high" onClick={() => (window.location.href = actionUrl)}>
            {title}
        </button>
    );
};

ActionItem.propTypes = {
    title: string,
    entityIdentifier: shape({
        entityType: string.isRequired,
        type: string.isRequired,
        value: string.isRequired,
    }),
};

export default ActionItem;
