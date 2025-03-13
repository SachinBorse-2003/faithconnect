import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const eventsCollection = collection(db, "events");

// Add New Event
const addEvent = async (event) => await addDoc(eventsCollection, event);

// Get All Events
const getEvents = async () => {
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete Event
const deleteEvent = async (id) => await deleteDoc(doc(db, "events", id));

export { addEvent, getEvents, deleteEvent };
