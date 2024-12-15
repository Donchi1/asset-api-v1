import { auth,db } from "@/db/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useMemo } from "react";
import useCollection from "./UseCollection";



export interface Notification {
    id: string;
    text: string;
    date: string;
    recent: boolean;
    title: string;
    isFavorite: boolean;
    isArchived: boolean;
  }
  

export const useNotifications = (activeTab: "all" | "archive" | "favorite",searchQuery: string) => {
    const [notifications, noteLoading] = useCollection(`notifications/${auth.currentUser?.uid as string}/notificationDatas`);

   



  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch = notification.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab =
        activeTab === "all"
          ? !notification.isArchived
          : activeTab === "archive"
          ? notification.isArchived
          : notification.isFavorite;
      return matchesSearch && matchesTab;
    });
  }, [notifications, activeTab, searchQuery]);

  const counts = useMemo(
    () => ({
      all: notifications.filter((n) => !n.isArchived).length,
      archive: notifications.filter((n) => n.isArchived).length,
      favorite: notifications.filter((n) => n.isFavorite).length,
    }),
    [notifications]
  );

  const handleToggleFavorite = async (id: string) => {
    const notificationRef = doc(db, `notifications/${auth.currentUser?.uid}/notificationDatas`, id);
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      await updateDoc(notificationRef, { isFavorite: !notification.isFavorite });
    }
  };

  const toggleArchive = async (id: string) => {
    const notificationRef = doc(db, `notifications/${auth.currentUser?.uid}/notificationDatas`, id);
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      await updateDoc(notificationRef, { isArchived: !notification.isArchived });
    }
  };

  const handleDelete = async (id: string) => {
    const notificationRef = doc(db, `notifications/${auth.currentUser?.uid}/notificationDatas`, id);
    await deleteDoc(notificationRef);
  };
    

return {toggleArchive, counts,noteLoading, handleToggleFavorite,handleDelete, filteredNotifications}

}