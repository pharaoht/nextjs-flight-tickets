'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation';
import { DESTINATIONS, NEWSLETTER, TIPS } from '@/constants';
import Button from '@mui/material/Button/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {

    const [ isActive, setIsActive ] = useState(false);

    const [ showButton, setShowButton ] = useState(true);

    const currentPath = usePathname();

    const activeLinkTabCssClass = (link: string) => currentPath === link ? styles.active : styles.normal;

    const links = [
        { link: '/', title: 'Home' },
        { link: `/${DESTINATIONS}`, title: 'Destinations' },
        { link: `/${TIPS}`, title: 'Tips' },
        { link: `/${NEWSLETTER}`, title: 'Newsletter' },
    ];

    const handleOnClick = () => {
        if(isActive){
            setIsActive(false)
        }
    }

    const renderLinks = () => (

        links.map((itm, idx) => (
            <li className={styles.linkListItem} key={itm.title} onClick={handleOnClick}>
                <Link className={`${styles.linkTag} ${activeLinkTabCssClass(itm.link)}`} href={itm.link} >
                    {itm.title}
                </Link>
            </li>
        ))
    );

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setShowButton(scrollPosition === 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {

        if (isActive) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        
    }, [isActive]);


    return (
        <nav className={`${styles.container} ${ isActive ? styles.active: ''}`}>
            <Link href='/' className={styles.logo}>Travel</Link>
            <div id='toggle' className={`${styles.toggle}`}>
                { showButton &&
                    <Button 
                        sx={{background:'#00a698'}}
                        color='primary'
                        variant="contained"
                        size='small'
                        onClick={() => setIsActive(prev => !prev)}
                    >
                        { !isActive ? <MenuIcon/> : <CloseIcon/>}
                    </Button>
                }
            </div>
            <div className={`${styles.group}`} id='navbar'>
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