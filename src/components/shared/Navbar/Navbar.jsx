import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../../context/UserContext";


export default function Navbar() {
    const { user } = useUser();

    return (
        <nav className={styles.nav}>
            <div className={styles.logo} >
                <NavLink to="/" >Syntaxa</NavLink>
            </div>

            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <NavLink to="/lectures" >Lectures</NavLink>
                </li>
                <li className={styles.menuItem}>
                    <NavLink to="/tasks" >Tasks</NavLink>
                </li>
                <>
                    <li className={styles.menuItem}>
                        <NavLink to="/sandbox" >Sandbox</NavLink>
                    </li>
                </>
            </ul>

            <div className={styles.buttons}>
                {user ? (
                    <div className={styles.userSection}>
                        <span className={styles.userName}>
                            <NavLink to="/profile" >{user.firstName} {user.lastName}</NavLink>
                        </span>
                    </div>
                ) : (
                    <NavLink className={styles.btn} to="/login" >Login</NavLink>
                )}
            </div>
        </nav>
    );
}