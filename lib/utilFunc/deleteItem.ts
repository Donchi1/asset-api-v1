
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/db/firebaseConfig"
import { toast } from "@/hooks/use-toast"

const handleDelete = async (docRef: string,{profile, url}:{profile?: boolean, url?: string} ) => {
    try {
        await deleteDoc(doc(db, docRef))
        if(profile){
            await deleteObject(ref(storage, url))
        }
        toast({description: "Document successfully Deleted", variant: "success"})
      } catch (error: any) {
        toast({description: error?.message, variant: "destructive"})
      }
  }

  export default handleDelete