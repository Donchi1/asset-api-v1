"use client"
import { useState, useEffect } from "react";
import {  onSnapshot,  DocumentData, collection, query, where, WhereFilterOp, QueryFieldFilterConstraint, FieldPath} from "firebase/firestore";
import { db } from "@/db/firebaseConfig";


type withClauseType = {
   colls: string,
   q: {
    path: string | FieldPath,
    condition: WhereFilterOp,
    value: unknown
   }
}
function useGetDocWithClause(info:withClauseType) {

  const [document, setDocument] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDocument = async () => {

        const unsubscribe = onSnapshot(
          query(collection(db, info.colls), where(info.q.path, info.q.condition, info.q.value)),
          (qsnap) => {
            setDocument(qsnap.docs.map(each => ({...each.data(), id:each.id })));
            setLoading(false);
           
          },
          (err) => {
            setError(err.message);
            setLoading(false);
           
          }
        );
        return unsubscribe;
     
    };

    getDocument();
  }, []);

  return [document, loading, error] as const;
}

export default useGetDocWithClause;
