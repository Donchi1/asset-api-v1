import { db, auth } from "@/db/firebaseConfig";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";

const createNotification = async (data: {
  text: string;
  title: string;
  status?: string;
}, id?: string) => {
  const authId = id ? id : auth.currentUser?.uid
  await addDoc(
    collection(
      db,
      `notifications/${authId}/notificationDatas`
    ),
    {
      ...data,
      date: serverTimestamp(),
      recent: true,
      uid: auth.currentUser?.uid,
      id: new Date().getDate() + Math.random() + 2
    }
  );
};

export default createNotification;
