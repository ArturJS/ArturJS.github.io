import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { formatReadingTime } from '../utils';

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const siteDescription = get(
            this,
            'props.data.site.siteMetadata.description'
        );
        const posts = get(this, 'props.data.allMarkdownRemark.edges');

        console.log(this.props.data);

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO />
                {posts.map(({ node }) => {
                    const title =
                        get(node, 'frontmatter.title') || node.fields.slug;
                    return (
                        <div key={node.fields.slug} className="article-item">
                            <h3>
                                <Link
                                    style={{ boxShadow: 'none' }}
                                    to={node.fields.slug}>
                                    {title}
                                </Link>
                            </h3>
                            <small>
                                {node.frontmatter.date}
                                {` • ${formatReadingTime(node.timeToRead)}`}
                            </small>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: node.frontmatter.spoiler
                                }}
                            />
                        </div>
                    );
                })}
            </Layout>
        );
    }
}

export default BlogIndex;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    fields {
                        slug
                    }
                    timeToRead
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        spoiler
                    }
                }
            }
        }
    }
`;
