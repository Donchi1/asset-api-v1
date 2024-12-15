"use client";

import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/db/firebaseConfig";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import H2 from "@/components/ui/H2";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";


type FormDataType = {
  email: string;
};



type InputFieldProps = {
  label: string;
  id: string;
  error?: string | false;
  [key: string]: unknown;
};


const ForgotPasswordPage: React.FC = () => {
  const { toast } = useToast();

  const formik = useFormik<FormDataType>({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").lowercase().trim().required("Email is required")
    }),
    onSubmit: async (values, { resetForm, setSubmitting }: FormikHelpers<FormDataType>) => {
      try {
        await sendPasswordResetEmail(auth, values.email);
        setSubmitting(false);
        resetForm();
        toast({
          variant: "success",
          description: "An account reset instructions was sent to your email",
        })
        return location.assign("/user/dashboard")
      } catch (error: any) {
        formik.setSubmitting(false)
        return toast({
          description: error.code.split("/")[1],
          variant: "destructive"
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { touched, errors, getFieldProps,  isSubmitting } = formik;

  return (
    <section className="min-h-screen w-full py-20 main-gradient !bg-gradient-to-br">
      <div className="container-size">
        <div className="flex justify-center items-center min-h-[70vh]">
          <Card className="lg:w-[50%] shadow-primary-gray/30 border-0 w-full bg-primary-blue/30 p-8 lg:p-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <H2 className="!text-[25px]">Forgot Password</H2>
              <div className="space-y-3">





                <InputField
                  label="Email"
                  id="email"
                  placeholder="Email"
                  error={touched.email && errors.email}
                  {...getFieldProps("email")}
                />
              </div>
              <Button
                className="bg-primary w-full text-primary-blue uppercase hover:bg-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderCircle size={20} className="animate-spin" /> : "Register"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

const InputField: React.FC<InputFieldProps> = ({ label, id, error, ...props }) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>
    <Input
      id={id}
      className={`text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${error ? "border-red-500" : ""
        }`}
      {...props}
    />
  </div>
);




export default ForgotPasswordPage;
