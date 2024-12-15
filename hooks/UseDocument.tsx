"use client"
import React, { useState, useEffect } from "react";
import { getDoc, doc, onSnapshot, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { useAuthStore } from "@/store/authStore";
import { UserDataType } from "@/types/table";


function useGetDocument(colls: string, docId: string, { snap, user }: { snap: boolean, user?: boolean }) {
  const [document, setDocument] = useState<DocumentData | undefined | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setCurrentUser } = useAuthStore()

  useEffect(() => {
    const getDocument = async () => {

      const unsubscribe = onSnapshot(
        doc(db, colls, docId),
        (qsnap) => {
          setDocument(qsnap.data());
          setLoading(false);
          if (user) setCurrentUser(qsnap.data() as UserDataType)

        },
        (err) => {
          setError(err.message);
          setLoading(false);

        }
      );
      return unsubscribe;
    }

    getDocument()
  }, []);

  return [document, loading, error] as const;
}



export default useGetDocument;
