import { addDoc, collection, getDocs, query, orderBy, limit, getDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useErrorHandler as createErrorHandler } from '../hooks/useErrorHandler';

export const request = {
  async getAll(collectionName, signal) {
    const { handleError } = createErrorHandler();
    try {
      const snapshot = await getDocs(collection(db, collectionName), { signal });
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleError(error, 'Failed to fetch all documents.');
      }
    }
  },

  async create(collectionName, data) {
    const { handleError } = createErrorHandler();
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      handleError(error, 'Failed to create document.');
    }
  },

  async getLatest(collectionName, count = 10) {
    const { handleError } = createErrorHandler();
    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"), limit(count));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleError(error, 'Failed to fetch latest documents.');
    }
  },

  async getById(collectionName, id, signal) {
    const { handleError } = createErrorHandler();
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

  async registerUser(email, password, additionalData) {
    const { handleError } = createErrorHandler();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        id: user.uid,
        createdAt: new Date().toISOString(),
        email,
        savedTasks: [],
        ...additionalData
      });
      return user;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please log in or use a different email.');
      }
      handleError(error, 'Failed to register user.');
      throw error; 
    }
  },

  async loginUser(email, password) {
    const { handleError } = createErrorHandler();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }
      return { id: user.uid, email: user.email, ...userDoc.data() }; 
    } catch (error) {
      handleError(error, 'Failed to log in user.');
      throw error; 
    }
  },

  async logoutUser() {
    const { handleError } = createErrorHandler();
    try {
      await auth.signOut();
    } catch (error) {
      handleError(error, 'Failed to log out user.');
    }
  },

  async createLecture(data) {
    const { handleError } = createErrorHandler();
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

  async getAllLectures() {
    const { handleError } = createErrorHandler();
    try {
      const snapshot = await getDocs(collection(db, "lectures"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleError(error, "Failed to fetch lectures.");
    }
  },

  async getSingleLecture(id, signal) {
    return await this.getById("lectures", id, signal);
  },

  async createTask(data) {
    const { handleError } = createErrorHandler();
    try {
      const taskData = {
        ...data,
        createdAt: new Date().toISOString(),
      };
      return await addDoc(collection(db, "tasks"), taskData);
    } catch (error) {
      handleError(error, 'Failed to create a new task.');
    }
  }
};

