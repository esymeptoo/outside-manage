/**
 * Created by e on 17/3/29.
 */
import React, { PropTypes } from 'react';
import cssModule from 'react-css-modules';
import styles from './topaside.less';
function Layout({nav, sider, children }) {
    const styledNav = nav ? React.cloneElement(nav, { style: { lineHeight: '64px', borderBottom: 0 } }) : null;
    return (<div className={styles.topaside}>
        <div className={styles.header}>
            <div className={styles.wrapper}>
                {styledNav}
            </div>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.sider}>{sider}</div>
                <div className={styles.content}>
                    <div style={{ height: 1040 }}>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
            </div>
        </div>
    </div>);
}
Layout.propTypes = {
    logo: PropTypes.element,
    nav: PropTypes.element,
    sider: PropTypes.element,
    children: PropTypes.node,
};
Layout.defaultProps = {
    logo: null,
    nav: null,
    sider: null,
    children: null,
};
export default cssModule(Layout, styles);
