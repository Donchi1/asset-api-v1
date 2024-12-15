"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { InputField, SelectField } from "../ui/CustomInputs"
import { investmentPlans } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Copy, Loader } from "lucide-react"
import { handleCopy } from "@/lib/utilFunc/handleCopy"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/db/firebaseConfig"
import { toast } from "@/hooks/use-toast"
import { useAuthStore } from "@/store/authStore"


const paymentMethods = [
    {
        id: "bitcoin",
        symbol: "btc",
        name: "Deposit through Bitcoin wallet",
        description: "Pay with BTC",
        wallet: {
            address: "bc1qwhqm4sd8h78wpr5fwvy0ktqajv4qtmsgd00ly3",
            network: "BTC"
        }
    },
    {
        id: "tether",
        symbol: "usdt",
        name: "Deposit through Tether Wallet USDT(ERC 20)",
        description: "Pay with USDT",
        wallet: {
            address: "TSUi4wbNY8XgpGByy5wL5sgaq7nj7qfEcz",
            network: "TRC20"
        }
    },
    {
        id: "ethereum",
        symbol: "eth",
        name: "Deposit through Ethereum",
        description: "Pay with ETH",
        wallet: {
            address: "0xb9e9556dFC1D99200a183006c6D75EacefDB283A",
            network: "ERC20"
        }
    },

]

const validationSchema = Yup.object().shape({
    plan: Yup.string().required("Investment plan is required"),
    amount: Yup.number()
        .required("Trade amount is required")
        .positive("Amount must be positive")
        .min(10, "Minimum trade amount is 10"),
    paymentMethod: Yup.string().required("Payment method is required"),
})

const getLastTwoWords = (text: string) => text.split(' ').slice(-2).join(' ')

export default function TradeForm() {
    const {currentUser} = useAuthStore()
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const params = useSearchParams()
    const planInfo = params.get("plan") ? JSON.parse(params.get("plan")!) as typeof investmentPlans[0] : null

    const formik = useFormik({
        initialValues: {
            plan: planInfo ? `${planInfo?.profitPercentage} AFTER 5 DAYS ${planInfo?.name}` : "",
            amount: planInfo ? planInfo.minDeposit : 100,
            paymentMethod: "",
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle trade submission
            setOpenConfirmModal(true)
        },
    })

    const paymentInfo = paymentMethods.find(each => each.id.toLowerCase() === formik.values.paymentMethod)
    const investmentPlanInfo = (value: string) => investmentPlans.find(each => each.name.toLowerCase() === getLastTwoWords(value).toLowerCase())



    const formikConfirm = useFormik({
        initialValues: {
            transactionId: ""
        },
        validationSchema: Yup.object({
            transactionId: Yup.string().required("Transaction Id required")
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {

            const lastTwoWords = getLastTwoWords(formik.values.plan)

            // Handle trade submission
            try {
                await addDoc(collection(db, "transactions", auth.currentUser?.uid as string, "transactionDatas"), {
                    coin: formik.values.paymentMethod,
                    amount: formik.values.amount,
                    date: serverTimestamp(),
                    symbol: paymentInfo?.symbol,
                    status: "pending",
                    transactionId: values.transactionId,
                    type: "deposit",
                    uid: auth.currentUser?.uid,
                    email: auth.currentUser?.email,
                    fullname: currentUser?.fullname
                })
                await addDoc(collection(db, "investments", auth.currentUser?.uid as string, "investmentDatas"), {
                    plan: lastTwoWords.toLowerCase(),
                    amount: formik.values.amount.toString(),
                    desc: formik.values.plan,
                    date: serverTimestamp(),
                    startDate: new Date().toString(),
                    endDate: new Date(new Date().setDate(new Date().getDate() + 5)).toString(),
                    expProfit: investmentPlanInfo(lastTwoWords.toLowerCase())?.minWithdraw,
                    status: "inProgress",
                    uid: auth.currentUser?.uid,
                    fullname:currentUser?.fullname,
                    email: auth.currentUser?.email
                })
                setSubmitting(false)
                resetForm()
                formik.resetForm()
                setOpenConfirmModal(false)
                toast({ description: "Your deposit for your investment is successfully sent. We will get back to you once your deposit is verified.", variant: 'success' })
            } catch (error: any) {
                setSubmitting(false)
                resetForm()
                formik.resetForm()
                toast({ description: error?.message, variant: "destructive" })
            }
        },
    })


    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <div className="gap-4 grid md:grid-cols-2 grid-cols-1 ">
                    <div className="space-y-4">
                        <Card className="bg-primary-blue/30">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient main-gradient p-3 font-semibold">
                                            01
                                        </div>
                                        <h2 className="text-xl font-semibold">
                                            Select investment plan
                                        </h2>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="plan"></Label>
                                        <SelectField
                                            items={investmentPlans.map(plan => `${plan.profitPercentage} AFTER 5 DAYS ${plan.name}`)}
                                            onChange={(value) => {
                                                formik.setFieldValue("plan", value)
                                                formik.setFieldValue("amount", investmentPlanInfo(value)?.minDeposit)
                                            }}
                                            value={formik.values.plan}
                                            label="SELECT PLAN"
                                            id="plan"
                                            error={formik.touched.plan && formik.errors.plan}
                                        />
                                        {formik.touched.plan && formik.errors.plan && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.plan}</div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary-blue/30">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient main-gradient p-3 font-semibold">
                                            02
                                        </div>
                                        <h2 className="text-xl font-semibold">
                                            Enter Trade Amount
                                        </h2>
                                    </div>
                                    <div className="space-y-2">
                                        <InputField
                                            label="AMOUNT TO TRADE"
                                            id="amount"
                                            type="number"
                                            step="0.01"
                                            {...formik.getFieldProps("amount")}
                                            className="text-lg"
                                        />
                                        {formik.touched.amount && formik.errors.amount && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.amount}</div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    <Card className="bg-primary-blue/30">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient main-gradient p-3 font-semibold">
                                        03
                                    </div>
                                    <h2 className="text-xl font-semibold">
                                        Select Payment
                                    </h2>
                                </div>
                                <RadioGroup
                                    value={formik.values.paymentMethod}
                                    onValueChange={(value) => formik.setFieldValue("paymentMethod", value)}
                                    className="space-y-3"
                                >
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="flex justify-between  space-x-2">
                                            <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer">
                                                <Image
                                                    src={`/images/${method.id}.png`}
                                                    alt={method.id}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full"
                                                />
                                                <div className="space-y-2">
                                                    <div>{method.name}</div>
                                                    <div className="text-sm text-primary-gray/85">{method.description}</div>
                                                </div>
                                            </Label>
                                            <RadioGroupItem className="size-6" value={method.id} id={method.id} />
                                        </div>
                                    ))}
                                </RadioGroup>
                                {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.paymentMethod}</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-4 text-primary-blue"
                >
                    TRADE
                </Button>
            </form>
            <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
                <DialogContent className="sm:max-w-[425px] main-gradient !bg-gradient-to-br border-0 shadow shadow-primary-gray/20">
                    <DialogHeader className='text-primary-gray'>
                        <DialogTitle>Confirm Deposit</DialogTitle>
                        <DialogDescription className='text-primary-gray/85'>
                            Make payment with the below wallet information and upload the transaction id
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 pb-4" onSubmit={formikConfirm.handleSubmit}>

                        <Label>Amount</Label>
                        <div className=" py-1 px-3 transition-colors ease-linear duration-500 border-gray-700 border rounded-full">
                            <input
                                value={formik.values.amount}
                                readOnly
                                className="text-sm w-full text-white border-none  outline-none bg-transparent  "
                            />
                        </div>
                        <Label>Wallet Address</Label>
                        <div className="flex justify-between items-center py-2 px-3 transition-colors ease-linear duration-500 border-gray-700 border rounded-full">
                            <input
                                value={paymentInfo?.wallet.address}
                                readOnly
                                className="text-sm w-[80%] text-white border-none  outline-none bg-transparent  "
                            />
                            <Copy size={18} className="text-primary cursor-pointer" onClick={() => handleCopy(paymentInfo?.wallet.address as string)} />
                        </div>
                        <Label>Wallet Network</Label>
                        <div className=" flex justify-between items-center py-2 px-3 transition-colors ease-linear duration-500 border-gray-700 border rounded-full">
                            <input
                                value={paymentInfo?.wallet.network}
                                readOnly
                                className="text-sm w-[80%] text-white border-none  outline-none bg-transparent  "
                            />
                            <Copy size={18} className="text-primary cursor-pointer" onClick={() => handleCopy(paymentInfo?.wallet.network as string)} />
                        </div>
                        <InputField
                            label="Transaction Id"
                            error={formikConfirm.touched.transactionId && formikConfirm.errors.transactionId}
                            {...formikConfirm.getFieldProps("transactionId")}
                            id="transactionId"
                            value={formikConfirm.values.transactionId}
                        />
                        {formikConfirm.touched.transactionId && formikConfirm.errors.transactionId && (
                            <div className="text-red-500 text-sm mt-1">{formikConfirm.errors.transactionId}</div>
                        )}
                        <DialogFooter>
                            <Button className='text-primary-blue ' disabled={formikConfirm.isSubmitting} type="submit">
                                {formikConfirm.isSubmitting ? <Loader /> : "Proceed"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

