"use client";

import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "@/db/firebaseConfig";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import H2 from "@/components/ui/H2";
import {  LoaderCircle } from "lucide-react";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/button";
import { createCookie } from "@/lib/utilFunc/createCookie";
import { InputField, PasswordField } from "@/components/ui/CustomInputs";

type FormDataType = {
  email: string;
  password: string;
};






const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const [showPwd, setShowPwd] = useState(false);

  const formik = useFormik<FormDataType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").lowercase().trim().required("Email is required"),
      password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),

    }),
    onSubmit: async (values, {  setSubmitting }: FormikHelpers<FormDataType>) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        formik.setSubmitting(false)
        const cookieData = JSON.stringify({ uid: auth.currentUser?.uid as string, isAdmin: false })
        createCookie("auth", cookieData)
        toast({
          variant: "success",
          description: "login Successful",
        })
        return location.replace("/dashboard")
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

  const { touched, errors, getFieldProps, isSubmitting } = formik;

  return (
    <section className="min-h-screen w-full py-20 main-gradient !bg-gradient-to-br">
      <div className="container-size">
        <div className="flex justify-center items-center">
          <Card className="lg:w-[50%] shadow-primary-gray/30 border-0 w-full bg-primary-blue/30 p-8 lg:p-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <H2 className="!text-[25px]">Login Your Account</H2>
              <div className="space-y-3">
                <InputField
                  label="Email"
                  id="email"
                  placeholder="Email"
                  error={touched.email && errors.email}
                  {...getFieldProps("email")}
                />

                <PasswordField
                  label="Password"
                  id="password"
                  showPwd={showPwd}
                  setShowPwd={setShowPwd}
                  error={touched.password && errors.password}
                  {...getFieldProps("password")}
                />
                <div className="flex items-center gap-3 w-full">
                  <Link className="text-primary ml-2" href="/auth/forgot-password">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                className="bg-primary w-full text-primary-blue uppercase hover:bg-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderCircle size={20} className="animate-spin" /> : "Login"}
              </Button>
              <div className="flex items-center w-full">
                <Text className="!text-[16px] text-white">
                  Don't have account?
                  <Link className="text-primary ml-2" href="/auth/register">
                    Register
                  </Link>
                </Text>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};





export default LoginPage;
