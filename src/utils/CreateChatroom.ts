import { Timestamp, collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../firebaseConfig";

export const CreateChatroom = async (postId: number) => {
  const db = getFirestore(app);
  const roomsCollection = collection(db, 'chatRooms');

  try {
    const roomsSnapshot = await getDocs(roomsCollection);
    const len = roomsSnapshot.docs.length + 1; 
    
    const docData = {
      room_id: len, 
      post_id: postId,
      visitor_id: 1,
      tobaek_id: 2,
      created_at: Timestamp.fromDate(new Date()),
      last_message: "",
      last_messaged_at: Timestamp.fromDate(new Date()),
      closed_at: false
    };

    const docRef = doc(db, 'chatRooms', `${len}`);
    await setDoc(docRef, docData);

    return { len };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; 
  }
};