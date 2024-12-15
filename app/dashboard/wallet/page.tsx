"use client"
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { EmptyPage } from '@/components/dashboard/EmptyPage'
import SubHeader from '@/components/dashboard/SubHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, Loader, Trash } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React, { useState } from 'react'
import { InputField, SelectField } from '@/components/ui/CustomInputs'
import { useFormik } from 'formik'
import * as Yup from "yup"
import {  collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { auth, db } from '@/db/firebaseConfig'
import { toast } from '@/hooks/use-toast'
import useGetDocWithClause from '@/hooks/UseGetDocWithClause'
import { WalletType } from '@/types/crypto'
import { getWalletSymbol } from '@/lib/utils'
import LoadingPage from '@/components/global/LoadingPage'
import { useIsMobile } from '@/hooks/use-mobile'


const networks = {
  ethereum: ["erc20", "bep20"],
  bitcoin: ["btc", "bep20"],
  tether: ["trc20", "erc20", "bep20"]
}

function Wallet() {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [walletEdit, setWalletEdit] = useState({
    wallet: "",
    id: "",
  })
  const isMobile =useIsMobile()

  const [savedWallets, walletLoading] = useGetDocWithClause({ colls: `coins/${auth.currentUser?.uid}/coinDatas`, q: { path: "address", condition: "!=", value: "" } }) as readonly [WalletType[], boolean, string | null]


  const filteredWallet = savedWallets?.map(each => ({ ...each, icon: `/images/${each.coin.toLowerCase()}.png` }))

  const formik = useFormik({
    initialValues: {
      network: "",
      wallet: "",
      address: "",
    },
    validationSchema: Yup.object({
      network: Yup.string().required(),
      wallet: Yup.string().oneOf(["ethereum", "bitcoin", "tether"]).required(),
      address: Yup.string().required()
    }),
    async onSubmit(values, { resetForm, setSubmitting }) {
      const docRef = collection(db, "coins", auth.currentUser?.uid as string, "coinDatas")
      try {
        const dbWallet = await getDocs(query(docRef, where("address", "!=", ""), where("coin", "==", values.wallet)))
        if (!dbWallet.empty) return toast({ description: `${values.wallet} wallet already exist. Please try a new wallet`, variant: "destructive" })
          const symbol = getWalletSymbol(values.wallet as any)
        const walletForUpdate = await getDocs(query(docRef, where("address", "==", ""), where("coin", "==", values.wallet)))
        const walletData = walletForUpdate.docs.map((each) => ({...each.data(), id:each.id}))
        await setDoc(doc(db, "coins", auth.currentUser?.uid as string,"coinDatas", walletData[0].id), {
          network:values.network,
          coin: values.wallet,
          address: values.address,
          date: serverTimestamp(),
          lastFunded: serverTimestamp(),
          total: "0",
          uid: auth.currentUser?.uid,
          symbol
          
        })
        resetForm()
        setSubmitting(false)
        toast({ description: "Wallet Successfully Added", variant: "success" })
      } catch (error: any) {
        const msg = error?.code.split("/")[1];
        setSubmitting(false)
        toast({ description: msg || error?.message, variant: "destructive" })
      }
    },
  })
  const formikEdit = useFormik({
    initialValues: {
      network: "",
      address: "",
    },
    validationSchema: Yup.object({
      network: Yup.string().required(),
      address: Yup.string().required()
    }),
    async onSubmit(values, { resetForm, setSubmitting }) {
      try {

        await updateDoc(doc(db, "coins",auth.currentUser?.uid as string,"coinDatas",walletEdit.id), {
          ...values,
          lastFunded: serverTimestamp(),
        })
        resetForm()
        setSubmitting(false)
        toast({ description: "Wallet Successfully Edited", variant: "success" })
      } catch (error: any) {
        const msg = error?.code.split("/")[1];
        setSubmitting(false)
        toast({ description: msg || error?.message, variant: "destructive" })
      }
    },
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "wallets", id))
      toast({ description: "Wallet Successfully deleted", variant: "success" })
    } catch (error: any) {
      toast({ description: error?.message, variant: "destructive" })
    }
  }

  const handleEdit = (item: WalletType) => {
    formikEdit.setFieldValue("network", item.network)
    formikEdit.setFieldValue("address", item.address)
    setOpenEditModal(true)
    setWalletEdit({ wallet: item.coin, id: item.id as string })
  }

  const { getFieldProps, setFieldValue, values, errors, touched, isSubmitting, handleSubmit } = formik

  if (walletLoading) return <LoadingPage />

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader label="Dashboard" />
        <div className="md:p-6 p-4 main-gradient !bg-gradient-to-br min-h-screen">
          <SubHeader />
          {filteredWallet.length > 0 ? <>
            <Card className='bg-primary-blue/30'>
              <Table>
                <TableHeader>
                  <TableRow >
                    <TableHead >Coin</TableHead>
                    <TableHead >Symbol</TableHead>
                    <TableHead >Address</TableHead>
                    <TableHead >Network</TableHead>
                    <TableHead >Last Updated</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWallet?.map((wallet) => (

                    <TableRow key={wallet.id} >
                      <TableCell className="font-medium ">
                        <div className="flex items-center gap-2">
                          <Image
                            src={wallet.icon}
                            alt={wallet.coin}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <div className="font-semibold capitalize">{wallet.coin}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm uppercase">{wallet.symbol}</div>
                      </TableCell>
                      <TableCell >
                        <div title={wallet.address}>{isMobile ? wallet.address?.slice(0, 10): wallet.address}</div>
                      </TableCell>
                      <TableCell>
                        <div className='uppercase'>{wallet.network}</div>
                      </TableCell>
                      <TableCell>
                        <div>{moment(wallet.lastFunded?.toDate()).format("ll")}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button onClick={() => handleEdit(wallet)} title='Edit' variant="outline" size="sm" className="text-green-500 border-green-500 hover:bg-green-500/10">
                            <Edit />
                          </Button>
                          <Button onClick={() => handleDelete(wallet.id as string)} title='Delete' variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500/10">
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </Card>
            {filteredWallet.length < 3 && <div className='mt-4 '>
              <Button onClick={() => setOpenModal(true)} className='text-primary-blue hover:bg-primary '>Add Wallet</Button>
            </div>}
          </>
            :
            <EmptyPage text='Please add a wallet' onClick={() => setOpenModal(true)} />}
        </div>
        <Dialog open={openModal} onOpenChange={setOpenModal}>

          <DialogContent className="sm:max-w-[425px] main-gradient !bg-gradient-to-br border-0 shadow shadow-primary-gray/20">

            <DialogHeader className='text-primary-gray'>
              <DialogTitle>Add Wallet</DialogTitle>
              <DialogDescription className='text-primary-gray'>
                Add your wallet here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 pb-4" onSubmit={handleSubmit}>

              <SelectField
                onChange={(value) => setFieldValue("wallet", value)}
                label="Wallet Type"
                error={touched.wallet && errors.wallet}
                items={["ethereum", "bitcoin", "tether"]}
                id="type"
              />
              <SelectField
                onChange={(value) => setFieldValue("network", value)}
                label="Network" error={touched.network && errors.network}
                items={networks[values.wallet.toLowerCase() as keyof typeof networks] || []}
                id="network"
              />
              <InputField
                label="Address"
                error={touched.address && errors.address}
                {...getFieldProps("address")}
                id="address"
                value={values.address}
              />
              <DialogFooter>
                <Button className='text-primary-blue ' disabled={isSubmitting} type="submit">
                  {isSubmitting ? <Loader /> : "Save Wallet"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>

          <DialogContent className="sm:max-w-[425px] main-gradient !bg-gradient-to-br border-0 shadow shadow-primary-gray/20">

            <DialogHeader className='text-primary-gray'>
              <DialogTitle>Edit Wallet</DialogTitle>
              <DialogDescription className='text-primary-gray'>
                Edit your wallet here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 pb-4" onSubmit={formikEdit.handleSubmit}>

              <SelectField
                onChange={(value) => formikEdit.setFieldValue("network", value)}
                label="Network" error={formikEdit.touched.network && formikEdit.errors.network}
                items={networks[walletEdit.wallet.toLowerCase() as keyof typeof networks] || []}
                id="network"
                value={formikEdit.values.network}
              />
              <InputField
                label="Address"
                error={formikEdit.touched.address && formikEdit.errors.address}
                {...formikEdit.getFieldProps("address")}
                id="address"
                value={formikEdit.values.address}
              />
              <DialogFooter>
                <Button className='text-primary-blue ' disabled={formikEdit.isSubmitting} type="submit">
                  {formikEdit.isSubmitting ? <Loader /> : "Save Wallet"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </SidebarInset>
    </SidebarProvider>
  )
}

export default Wallet