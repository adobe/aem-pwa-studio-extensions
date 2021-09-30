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
const { Targetables } = require('@magento/pwa-buildpack');

module.exports = targets => {
    const targetables = Targetables.using(targets);

    // Add Apollo link wrapper
    const useAdapter = targetables.esModule('@magento/peregrine/lib/talons/Adapter/useAdapter.js');
    useAdapter.addImport(`import { linkWrapper } from '@adobe/pwa-studio-aem-cfm-blog-extension';`);

    const replaceTerm = 'link: apolloLink,';
    useAdapter.spliceSource({
        before: replaceTerm,
        remove: replaceTerm.length,
        insert: 'link: linkWrapper(apolloLink),'
    });

    // Add Blog item to Navigation component
    const NavigationComponent = targetables.reactComponent('@magento/venia-ui/lib/components/Navigation/navigation.js');
    NavigationComponent.addImport(`import { NavigationBlogButton } from '@adobe/pwa-studio-aem-cfm-blog-extension'`);
    NavigationComponent.appendJSX('div className={bodyClassName}', '<NavigationBlogButton onClick={handleClose} />');

    // Add Blog item to MegaMenu component
    const MegaMenuComponent = targetables.reactComponent('@magento/venia-ui/lib/components/MegaMenu/megaMenu.js');
    MegaMenuComponent.addImport(`import { MegaMenuBlogItem } from '@adobe/pwa-studio-aem-cfm-blog-extension'`);
    MegaMenuComponent.appendJSX('nav role="navigation"', '<MegaMenuBlogItem />');
};
