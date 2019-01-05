import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { formatReadingTime } from '../utils';

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = get(this.props, 'data.site.siteMetadata.title');
        const { previous, next, slug } = this.props.pageContext;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.spoiler}
                    slug={post.fields.slug}
                />
                <h1>{post.frontmatter.title}</h1>
                <p
                    style={{
                        display: 'block'
                    }}>
                    {post.frontmatter.date}
                    {` • ${formatReadingTime(post.timeToRead)}`}
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <ul
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        listStyle: 'none',
                        padding: 0
                    }}>
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </Layout>
        );
    }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            timeToRead
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                spoiler
            }
            fields {
                slug
            }
        }
    }
`;
