"use client"
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SubHeader from '@/components/dashboard/SubHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import React, {  useState } from 'react'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import moment from 'moment'
import { auth, db } from '@/db/firebaseConfig'
import {  WalletType } from '@/types/crypto'
import useCollection from '@/hooks/UseCollection'
import { Button, LinkButton } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { InputField, SelectField } from '@/components/ui/CustomInputs'
import { Loader } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getWalletSymbol } from '@/lib/utils'
import { useFormik } from 'formik'
import * as Yup from "yup"
import formatCurrency, { formatCrypto } from '@/lib/utilFunc/converter'
import H2 from '@/components/ui/H2'
import { useAuthStore } from '@/store/authStore'
import LoadingPage from '@/components/global/LoadingPage'
import createNotification from '@/lib/utilFunc/createNotification'
import { useIsMobile } from '@/hooks/use-mobile'



function Withdrawal() {
  const {currentUser} = useAuthStore()
  const [savedCoins, coinsLoading] = useCollection(`coins/${auth.currentUser?.uid}/coinDatas`) as readonly [WalletType[], boolean, string | null]

const isMobile = useIsMobile()
  const filteredCoins = savedCoins?.map(each => ({ ...each, icon: `/images/${each.coin.toLowerCase()}.png` }))

  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false)

  const totalAssets = savedCoins.reduce((acc, { total }) => acc + Number(total), 0)
  

  const formik = useFormik({
    initialValues: {
      amount: "",
      wallet: "",
      address: "",
      accessCode: ""
    },
    validationSchema: Yup.object({
      amount: Yup.string().required(),
      wallet: Yup.string().oneOf(["ethereum", "bitcoin", "tether"]).required(),
      address: Yup.string().required(),
      accessCode: Yup.string().required()
    }),
    async onSubmit(values, { resetForm, setSubmitting }) {
      try {
        if(Number(values.amount) < 21) return toast({ description: "Sorry withdrawal amount must be greater than 20", variant: "destructive" })
        if(Number(values.amount) > totalAssets) return toast({ description: "Sorry you have exceeded withdrawal amount", variant: "destructive" })
        if (currentUser?.accessCode !== values.accessCode) return toast({ description: "Invalid or incorrect access code", variant: "destructive" })
        const symbol = getWalletSymbol(values.wallet as any)
        await addDoc(collection(db, "transactions", auth.currentUser?.uid as string, "transactionDatas"), {
          coin:values.wallet,
          amount: values.amount,
          date: serverTimestamp(),
          symbol: symbol,
          status: "pending",
          transactionId: Math.ceil(Math.random() + new Date().getSeconds()),
          type: "withdrawal",
      })
       await createNotification({
        title: "Withdrawal Sent",
        text: `Your request for the withdrawal of ${values.amount} has been sent successfully`,
        status: "success"
       })
        resetForm()
        setSubmitting(false)
        toast({ description: "Your withdrawal request was successfully sent. We will get back to you soon.", variant: "success" })
      } catch (error: any) {
        const msg = error?.code.split("/")[1];
        setSubmitting(false)
        toast({ description: msg || error?.message, variant: "destructive" })
      }
    },
  })
  const { getFieldProps, setFieldValue, values, errors, touched, isSubmitting, handleSubmit } = formik


  const walletTypes = savedCoins.map(each => each.coin).filter(adr => adr !== "")

  const handleWalletInfo = (value: string) => {
    setFieldValue("wallet", value)
    const walletInfo = savedCoins.find(adr => adr.coin === value)
    setFieldValue("address", walletInfo?.address)
  }


if(coinsLoading) return <LoadingPage />
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader label="Dashboard" />
        <div className="p-6 main-gradient !bg-gradient-to-br min-h-screen">
          <SubHeader hideBtn='withdrawal' />
          {filteredCoins.length > 0 && <>
            <Card className='bg-primary-blue/30 !overflow-x-auto'>
              <Table className='table-auto w-full'>
                <TableHeader>
                  <TableRow >
                    <TableHead >Coin</TableHead>
                    <TableHead >Symbol</TableHead>
                    <TableHead >Amount</TableHead>
                    <TableHead >Address</TableHead>
                    <TableHead >Network</TableHead>
                    <TableHead >Last Updated</TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoins?.map((wallet) => (

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
                        <div className="text-sm uppercase">{wallet.coin === "tether" ? formatCurrency(Number(wallet.total)) : formatCrypto(Number(wallet.total))}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm uppercase">{wallet.symbol}</div>
                      </TableCell>
                      <TableCell>
                        {wallet.address ? <div title={wallet.address}>{isMobile ? wallet.address?.slice(0, 10): wallet.address}</div> : <LinkButton label='Add Wallet' link='/dashboard/wallet' />}
                      </TableCell>
                      <TableCell>
                        <div className='uppercase'>{wallet.network}</div>
                      </TableCell>
                      <TableCell>
                        <div>{moment(wallet.lastFunded?.toDate()).format("ll")}</div>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </Card>
          </>}
          <div className='mt-6 flex justify-between '>
            <div className='space-y-2'>

              <H2 className='text-sm'>Total Asset</H2>
              <H2 className=''>{formatCurrency(totalAssets)}</H2>
            </div>
            <Button onClick={() => setOpenWithdrawalModal(true)} className='text-primary-blue hover:bg-primary '>Withdraw Now</Button>
          </div>

          <Dialog open={openWithdrawalModal} onOpenChange={setOpenWithdrawalModal}>

            <DialogContent className="sm:max-w-[425px] main-gradient !bg-gradient-to-br border-0 shadow shadow-primary-gray/20">

              <DialogHeader className='text-primary-gray'>
                <DialogTitle>Request Withdrawal</DialogTitle>
                <DialogDescription className='text-primary-gray'>
                  Add your wallet and amount here. Click submit when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 pb-4" onSubmit={handleSubmit}>

                <SelectField
                  onChange={(value) => handleWalletInfo(value)}
                  label="Wallet Type"
                  error={touched.wallet && errors.wallet}
                  items={walletTypes}
                  id="type"
                />
                <InputField
                  {...getFieldProps("address")}
                  label="Wallet Address"
                  readOnly
                  error={false}
                  value={values.address}
                  id="type"
                />
                <InputField
                  label="Amount"
                  error={touched.amount && errors.amount}
                  {...getFieldProps("amount")}
                  id="amount"
                  value={values.amount}
                />
                <InputField
                  label="Access Code"
                  error={touched.accessCode && errors.accessCode}
                  {...getFieldProps("accessCode")}
                  id="accessCode"
                  value={values.accessCode}
                />
                <DialogFooter>
                  <Button className='text-primary-blue ' disabled={isSubmitting} type="submit">
                    {isSubmitting ? <Loader /> : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Withdrawal