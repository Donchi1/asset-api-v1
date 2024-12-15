"use client";

import React, { useState, ChangeEvent } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/db/firebaseConfig";
import { saveToFirestore } from "@/lib/actions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import Flex from "@/components/ui/flex";
import H2 from "@/components/ui/H2";
import { Input } from "@/components/ui/input";
import { Eye, LoaderCircle, EyeOff } from "lucide-react";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { uploadStagedFile } from "@/lib/utilFunc/uploadFileToCloud";
import { DocumentData, where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { query } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { createCookie } from "@/lib/utilFunc/createCookie";

type FormDataType = {
  username: string;
  fullname: string;
  country: string;
  state: string;
  occupation: string;
  email: string;
  photo: File | null;
  phone: string;
  password: string;
};

type DropdownProps = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | false;
  component: React.ElementType;
  additionalProps?: Record<string, unknown>;
};

type InputFieldProps = {
  label: string;
  id: string;
  error?: string | false;
  [key: string]: unknown;
};

type PasswordFieldProps = {
  label: string;
  id: string;
  showPwd: boolean;
  setShowPwd: React.Dispatch<React.SetStateAction<boolean>>;
  error?: string | false;
  [key: string]: unknown;
};

type FileFieldProps = {
  label: string;
  id: string;
  error?: string | false;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RegistrationPage: React.FC = () => {
  const refCode = useSearchParams().get("ref")
  const { toast } = useToast();
  const [showPwd, setShowPwd] = useState(false);
  const [terms, setTerms] = useState(false);

  const formik = useFormik<FormDataType>({
    initialValues: {
      fullname: "",
      password: "",
      email: "",
      username: "",
      photo: null,
      phone: "",
      country: "",
      state: "",
      occupation: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full Name is required"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      occupation: Yup.string().required("Occupation is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
      email: Yup.string().email("Invalid email").lowercase().trim().required("Email is required"),
      photo: Yup.mixed<File>().nullable().required("Photo is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }: FormikHelpers<FormDataType>) => {
      if(!terms) return toast({description: "You must accept the terms of service", variant: "destructive"})
      try {
        const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
        // // const storageRef = ref(storage, `users/${user.uid}`);
        //   // await uploadBytes(storageRef, values.photo);
        //   // const url = await getDownloadURL(storageRef);

         const {url, img_publicId} = await uploadStagedFile(values.photo as File | Blob)

          const q = query(collection(db, "users"), where("referrerCode", "==", refCode))

          const referrer = refCode && (await getDocs(q)).docs[0]?.data() as DocumentData || null

          await saveToFirestore(user,referrer?.uid, {...values, imgPublicId: img_publicId}, url as string);
          await createCookie("auth",JSON.stringify({uid:user.uid, isAdmin: false}))
          resetForm();
          toast({
            variant: "success",
            description: "Successfully registered",
          })
          location.replace("/dashboard");
        
      } catch (error: any) {
        const errorMessage = (error as { code?: string })?.code?.split("/")[1];
        setSubmitting(false);
        resetForm();
        toast({ description: errorMessage || error?.message, variant: "destructive" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { touched, errors, values, getFieldProps, setFieldValue, isSubmitting } = formik;

  return (
    <section className="min-h-screen w-full py-20 main-gradient !bg-gradient-to-br">
      <div className="container-size">
        <div className="flex justify-center items-center">
          <Card className="lg:w-[50%] shadow-primary-gray/30 border-0 w-full bg-primary-blue/30 p-8 lg:p-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <H2 className="!text-[25px]">Register A New Account</H2>
              <div className="space-y-3">
                <InputField
                  label="Full Name"
                  id="fullname"
                  placeholder="Full Name"
                  error={touched.fullname && errors.fullname}
                  {...getFieldProps("fullname")}
                />

                <Flex className="!w-full">
                  <DropdownField
                    label="Country"
                    id="country"
                    value={values.country}
                    onChange={(val) => setFieldValue("country", val)}
                    error={touched.country && errors.country}
                    component={CountryDropdown}
                  />
                  <DropdownField
                    label="State"
                    id="state"
                    value={values.state}
                    onChange={(val) => setFieldValue("state", val)}
                    error={touched.state && errors.state}
                    component={RegionDropdown}
                    additionalProps={{ country: values.country }}
                  />
                </Flex>

                <Flex className="!w-full">
                  <InputField
                    label="Occupation"
                    id="occupation"
                    placeholder="Occupation"
                    error={touched.occupation && errors.occupation}
                    {...getFieldProps("occupation")}
                  />
                  <InputField
                    label="Username"
                    id="username"
                    placeholder="Username"
                    error={touched.username && errors.username}
                    {...getFieldProps("username")}
                  />
                </Flex>

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

                <FileField
                  label="Photo"
                  id="photo"
                  error={touched.photo && errors.photo}
                  onChange={(e) => setFieldValue("photo", e.target.files?.[0] || null)}
                />

                <div className="flex items-center gap-3 w-full">
                  <Checkbox value={terms as any} onCheckedChange={(state) => setTerms(state as boolean)} className="checked:bg-primary checked:text-primary-blue" />
                  <Text className="!text-[16px] text-white">
                    Accept the
                    <Link className="text-primary ml-2" href="/termsAndConditions">
                      terms and conditions
                    </Link>
                  </Text>
                </div>
              </div>
              <Button
                className="bg-primary w-full text-primary-blue uppercase hover:bg-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderCircle size={20} className="animate-spin" /> : "Register"}
              </Button>
              <div className="flex items-center w-full">
                  <Text className="!text-[16px] text-white">
                    Have an account?
                    <Link className="text-primary ml-2" href="/auth/login">
                      Login
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

const InputField: React.FC<InputFieldProps> = ({ label, id, error, ...props }) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>
    <Input
      id={id}
      className={`text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${
        error ? "border-red-500" : ""
      }`}
      {...props}
    />
  </div>
);

const DropdownField: React.FC<DropdownProps> = ({
  label,
  id,
  value,
  onChange,
  error,
  component: Component,
  additionalProps,
}) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>
    <Component
      id={id}
      value={value}
      onChange={onChange}
      className={`text-white hover:border-primary p-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${
        error ? "border-red-500" : ""
      }`}
      {...additionalProps}
    />
  </div>
);

const PasswordField: React.FC<PasswordFieldProps> = ({ label, id, showPwd, setShowPwd, error, ...props }) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>
    <div className="relative">
      <Input
        id={id}
        type={showPwd ? "text" : "password"}
        className={`text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      <span
        className="absolute right-3 top-3 cursor-pointer"
        onClick={() => setShowPwd((prev) => !prev)}
      >
        {showPwd ? <Eye className="text-white" size={18} /> : <EyeOff className="text-white" size={18} />}
      </span>
    </div>
  </div>
);

const FileField: React.FC<FileFieldProps> = ({ label, id, error, onChange }) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>
    <input
      id={id}
      type="file"
      className={`file:text-primary file:border-none file:rounded-full file:bg-primary-blue  file:px-4 text-white hover:border-primary  p-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${
        error ? "border-red-500" : ""
      }`}
      onChange={onChange}
    />
  </div>
);

export default RegistrationPage;