
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
  const [investment, loading] = useGetDocument(`investments/${uid}/investmentDatas`, id as string, { snap: true });


  useEffect(() => {
    if (investment) {
      formik.setValues({
        fullname: investment?.fullname,
        status: investment?.status,
        amount: investment?.amount,
        endDate: investment?.endDate,
        startDate: investment?.startDate,
        plan: investment?.plan,
        expProfit: investment?.expProfit,
      });
    }
  }, [investment, loading]);


  const formik = useFormik({
    initialValues: {
      fullname: "",
      status: "",
      amount: "",
      endDate: "",
      startDate: "",
      plan: "",
      expProfit: "",
    },

    validationSchema: Yup.object({
      fullname: Yup.string().trim().required("Field required").lowercase(),
      expProfit: Yup.string()
        .lowercase()
        .trim()
        .required("Field required"),
      endDate: Yup.string()
        .lowercase()
        .trim(),
      startDate: Yup.date().required("Field required"),
      plan: Yup.string()
        .lowercase()
        .trim()
        .required("Field required"),
      amount: Yup.string().lowercase().trim().required("Field required"),
      status: Yup.string()
        .oneOf(["inProgress", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values, formHelpers) => {handleUpdate(values, formHelpers)},
  });



  const handleUpdate = async (val: typeof formik.values, { setSubmitting }: FormikHelpers<typeof val>) => {
    formik.setSubmitting(true);

    try {
      await updateDoc(doc(db, `investments/${uid}/investmentDatas/${id}`), {
        ...val,
      });
      setSubmitting(false);
      toast({ description: "Update Successful", variant: "success" });
    } catch (error: any) {
      setSubmitting(false);
      toast({ description: error?.message, variant: "destructive" });
    }
  };

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
            <InputField
              label="Expected Profit"
              error={touched.expProfit && errors.expProfit}
              {...getFieldProps("expProfit")}
              id="expProfit"
              value={values.expProfit}
            />
            <InputField
              label="Plan"
              error={touched.plan && errors.plan}
              {...getFieldProps("plan")}
              id="plan"
              value={values.plan}
            />
            </Flex>
            <Flex>
            <InputField
              label="Start Date"
              error={touched.startDate && errors.startDate}
              {...getFieldProps("startDate")}
              id="startdate"
              type="date"
              value={values.startDate}
            />
            <InputField
              label="End Date"
              error={touched.endDate && errors.endDate}
              {...getFieldProps("endDate")}
              id="enddate"
              type="date"
              value={values.endDate}
            />
            </Flex>
            <SelectField
              value={values.status || investment?.status}
              onChange={(val) => setFieldValue("status", val)}
              label="Status"
              error={touched.status && errors.status}
              items={["inProgress", "success", "failed"]}
              id="status"
            />

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