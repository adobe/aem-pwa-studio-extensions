/*******************************************************************************
 *
 *     Copyright 2020 Adobe. All rights reserved.
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
import {ModelClient} from '@adobe/aem-spa-page-model-manager';

const FETCH_CONFIG = {
    headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
    },
};

export class AemClient extends ModelClient {
    constructor({url, config}) {
        super(url);

        this._fetchConfig = config;
    }

    fetch(modelPath) {
        if (!modelPath) {
            const err = `Fetching model for path ${modelPath} failed`;
            return Promise.reject(err);
        }

        const url = `${this._apiHost}${modelPath}`;
        console.log(`Fetching model from ${url}`);
        return fetch(url, this._fetchConfig)
            .then((response) => {
                const {status, statusText} = response;
                if (status >= 200 && status < 300) {
                    return response.json();
                } else {
                    const error = new Error(`Error fetching the model for url ${url}:`, statusText || status);
                    return Promise.reject(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
