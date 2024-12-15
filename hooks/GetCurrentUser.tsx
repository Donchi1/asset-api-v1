"use client"
import  { useEffect } from "react";
import { auth, db } from "@/db/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";
import { UserDataType } from "@/types/table";


export const useGetCurrentUser = () => {
  const {setCurrentUser,setLoading,setError} = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
     
      if (authUser) {
        
        getDoc(doc(db, "users", authUser.uid)).then((fireUser ) => {
             setCurrentUser(fireUser.data() as UserDataType);
             setLoading(false);
           }).catch(err =>{
             console.log(err)
             setLoading(false);
           })
        
      } else {
        setLoading(false);
        setError("No user found. Please Reauthenticate!!");
      }
    });
  }, []);
};
