
"use client"
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { db } from '@/db/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import useGetDocument from '@/hooks/UseDocument';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SubHeader from '@/components/dashboard/SubHeader';
import { InputField, SelectField } from '@/components/ui/CustomInputs';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import LoadingPage from '@/components/global/LoadingPage';
import { Card } from '@/components/ui/card';
import Flex from '@/components/ui/flex';


function EditInvestment() {

  const { id, uid } = useParams();
  const [transactions, loading] = useGetDocument(`transactions/${uid}/transactionDatas`, id as string, { snap: true });




  const formik = useFormik({
    initialValues: {
      fullname: "",
      status: "",
      amount: "",
      date: "",
      coin: "",
      type: "",
      symbol: "",
    },

    validationSchema: Yup.object({
      fullname: Yup.string().trim().required("Field required").lowercase(),
      type: Yup.string().trim().required("Field required").lowercase(),
      coin: Yup.string()
        .lowercase()
        .trim()
        .required("Field required"),
      date: Yup.string()
        .lowercase()
        .trim(),
      symbol: Yup.string()
        .lowercase()
        .trim()
        .required("Field required"),
      amount: Yup.string().lowercase().trim().required("Field required"),
      status: Yup.string()
        .oneOf(["pending", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values, formHelpers) => {
      handleUpdate(values, formHelpers)
    },
  });



  const handleUpdate = async (val: typeof formik.values, { setSubmitting }: FormikHelpers<typeof val>) => {
    formik.setSubmitting(true);

    try {
      await updateDoc(doc(db, `transactions/${uid}/transactionDatas/${id}`), {
        ...val,
        status:val.status || transactions?.status
      });
      setSubmitting(false);
      toast({ description: "Update Successful", variant: "success" });
    } catch (error: any) {
      setSubmitting(false);
      toast({ description: error?.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    if (transactions) {
      formik.setValues({
        fullname: transactions?.fullname,
        status: transactions?.status,
        amount: transactions?.amount,
        date: transactions?.date,
        coin: transactions?.coin,
        type: transactions?.type,
        symbol: transactions?.symbol,
      });
    }
  }, [transactions, loading]);

  if (loading) return <LoadingPage />

  const { touched, errors, values, getFieldProps, isSubmitting, setFieldValue, handleSubmit } = formik;


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader label="Dashboard" />
        <div className="md:p-6 p-4 dash-gradient !bg-gradient-to-br min-h-screen">
          <SubHeader hideBtn='deposit' />
          <Card className="bg-primary-blue/30">
          <form className="grid gap-4 py-4 px-2" onSubmit={handleSubmit}>
            <Flex className="gap-2">
            <InputField
              label="Fullname"
              error={touched.fullname && errors.fullname}
              {...getFieldProps("fullname")}
              id="fullname"
              value={values.fullname}
            />
            <InputField
              label="Amount"
              error={touched.amount && errors.amount}
              {...getFieldProps("amount")}
              id="amount"
              value={values.amount}
            />
            </Flex>
            <Flex>
            <SelectField
              items={["usdt","btc", "eth"]}
              label="Symbol"
              error={touched.symbol && errors.symbol}
              onChange={(value) => setFieldValue("symbol", value)}
              id="symbol"
              value={values.symbol || transactions?.symbol}
            />
            <SelectField
            items={["deposit", "withdrawal"]}
              label="Type"
              error={touched.type && errors.type}
              onChange={(value) => setFieldValue("type", value)}
              id="type"
              value={values.type || transactions?.type}
            />
            <SelectField
            items={["bitcoin","ethereum","tether"]}
              label="Coin"
              error={touched.coin && errors.coin}
              onChange={(value) => setFieldValue("coin", value)}
              id="coin"
              value={values.coin || transactions?.coin}
            />
            </Flex>
            <Flex>
            <InputField
              label="Date"
              error={touched.date && errors.date}
              {...getFieldProps("date")}
              id="date"
              type="date"
              value={values.date}
            />
         
            <SelectField
              onChange={(value) => setFieldValue("status", value)}
              value={values.status || transactions?.status}
              label="Status"
              error={touched.status && errors.status}
              items={["pending", "success", "failed"]}
              id="status"
            />
            </Flex>

            <Button className='text-primary-blue  scale-100' disabled={isSubmitting} type="submit">
              {isSubmitting ? <Loader /> : "Update"}
            </Button>
          </form>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );


}

export default EditInvestment