import styles from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo} ><NavLink to="/" >Syntaxa</NavLink></div>

            <ul className={styles.menu}>
                <li className={styles.menuItem}><NavLink to="/lectures" >Lectures</NavLink></li>
                <li className={styles.menuItem}><NavLink to="/tasks" >Tasks</NavLink></li>
                <li className={styles.menuItem}><NavLink to="/sandbox" >Sandbox</NavLink></li>
                <li className={styles.menuItem}><NavLink to="/profile" >Profile</NavLink></li>
            </ul>

            <div className={styles.buttons}>
                <NavLink className={styles.login} to="/login" >Login</NavLink>
            </div>
        </nav>
    );
}