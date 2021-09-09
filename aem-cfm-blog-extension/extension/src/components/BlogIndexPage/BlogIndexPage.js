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

import { useQuery } from '@apollo/client';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import ErrorView from '@magento/venia-ui/lib/components/ErrorView';
import { Link } from 'react-router-dom';

import { GET_BLOG_POSTS_QUERY } from './GetBlogPosts.gql.js';

import classes from './BlogIndexPage.css';

const BlogIndexPage = () => {
    const prefix = '/content/dam/blog-demo';
    const variation = 'short';

    const { loading, error, data } = useQuery(GET_BLOG_POSTS_QUERY, {
        context: { target: 'aem' },
        variables: { variation }
    });

    let child;
    if (loading) {
        child = fullPageLoadingIndicator;
    }

    if (error) {
        child = (
            <ErrorView>
                <h1>Could not load blog posts</h1>
            </ErrorView>
        );
    }

    const pathToSlug = path => {
        if (path.indexOf(prefix) === 0) {
            return path.slice(prefix.length);
        }
        return path;
    };

    const renderPost = post => {
        let publishedAt = '';
        try {
            publishedAt = new Date(post.publishedAt);
            publishedAt = publishedAt.toLocaleString();
        } catch (err) {
            // Ignore
        }

        const articleUrl = `/blog${pathToSlug(post._path)}`;

        return (
            <div key={post._path} className={classes.post}>
                <div className={classes.heroImage}>
                    <Link to={articleUrl}>
                        <img src={post.heroImage._publishUrl} alt={post.title} title={post.title} />
                    </Link>
                </div>
                <div className={classes.body}>
                    <div className={classes.title}>
                        <Link to={articleUrl}>
                            <h2>{post.title}</h2>
                        </Link>
                    </div>
                    <div className={classes.content}>{post.content.plaintext}</div>
                    <div className={classes.footer}>
                        <div className={classes.date}>{publishedAt}</div>
                        <div className={classes.author}>by {post.publishedBy.name}</div>
                    </div>
                </div>
            </div>
        );
    };

    if (data) {
        // Manual sorting by date, ignore date parsing errors
        let sortedPosts = [...data.blogpostList.items];
        try {
            sortedPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } catch (err) {
            // Ignore
        }

        child = <section>{sortedPosts.map(renderPost)}</section>;
    }

    return (
        <article className={classes.root}>
            <h1>Blog</h1>
            {child}
        </article>
    );
};

export default BlogIndexPage;
