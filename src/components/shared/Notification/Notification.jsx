import React, { useState } from "react";
import styles from "./Notification.module.css";

const NotificationContext = React.createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  function addNotification(type, message) {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000); // Auto-dismiss after 3 seconds
  }

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className={styles.notificationContainer}>
        {notifications.map((n) => (
          <div key={n.id} className={`${styles.notification} ${styles[n.type]}`}>
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export { NotificationContext };
