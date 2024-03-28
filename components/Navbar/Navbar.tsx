'use client'
import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation';
import { DESTINATIONS, NEWSLETTER, TIPS } from '@/constants';

const Navbar = () => {

    const currentPath = usePathname();

    const activeLinkTabCssClass = (link: string) => currentPath === link ? styles.active : styles.normal;

    const links = [
        { link: '/', title: 'Home' },
        { link: `/${DESTINATIONS}`, title: 'Destinations' },
        { link: `/${TIPS}`, title: 'Tips' },
        { link: `/${NEWSLETTER}`, title: 'Newsletter' },
    ];

    const renderLinks = () => (

        links.map((itm, idx) => (
            <li className={styles.linkListItem} key={itm.title}>
                <Link className={`${styles.linkTag} ${activeLinkTabCssClass(itm.link)}`} href={itm.link} >
                    {itm.title}
                </Link>
            </li>
        ))
    );


    return (
        <nav className={`${styles.container} ${styles.active}`}>
            <Link href='/' className={styles.logo}>Travel</Link>
            <div id='toggle' className={`${styles.toggle} ${styles.activate}`}></div>
            <div className={styles.group} id='navbar'>
                <ul className={styles.navigation}>
                    { renderLinks() }
                </ul>
                {/* <ul className={styles.action}>

                </ul> */}
            </div>
        </nav>
    )
    
}

export default Navbar;