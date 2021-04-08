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

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import ErrorView from '@magento/venia-ui/lib/components/ErrorView';

import { GET_BLOG_POST_BY_PATH_QUERY } from './GetBlogPostByPath.gql.js';

import classes from './BlogPostPage.css';

const BlogPostPage = () => {
    const prefix = '/content/dam/blog-demo';
    const { slug } = useParams();
    const path = `${prefix}/${slug}`;

    const { loading, error, data } = useQuery(GET_BLOG_POST_BY_PATH_QUERY, {
        context: { target: 'aem' },
        variables: { path }
    });

    let child;
    if (loading) {
        child = fullPageLoadingIndicator;
    }

    if (error) {
        child = (
            <ErrorView>
                <h1>Could not load blog post</h1>
            </ErrorView>
        );
    }

    const renderTags = tag => {
        let parts = tag.split(':');
        if (parts.length === 2) {
            tag = parts[1];
        }
        return <li key={tag}>{tag}</li>;
    };

    if (data) {
        const post = data.blogpostByPath.item;
        const author = post.publishedBy;

        let publishedAt = '';
        try {
            publishedAt = new Date(post.publishedAt);
            publishedAt = publishedAt.toLocaleString();
        } catch (err) {
            // Ignore
        }

        child = (
            <>
                <div className={classes.heroImage}>
                    <img src={post.heroImage._publishUrl} alt={post.title} title={post.title} />
                </div>
                <div className={classes.title}>
                    <h1>{post.title}</h1>
                    <span className={classes.date}>{publishedAt}</span>
                </div>
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.content.html }} />
                <ul className={classes.tags}>{post.categories.map(renderTags)}</ul>
                <hr />
                <h2 className={classes.authorH2}>About the author</h2>
                <div className={classes.author}>
                    <div className={classes.authorPhoto}>
                        <img src={author.photo._publishUrl} alt={author.name} title={author.name} />
                    </div>
                    <div className={classes.authorBody}>
                        <div className={classes.authorName}>{author.name}</div>
                        <div className={classes.authorBio}>{author.bio.plaintext}</div>
                        <ul className={classes.authorContact}>
                            {author.email && (
                                <li>
                                    <a href={`mailto:${author.email}`}>E-Mail</a>
                                </li>
                            )}
                            {author.twitter && (
                                <li>
                                    <a href={author.twitter}>Twitter</a>
                                </li>
                            )}
                            {author.facebook && (
                                <li>
                                    <a href={author.facebook}>Facebook</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </>
        );
    }

    return <article className={classes.root}>{child}</article>;
};

export default BlogPostPage;
