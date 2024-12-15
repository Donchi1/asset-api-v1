"use client";

import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/db/firebaseConfig";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import H2 from "@/components/ui/H2";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCookie } from "@/lib/utilFunc/createCookie";
import { InputField, PasswordField } from "@/components/ui/CustomInputs";
import useGetDocWithClause from "@/hooks/UseGetDocWithClause";
import { useRouter } from "next/navigation";




const LoginPage: React.FC = () => {

    const router = useRouter();
    const [admin] = useGetDocWithClause({ colls: "users", q: { path: "isAdmin", condition: "==", value: true } })


    const [showPwd, setShowPwd] = useState(false);


    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .trim()
                .required("Email required")
                .lowercase(),
            password: Yup.string()
                .min(5, "password must be greater than 5")
                .max(30, "password must not exceed 30 characters")
                .required("Password required"),
        }),
        onSubmit: (values, helpers) => handleSubmit(values, helpers),
    });

    const handleSubmit = async (
        val: { email: string; password: string },
        { resetForm, setSubmitting }: FormikHelpers<typeof val>
    ) => {

        const { email, password } = val;

        if (email !== admin[0]?.email || password !== admin[0]?.password) return toast({ description: "Wrong Credentials", variant: "destructive" })

        try {
            //create user on firestore
            await signInWithEmailAndPassword(auth, email, password);
            const cookieData = JSON.stringify({ id: auth.currentUser?.uid as string, isAdmin: true })
            createCookie("auth", cookieData)
            //TODO toast
            setSubmitting(false);
            resetForm();

            toast({
                description: "Sign in successful",
                variant: "success"
                 })
            router.replace("/admin/dashboard");
        } catch (err: any) {
            setSubmitting(false);
            resetForm();

            const msg = err.code.split("/")[1] || err?.message
            toast({
                description: msg,
                variant: "destructive"
            });
        }
    };

    const { touched, errors, getFieldProps, isSubmitting } = formik;

    return (
        <section className="min-h-screen w-full py-20 main-gradient !bg-gradient-to-br">
            <div className="container-size">
                <div className="flex justify-center items-center">
                    <Card className="lg:w-[50%] shadow-primary-gray/30 border-0 w-full bg-primary-blue/30 p-8 lg:p-10">
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <H2 className="!text-[25px]">Login Your Admin Account</H2>
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
                            {/* <div className="flex items-center w-full">
                                <Text className="!text-[16px] text-white">
                                    Don't have account?
                                    <Link className="text-primary ml-2" href="/auth/register">
                                        Register
                                    </Link>
                                </Text>
                            </div> */}
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    );
};





export default LoginPage;
