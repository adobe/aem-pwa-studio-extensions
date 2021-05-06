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

import { Link, useLocation } from '@magento/venia-ui/lib/drivers';

import classes from './MegaMenuBlogItem.css';

const MegaMenuBlogItem = () => {
    const location = useLocation();
    const isActive = location.pathname.startsWith('/blog');

    return (
        <div className={classes.megaMenuItem}>
            <Link className={isActive ? classes.megaMenuLinkActive : classes.megaMenuLink} to="/blog">
                Blog
            </Link>
        </div>
    );
};

export default MegaMenuBlogItem;
