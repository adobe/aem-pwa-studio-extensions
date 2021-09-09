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
import { ApolloLink, createHttpLink } from '@apollo/client';

export default function linkWrapper(link) {
    // Expect the AEM GraphQL endpoint to be at {pwa-studio}/endpoint.json, proxied via UPWARD
    const aemGraphql = new URL('/endpoint.json', location.origin).toString();
    return ApolloLink.split(
        operation => {
            // If the context contains a target and that target is AEM, route the request to the newly created Apollo
            // link instance, otherwise use the wrapped one, which is usually going to Magento.
            return operation.getContext().target === 'aem';
        },
        createHttpLink({ uri: aemGraphql }),
        link
    );
}
