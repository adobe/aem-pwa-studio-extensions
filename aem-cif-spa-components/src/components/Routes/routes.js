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
import React, {Suspense} from 'react';
import {fullPageLoadingIndicator} from '@magento/venia-ui/lib/components/LoadingIndicator';
import MagentoRoute from '@magento/venia-ui/lib/components/MagentoRoute';
import {useScrollTopOnChange} from '@magento/peregrine/lib/hooks/useScrollTopOnChange';
import {Route, Switch, useLocation} from 'react-router-dom';
import {PathUtils} from '@adobe/aem-spa-page-model-manager';
import {AemPage} from '../AemPage';

const Routes = () => {
    const AEM_HOST = 'http://localost:4502';
    const AEM_PROJECT_ROOT = '/content/venia/us/en';

    const {pathname} = useLocation();
    console.log(`Custom Routes component here, handling path ${pathname}`);
    useScrollTopOnChange(pathname);
    const pathToRoute = PathUtils.toAEMPath(pathname, AEM_HOST, AEM_PROJECT_ROOT);
    console.log(`Path to route: ${pathToRoute}`);
    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                <Route path={`${AEM_PROJECT_ROOT}/*`}>
                    <AemPage pagePath={pathname.slice(0, pathname.indexOf('.'))} />
                </Route>
                <Route exact path="/">
                    <AemPage pagePath={pathname.slice(0, pathname.indexOf('.'))} />
                </Route>
                <Route path="/">
                    <MagentoRoute />
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
