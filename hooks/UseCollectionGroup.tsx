"use client"

import React, { useState, useEffect } from "react";
import {
  collectionGroup,
  query,
  orderBy,
  onSnapshot,
  DocumentData
} from "firebase/firestore";
import { db } from "@/db/firebaseConfig";

function useCollectionGroup(colls: string) {
  const [collection, setCollection] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sub = onSnapshot(
      query(collectionGroup(db, colls), orderBy("date")),
      (qs) => {
        setCollection(qs.docs.map((each) => ({ ...each.data(), id: each.id })));
        setError(null);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setError(err.message);
      }
    );
    return () => {
      sub();
    };
  }, [colls]);

  return [collection, loading, error] as const;
}

export default useCollectionGroup;
