"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import { auth, db } from "@/db/firebaseConfig"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { toast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
import { Dialog, DialogDescription, DialogTitle, DialogContent } from '../ui/dialog'
import { DialogHeader } from '../ui/dialog'
import { InputField, SelectField } from '../ui/CustomInputs'
import Flex from '../ui/flex'
import { Card } from '../ui/card'
import { updateUploadStagedFile } from '@/lib/utilFunc/uploadFileToCloud'
import { Loader } from 'lucide-react'
import { UserDataType } from '@/types/table'
import useCollection from '@/hooks/UseCollection'
import { CryptoBalance, WalletType } from '@/types/crypto'


type InitialValues = {
  refamount: string
  refcode: string
  disableWithdrawal: boolean
  accessCode: string
}

type CoinData = {
  [key: string]: WalletType;
}

type CoinType = "ethereum" | "bitcoin" | "tether" | ""

const networks = {
  ethereum: ["erc20", "bep20"],
  bitcoin: ["btc", "bep20"],
  tether: ["trc20", "erc20", "bep20"]
}



export default function ProfileInfoCard({ user, action, id }: { id?: string | undefined | string[], user: UserDataType | DocumentData | null | undefined, action?: Boolean }) {


  const [coin] = useCollection(`coins/${user?.uid}/coinDatas`) as readonly [CryptoBalance[], boolean, string | null]

  const [file, setFile] = useState<Blob | File | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openCoinModal, setOpenCoinModal] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState<CoinType>("");


  const updatePhoto = async () => {
    if (file === null) return toast({ description: "Photo cannot be empty" })
    setFileLoading(true)
    //const storageRef = ref(storage, `users/${action ? id : auth.currentUser?.uid}`);
    try {

      //await uploadBytes(storageRef, file as Blob | Uint8Array | ArrayBuffer);
      const url = await updateUploadStagedFile(file as File | Blob, user?.imgPublicId)

      await updateDoc(doc(db, "users", action ? id as string : auth.currentUser?.uid || ""), {
        photo: url,
      });
      toast({ description: "Photo successfully updated", variant: "success" });
      setFileLoading(false)
      setFile(null)
    } catch (err: any) {
      toast({ description: err?.message, variant: "destructive" });
      setFileLoading(false)
      setFile(null)
    }
  }
  const formikAction = useFormik({
    initialValues: {
      refamount: "",
      refcode: "",
      disableWithdrawal: true,
      accessCode: "",
    } as InitialValues,

    validationSchema: Yup.object({
      refamount: Yup.string().required("Field required"),
      refcode: Yup.string().required("Field required"),
      disableWithdrawal: Yup.bool().oneOf([true, false]).required("Field required"),
      accessCode: Yup.string().required("Field required"),
    }),

    onSubmit: (values) => handleSubmitActionUpdate(values),
  });

  const handleSubmitActionUpdate = async (val: any) => {
    formikAction.setSubmitting(true)
    try {
      await updateDoc(doc(db, `users/${id}`), { ...val, disableWithdrawal: val.disableWithdrawal === "true" ? true : false })
      formikAction.setSubmitting(false)
      toast({ description: "Update Successful", variant: "success" })
    } catch (error: any) {
      formikAction.setSubmitting(false)
      toast({ description: error?.message, variant: "destructive" })
    }
  }
  const formikCoin = useFormik({
    initialValues: coin.reduce((acc, curr) => ({
      ...acc,
      [curr.coin]: curr
    }), {}) as CoinData,

    validationSchema: Yup.object().shape(
      coin.reduce((acc, curr) => ({
        ...acc,
        [curr.coin]: Yup.object({
          network: Yup.string().required(),
          address: Yup.string().required(),
          symbol: Yup.string().required(),
          total: Yup.string().required(),
          coin: Yup.string().required(),
        })
      }), {})
    ),

    onSubmit: (values) => handleSubmitCoinUpdate(values),
  });

  const selectedId = formikCoin.values[selectedCoins]?.id

  const handleSubmitCoinUpdate = async (values: CoinData) => {
    try {
      await updateDoc(doc(db, `coins/${user?.uid}/coinDatas/${selectedId}`), values[selectedCoins])
      formikCoin.setSubmitting(false)
      toast({ description: "Update Successful", variant: "success" })
    } catch (error: any) {
      formikCoin.setSubmitting(false)
      toast({ description: error?.message, variant: "destructive" })
    }
  }

  useEffect(() => {
    const setInfo = () => {

      formikAction.setValues({
        refamount: user?.refuser.refamount,
        refcode: user?.refuser.refcode,
        accessCode: user?.accessCode,
        disableWithdrawal: user?.disableWithdrawal,
      })
      formikCoin.setValues({
        ethereum: coin?.find(each => each.coin === "ethereum") as WalletType,
        bitcoin: coin?.find(each => each.coin === "bitcoin") as WalletType,
        tether: coin?.find(each => each.coin === "tether") as WalletType,
      })
    };
    setInfo();
  }, [user, coin]);


  console.log(formikCoin.values)


  return (
    <>
      <Dialog open={openUserModal} onOpenChange={setOpenUserModal} >
        <DialogContent className="sm:max-w-[425px] main-gradient !bg-gradient-to-br border-0 shadow shadow-primary-gray/20">
          <DialogHeader className='text-primary-gray'>
            <DialogTitle>Action Page</DialogTitle>
            <DialogDescription className='text-primary-gray/85'>
              Update the necessary fields and click submit
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formikAction.handleSubmit}>
            <div className="modal-body">
              <div className="payment-form ">
                <div className="form-group mb-30 mt-3">
                  <div className="space-y-3">
                    <Flex className='*:!w-full'>
                      <div className="">
                        <InputField
                          id='refamount'
                          label='Referral Amount'
                          type="text"
                          error={formikAction.touched.refamount &&
                            formikAction.errors.refamount}

                          {...formikAction.getFieldProps("refamount")}
                        />
                      </div>
                      <div className="">
                        <InputField
                          label='Referral Code'
                          id='refcode'
                          error={formikAction.touched.refcode &&
                            formikAction.errors.refcode}

                          {...formikAction.getFieldProps("refcode")}
                        />
                      </div>
                    </Flex>
                    <Flex className='*:w-full'>
                      <div className="">
                        <SelectField
                          id='disableWithdrawal'
                          label='Disable Withdrawal'
                          error={formikAction.touched.disableWithdrawal &&
                            formikAction.errors.disableWithdrawal}
                          onChange={(val) => formikAction.setFieldValue("disableWithdrawal", val)}
                          value={formikAction.values.disableWithdrawal.toString()}
                          items={["true", "false"]}
                        />
                      </div>
                    </Flex>
                    <div className="">
                      <div className="input-group">
                        <InputField
                          id='accesscode'
                          label='Access Code'
                          type="text"
                          error={formikAction.touched.accessCode &&
                            formikAction.errors.accessCode}
                          {...formikAction.getFieldProps("accessCode")}
                        />
                      </div>
                    </div>
                    <Button className='w-full text-primary-blue ' disabled={formikAction.isSubmitting} type='submit' >
                      Update User
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openCoinModal} onOpenChange={setOpenCoinModal} >
        <DialogContent className="sm:max-w-[425px] main-gradient !bg-gradient-to-br border-0 shadow shadow-primary-gray/20">
          <DialogHeader className='text-primary-gray'>
            <DialogTitle className='capitalize'>Action Page {selectedCoins}</DialogTitle>
            <DialogDescription className='text-primary-gray/85'>
              Update the necessary fields and click submit
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formikCoin.handleSubmit}>
            <div className="modal-body">
              <div className="payment-form ">
                <div className="form-group mb-30 mt-3">
                  <div className="space-y-3">
                    <Flex className='*:w-full'>
                      <InputField
                        {...formikCoin.getFieldProps(`${selectedCoins as CoinType}.id`)}
                        readOnly
                        label="Coins Type"
                        error={formikCoin.touched[selectedCoins as CoinType]?.coin && formikCoin.errors[selectedCoins as CoinType]?.coin}
                        items={["ethereum", "bitcoin", "tether"]}
                        id="type"
                        value={formikCoin.values[selectedCoins as CoinType]?.coin}
                      />
                      <SelectField
                        onChange={(value) => formikCoin.setFieldValue("network", value)}
                        label="Network"
                        value={formikCoin.values[selectedCoins as CoinType]?.network}
                        error={formikCoin.touched[selectedCoins as CoinType]?.network && formikCoin.errors[selectedCoins as CoinType]?.network}
                        items={networks[selectedCoins as keyof typeof networks] as string[]}
                        id="network"
                      />

                    </Flex>
                    <Flex className="">
                      <InputField
                        label="Total"
                        error={formikCoin.touched[selectedCoins as CoinType]?.total && formikCoin.errors[selectedCoins as CoinType]?.total}
                        {...formikCoin.getFieldProps(`${selectedCoins as CoinType}.total`)}
                        id="total"
                        value={formikCoin.values[selectedCoins as CoinType]?.total}
                      />

                      <InputField
                        id='symbol'
                        label='Symbol'
                        readOnly
                        items={["btc", "eth", "usdt"]}
                        error={formikCoin.touched[selectedCoins as CoinType]?.symbol && formikCoin.errors[selectedCoins as CoinType]?.symbol}
                         {...formikCoin.getFieldProps(`${selectedCoins as CoinType}.symbol`)}
                        value={formikCoin.values[selectedCoins as CoinType]?.symbol}
                      />

                    </Flex>

                    <InputField
                      label="Address"
                      error={formikCoin.touched[selectedCoins as CoinType]?.address && formikCoin.errors[selectedCoins as CoinType]?.address}
                      {...formikCoin.getFieldProps(`${selectedCoins as CoinType}.address`)}
                      id="address"
                      value={formikCoin.values[selectedCoins as CoinType]?.address}
                    />

                    <Button className='w-full text-primary-blue ' disabled={formikCoin.isSubmitting} type='submit' >
                      {formikCoin.isSubmitting ? <Loader className='animate-spin' /> : "Update Wallet"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className=" md:col-span-2 col-span-5">
        <Card className='bg-primary-blue/30'>
          <div className="flex flex-wrap justify-center text-white">
            <label htmlFor='profile' className="hover:cursor-pointer ">
              <Image width={500} className="rounded-lg" height={400} src={file ? URL.createObjectURL(file as Blob) : user?.photo} alt="profile" />
              <input
                hidden={true}
                className="w-full rounded-lg font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="file"
                color="purple"
                name="img"
                id="profile"
                onChange={(e) => setFile(e.target.files && e.target.files[0])}
              />
            </label>
          </div>
          <div className="px-4 mt-2">
            <div className='flex justify-between  items-center'>

              <h5 className="text-gray-400 font-bold text-lg">
                {' '}
                {user?.fullname}
              </h5>

              <div className="capitalize text-white  ">
                {/* <Icon name="work" size="xl" /> */}
                {user?.occupation}
              </div>
            </div>
            <div className=" text-white mt-3 ">
              Joined At{" "}
              {new Date(user?.date?.toDate()).toDateString()}
            </div>
          </div>

          <div className='py-4'>
            <div className="w-full flex justify-center px-4 mt-3 gap-2">
              <Button className='w-full text-primary-blue ' disabled={fileLoading} type='button' onClick={updatePhoto} title='Update Photo'>
                {fileLoading ? <Loader className='animate-spin' /> : "Upload Photo"}
              </Button>
              {action &&
                <Button className='gradient-btn !bg-red-500' type='button' title='Action' onClick={() => setOpenUserModal(true)} >
                  Action
                </Button>
              }
            </div>
          </div>
        </Card>
       {action && <Card className='bg-primary-blue/30 mt-4'>
          <div className='py-4'>
            <div className="w-full flex items-center justify-between px-4 gap-2">
              <h2 className='text-gray-400 font-bold text-lg'>
                Ethereum
              </h2>
              <Button className='gradient-btn !bg-red-500' type='button' title='Action' onClick={() => {
                setOpenCoinModal(true)
                setSelectedCoins("ethereum")
              }} >
                Update
              </Button>

            </div>
          </div>
          <div className='py-4'>
            <div className="w-full flex items-center justify-between px-4 gap-2">

              <h2 className='text-gray-400 font-bold text-lg'>
                Bitcoin
              </h2>
              <Button className='gradient-btn !bg-red-500' type='button' title='Action' onClick={() => {
                setOpenCoinModal(true)
                setSelectedCoins("bitcoin")
              }} >
                Update
              </Button>

            </div>
          </div>
          <div className='py-4'>
            <div className="w-full flex items-center justify-between px-4 gap-2">

              <h2 className='text-gray-400 font-bold text-lg'>
                Tether
              </h2>
              <Button className='gradient-btn !bg-red-500' type='button' title='Action' onClick={() => {
                setOpenCoinModal(true)
                setSelectedCoins("tether")
              }} >
                Update
              </Button>

            </div>
          </div>
        </Card>}
      </div>
    </>
  )
}
