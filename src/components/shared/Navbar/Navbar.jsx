import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { useState } from "react";


export default function Navbar() {
    const { user } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleBurgerClick = () => setMenuOpen((open) => !open);
    const handleMenuItemClick = () => setMenuOpen(false);

    return (
        <nav className={styles.nav}>
            <div className={styles.logo} >
                <NavLink to="/" >Syntaxa</NavLink>
            </div>
            <div className={styles.burger} onClick={handleBurgerClick} aria-label="Toggle menu">
                <span className={styles.burgerBar}>☰</span>
            </div>
            <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <li className={styles.menuItem} onClick={handleMenuItemClick}>
                    <NavLink to="/lectures" className={({ isActive }) => isActive ? styles.active : undefined}>Lectures</NavLink>
                </li>
                <li className={styles.menuItem} onClick={handleMenuItemClick}>
                    <NavLink to="/tasks" className={({ isActive }) => isActive ? styles.active : undefined}>Tasks</NavLink>
                </li>
                
                 {user ? (
                    <li className={styles.menuItem} onClick={handleMenuItemClick}>
                        <NavLink to="/sandbox" className={({ isActive }) => isActive ? styles.active : undefined}>Sandbox</NavLink>
                    </li>
                ) : null}
                <li className={styles.menuItemMobile} onClick={handleMenuItemClick}>
                    {user ? (
                        <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : undefined}>
                            {user.firstName} {user.lastName}
                        </NavLink>
                    ) : (
                        <button><NavLink className={styles.btn} to="/login" >Login</NavLink></button>
                    )}
                </li>
            </ul>
            <div className={styles.buttons}>
                <div className={styles.userSection}>
                    <span className={styles.userName}>
                        {/* Hide on mobile, show on desktop */}
                        <span className={styles.desktopOnly}>
                            {user ? (
                                <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : undefined}>
                                    {user.firstName} {user.lastName}
                                </NavLink>
                            ) : (
                                <div><NavLink className={styles.btn} to="/login" >Login</NavLink></div>
                            )}
                        </span>
                    </span>
                </div>
            </div>
        </nav>
    );
}