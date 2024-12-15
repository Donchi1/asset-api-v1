"use client"
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";


function useCollection(col: string) {
  const [myCollection, setMyCollection] = useState<Array<DocumentData>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    
  
    const unsubscribe = onSnapshot(
      query(collection(db, col), orderBy("date")),
      (qsnap) => {

        const colData = qsnap.docs.map((each) => ({ ...each.data(), id: each.id }))
    
        setMyCollection(
          colData
        );
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [col]);

  return [myCollection, loading, error] as const;
}

export default useCollection;
