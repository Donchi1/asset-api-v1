
import { auth, db, storage } from "@/db/firebaseConfig";
import { User} from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc, DocumentData } from "firebase/firestore";
import createNotification from "./utilFunc/createNotification";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { makeRequestApi } from "./utilFunc/makeRequest";
import { toast } from "@/hooks/use-toast";
import { destroyCookie } from "./utilFunc/createCookie";



const coins = [
  {
  coin: "tether",
  symbol: "usdt",
  total: "20",
  lastFunded: serverTimestamp(),
  wallet: "",
  address: "",
   },
   { coin: 'bitcoin',
    symbol: 'btc',
    total: '0',
    lastFunded: serverTimestamp(),
    wallet: "",
    address: "",
  },
  { coin: 'ethereum',
    symbol: 'eth',
    total: '0',
    lastFunded: serverTimestamp(),
    wallet: "",
    address: "",
  },
]



export const saveToFirestore = async (userData:User,referrerId?: string, formData?:any, url?: string) => {
   
       await setDoc(doc(db, "users", userData.uid), {
           ...formData,
           city: "",
           aboutMe: "",
           postalCode: "",
           gender: "",
           status: "Active",
           accessCode: "",
           accessCodeProve: "",
           isAdmin: false,
           profit: "",
           photo: url,
           address: "",
           refuser:{
            referrer:referrerId || "",
            referred: [],
            unpaidref:[],
            refamount: "30",
            refcode: Math.round(Math.random() + Date.now())
           },
           uid: userData.uid,
           date: serverTimestamp(),
           mainBalance: "0000",
           initialDeposit: "0000",
           interestBalance: "20",
           verified: false,
           verificationCode: "",
           disableWithdrawal: true,
         });
     
  
          await addDoc(
            collection(
              db,
              `transactions/${userData.uid}/transactionDatas`
            ),
            {
              coin: "tether",
              amount: 20,
              date: serverTimestamp(),
              symbol: "usdt",
              status: "success",
              transactionId: Math.ceil(Math.random() + new Date().getSeconds()),
              type: "deposit",
              fullname: formData.fullname,
              email: userData.email,
              uid: userData.uid
            }
          );
         await Promise.all(coins.map(async each  => {
           await addDoc(collection(db, "coins", userData.uid, "coinDatas"), {
             ...each,
             date: serverTimestamp(),
             uid: userData.uid
           })
        }))
  
          const noteData = {
            title: "Welcome",
            text: "Welcome to Asset-api",
          };
          await createNotification(noteData);
        
}

export const makePayment = async (currentUser:DocumentData | null | undefined, values:{[key:string]:any} ) => {
  const date = new Date().getTime().toString();
    const storageRef = ref(storage, `proves/${auth.currentUser?.uid + date}`);
    try{

      await uploadBytes(storageRef, values.prove as Blob);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db,`payments/${auth.currentUser?.uid}/paymentDatas`),{
      paymentAmount: values.amount,
      date: serverTimestamp(),
      method: values.method,
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      uid: auth.currentUser?.uid,
      prove: url,
      email: currentUser?.email,
      idx: Math.random().toString(),
      status: "pending",
      dailyIncrement: 0.5
      })
      toast({
        description: "Your funding prove has been sent successfully. We will get back to you soon",
      async onOpenChange() {
        try{
          makeRequestApi.post("/payments", currentUser)
        }catch(error:any){
          toast({
            description:"An error occured while sending you an email" + error?.message ,
            variant: "destructive"
           })
        }    
    }})
    }catch{
      toast({
        description: "Something went wrong. Please try again",
      });
    }
}


export const getUser = async (uid: string) => (await getDoc(doc(db, `user/${uid}`))).data()


export const handleLogout = async () => {
  await auth.signOut();
  destroyCookie("auth")
  return location.assign("/");
};
