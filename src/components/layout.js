import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
            <>
                <Header siteTitle={data.site.siteMetadata.title} />
                <div className="base-page">
                    <div className="base-page__content">{children}</div>
                    <footer className="base-page__footer">
                        © {new Date().getFullYear()}, Built with
                        {` `}
                        <a href="https://www.gatsbyjs.org">Gatsby</a>
                    </footer>
                </div>
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
