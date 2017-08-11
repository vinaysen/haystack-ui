/*
 * Copyright 2017 Expedia, Inc.
 *
 *       Licensed under the Apache License, Version 2.0 (the "License");
 *       you may not use this file except in compliance with the License.
 *       You may obtain a copy of the License at
 *
 *           http://www.apache.org/licenses/LICENSE-2.0
 *
 *       Unless required by applicable law or agreed to in writing, software
 *       distributed under the License is distributed on an "AS IS" BASIS,
 *       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *       See the License for the specific language governing permissions and
 *       limitations under the License.
 *
 */

function parseQueryUrl(query) {
    const queryDict = {};

    if (!query || query.length <= 1) return {};

    query.substr(1)
        .split('&')
        .forEach((item) => {
            queryDict[decodeURIComponent(item.split('=')[0])] = decodeURIComponent(item.split('=')[1]);
        });
    return queryDict;
}

export const toQuery = (query, match) => {
    const queryDict = parseQueryUrl(query);

    // set defaults timerange if not present already
    if (!(queryDict.timePreset || (queryDict.startTime && queryDict.endTime))) {
        queryDict.timePreset = '5m';
    }

    // set serviceName using path param if query doesnt have serviceName key
    if (!query.serviceName) {
        queryDict.serviceName = match.params.serviceName;
    }

    return queryDict;
};

export const toQueryUrl = query => Object
    .keys(query)
    .filter(key => query[key])
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
