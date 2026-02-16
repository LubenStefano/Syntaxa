import { addDoc, collection, getDocs, query, orderBy, limit, getDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useErrorHandler as createErrorHandler } from '../hooks/useErrorHandler';

const request = {
  async getAll(collectionName, signal, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const snapshot = await getDocs(collection(db, collectionName), { signal });
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleError(error, 'Failed to fetch all documents.');
      }
    }
  },

  async create(collectionName, data, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      handleError(error, 'Failed to create document.');
    }
  },

  async getLatest(collectionName, count = 10, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"), limit(count));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleError(error, 'Failed to fetch latest documents.');
    }
  },

  async getById(collectionName, id, signal, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef, { signal });
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null; // Return null if no document is found
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleError(error, `Failed to fetch document with ID ${id}.`);
      }
    }
  },

  async registerUser(email, password, additionalData, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        id: user.uid,
        createdAt: new Date().toISOString(),
        email,
        savedTasks: [],
        validated: false, // Default field
        admin: false, // Default field
        ...additionalData
      });
      return user;
    } catch (error) {
      handleError(error, 'Failed to register user.');
    }
  },

  async loginUser(email, password, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return { error: "User data not found in Firestore." };
      }
      return { id: user.uid, email: user.email, ...userDoc.data() };
    } catch (error) {
      handleError(error, 'Failed to log in user.');
      return { error: error.message || 'An unexpected error occurred.' }; // Return error object instead of throwing
    }
  },

  async logoutUser(addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      await auth.signOut();
    } catch (error) {
      handleError(error, 'Failed to log out user.');
    }
  },

  async createLecture(data, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const lectureData = {
        ...data,
        createdAt: new Date().toISOString(),
      };
      return await addDoc(collection(db, "lectures"), lectureData);
    } catch (error) {
      handleError(error, 'Failed to create a new lecture.');
    }
  },

  async getAllLectures(addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const snapshot = await getDocs(collection(db, "lectures"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleError(error, "Failed to fetch lectures.");
    }
  },

  async getSingleLecture(id, signal, addNotification) {
    return await this.getById("lectures", id, signal, addNotification);
  },

  async createTask(data, addNotification) {
    const { handleError } = createErrorHandler(addNotification);
    try {
      const taskData = {
        ...data,
        createdAt: new Date().toISOString(),
      };
      return await addDoc(collection(db, "tasks"), taskData);
    } catch (error) {
      handleError(error, 'Failed to create a new task.');
    }
  },
};

export async function updateField(collection, id, field, value) {
  const { handleError } = createErrorHandler();
  try {
    const docRef = doc(db, collection, id);
    await setDoc(docRef, { [field]: value }, { merge: true });
  } catch (error) {
    handleError(error, `Failed to update field ${field} in document with ID ${id}.`);
  }
}

export { request };

