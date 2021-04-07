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
import {array, bool, string} from 'prop-types';
import React from 'react';

import ActionItem from './actionItem';
import classes from './contentTeaser.css';

export const ContentTeaserEditConfig = {
    emptyLabel: 'Teaser',
    isEmpty: (props) => {
        if (props.actions && props.actions.length > 0) {
            return false;
        }

        if (props.assetPath) {
            return false;
        }

        if (props.title || props.pretitle || props.description) {
            return false;
        }

        return true;
    },
};

const ContentTeaser = (props) => {
    const {description, title, actionsEnabled, actions} = props;

    const assetPath = props?.assetPath;

    return (
        <div className="teaser">
            <div id="teaser" className="cmp-teaser">
                <div className={classes.image}>
                    <div className="cmp-image">
                        {assetPath && (
                            <img
                                src={`${AEM_URL}/${assetPath}`}
                                className={classes.image}
                                itemProp="contentUrl"
                                data-cmp-hook-image="image"
                                alt={title}
                                title={title}
                            />
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>{title}</h2>
                    <div className={classes.description}>
                        <div dangerouslySetInnerHTML={{__html: description}} />
                    </div>
                    {actionsEnabled &&
                        actions.map((action) => {
                            return <ActionItem key={action.title} {...action} />;
                        })}
                </div>
            </div>
        </div>
    );
};

ContentTeaser.propTypes = {
    actionsEnabled: bool,
    actions: array,
    description: string,
    title: string,
};

export default ContentTeaser;
