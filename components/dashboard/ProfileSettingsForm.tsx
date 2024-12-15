import React, { useEffect } from 'react'
import * as Yup from "yup"

import { useFormik } from 'formik'
import { auth, db } from '@/db/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from '@/hooks/use-toast'
import createNotification from '@/lib/utilFunc/createNotification'
import { signInWithEmailAndPassword, updatePassword, User } from 'firebase/auth'
import Flex from '../ui/flex'
import { InputField, TextAreaField } from '../ui/CustomInputs'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Loader } from 'lucide-react'
import { UserDataType } from '@/types/table'
import useGetDocWithClause from '@/hooks/UseGetDocWithClause'



type userUpdateType = {
  email: string,
  fullname: string,
  username: string,
  occupation: string,
  phone: string,
  state: string,
  country: string,
  address: string,
  aboutMe: string,
  postalCode: string,
  city: string
}
type userUpdatePassType = {
  currentPassword: string,
  password1: string,
  password2: string,
}

export default function ProfileSettingsForm({ user, isAdmin }: { user: UserDataType  | null | undefined, isAdmin?: boolean }) {

  const [adminUser, adminUserLoading] = useGetDocWithClause({colls:"users",q:{ path:"isAdmin", condition:"==", value: true }}) as readonly [UserDataType[] | null | undefined, boolean, string | null]


  const formikPass = useFormik({
    initialValues: {
      currentPassword: "",
      password1: "",
      password2: "",
    } as userUpdatePassType,
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
      password1: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
      password2: Yup.string()
        .required()
        .oneOf([Yup.ref("password1"), ""], "Your password do not match"),
    }),
    onSubmit: (val) => handleSubmitPassword(val),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      username: "",
      occupation: "",
      phone: "",
      state: "",
      country: "",
      address: "",
      aboutMe: "",
      postalCode: "",
      city: ""
    } as userUpdateType,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .lowercase(),
      fullname: Yup.string().lowercase().trim().required("Fullname required"),
      username: Yup.string().lowercase().trim().required("Username required"),
      occupation: Yup.string()
        .lowercase()
        .trim()
        .required("Occupation required"),
      country: Yup.string().lowercase().trim().required("Country required"),
      address: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      aboutMe: Yup.string(),
      postalCode: Yup.string(),
      phone: Yup.string().required("Phone number required"),
    }),

    onSubmit: (values) => handleSubmit(values)
  });


  useEffect(() => {
    if(user){
      formik.setValues({
        fullname: user?.fullname,
        username: user?.username,
        occupation: user?.occupation,
        aboutMe: user?.aboutMe,
        state: user?.state,
        country: user?.country,
        email: user?.email,
        phone: user?.phone,
        postalCode: user?.postalCode,
        city: user?.city,
        address: user?.address,
      })
    }

  }, [user])


  const handleSubmit = async (value: userUpdateType) => {

    const { fullname,
      username,
      occupation,
      phone,
      country,
      aboutMe,
      city,
      postalCode,
      state,
      address } = value
    formik.setSubmitting(true);

    try {
      //update user info on firestore

      await updateDoc(doc(db, "users", auth.currentUser?.uid as string), {
        fullname,
        username,
        occupation,
        phone,
        country,
        address,
        aboutMe,
        state,
        postalCode,
        city
      });
      await createNotification({
        text: "Profile successfully updated",
        title: "Profile Update",
      });
      formik.setSubmitting(false);
      toast({ description: "update success", variant: "success" });
    } catch (err: any) {
      formik.setSubmitting(false);
      toast({ description: err?.message });
    }

  }



  const handleSubmitPassword = async (val: userUpdatePassType) => {

    if (user?.password === val.currentPassword) {

      if (isAdmin) {

      try {
         const admUser = adminUser && adminUser[0]
        const { user:authUser } = await signInWithEmailAndPassword(auth, user.email, val.currentPassword);
        await updatePassword(authUser, val.password1);
        await signInWithEmailAndPassword(auth, admUser?.email as string, admUser?.password as string);
          await createNotification({
            text: "Password successfully updated",
            title: "Password Update",
          });
          formikPass.resetForm();
          formikPass.setSubmitting(false);
        toast({ description: "password successfully updated", variant: "success" });
        } catch (err: any) {
          formikPass.setSubmitting(false);
          formikPass.resetForm();
        const msg = err.code.split("/")[1] || err?.message
          toast({ description: msg, variant: "destructive" });
      }
      return
    }
      try {

        await updatePassword(auth.currentUser as User, val.password1);

        await createNotification({
          text: "Password successfully updated",
          title: "Password Update",
        });
        formikPass.resetForm();
        formikPass.setSubmitting(false);
        toast({ description: "password successfully updated", variant: "success" });
      } catch (err: any) {
        formikPass.setSubmitting(false);
        formikPass.resetForm();
        const msg = err.code.split("/")[1] || err?.message
        toast({ description: msg, variant: "destructive" });
      }
    } else {
      formikPass.setSubmitting(false);
      toast({ description: "Old password did not match", variant: "destructive" });
    }

  };

  const { errors, touched } = formik

  return (
    <Card className="bg-primary-blue/30 p-4 rounded-lg md:col-span-3 col-span-5">

      <div>
        <form onSubmit={formik.handleSubmit}>
          <h6 className="text-main-color text-xl mt-3 mb-3 font-light uppercase">
            User Information
          </h6>
          <div className="space-y-5">

            <Flex className="font-light">
              <InputField
                id='phone'
                label='Phone'
                className=""
                type="tel"
                error={touched.phone && errors.phone}
                placeholder="Phone"
                {...formik.getFieldProps("phone")}
              />

              <InputField
                id='email'
                label='Email'
                className=""
                type="email"
                error={touched.email && errors.email}
                placeholder="Email Address"
                disabled
                {...formik.getFieldProps("email")}
              />
            </Flex>
            <Flex className="font-light">
              <InputField
                id='username'
                label='Username'
                type="text"
                error={touched.username && errors.username}
                className=""
                placeholder="Username"
                {...formik.getFieldProps("username")}
              />

              <InputField
                id='fullname'
                label='Fullname'
                className=""
                type="text"
                error={touched.fullname && errors.fullname}
                placeholder="Fullname"
                {...formik.getFieldProps("fullname")}
              />
            </Flex>
          </div>

          <h6 className="text-main-color text-xl mb-3 mt-2 font-light uppercase">
            Contact Information
          </h6>
          <div className="space-y-5">
            <Flex className="font-light">
              <InputField
                id='address'
                label='Address'
                className=""
                type="text"
                error={touched.address && errors.address}
                placeholder="Address"
                {...formik.getFieldProps("address")}
              />
            </Flex>
            <Flex className=" font-light">
              <InputField
                id="country"
                label='Country'
                className=""
                type="text"
                error={touched.country && errors.country}
                placeholder="Country"
                {...formik.getFieldProps("country")}
              />

              <InputField
                id='state'
                label='State'
                className=""
                type="text"
                error={touched.state && errors.state}
                placeholder="State"
                {...formik.getFieldProps("state")}
              />
            </Flex>
            <Flex className="font-light">
              <InputField
                id='occupation'
                label='Occupation'
                type="text"
                className=""
                error={touched.occupation && errors.occupation}
                placeholder="Occupation"
                {...formik.getFieldProps("occupation")}
              />

            </Flex>
          </div>

          <h6 className="text-main-color text-xl mt-4 font-light uppercase">
            About Me
          </h6>
          <div className="mt-4 mb-6 font-light">
            <div className="col-12">
              <TextAreaField
                id='aboutme'
                label='About Me'
                placeholder="About Me"
                className="px-6"
                cols={5}
                rows={5}
                {...formik.getFieldProps("aboutMe")}
              />

            </div>
          </div>
          <div className="flex flex-wrap  font-light">
            <Button disabled={formik.isSubmitting} className='!w-full text-primary-blue' type='submit'>
              {formik.isSubmitting ? <Loader className='animate-spin' /> : "Update"}
              </Button>
          </div>
        </form>
        <form onSubmit={formikPass.handleSubmit}>
          <h6 className="text-main-color text-xl my-6 font-light uppercase">
            Password
          </h6>
          <div className="space-y-5">
            <Flex className="font-light">
              <InputField
                id='pwd'
                label='Current Password'
                className=""
                type="password"
                error={formikPass.touched.currentPassword && formikPass.errors.currentPassword}
                placeholder="Current password"
                {...formikPass.getFieldProps("currentPassword")}
              />
              <InputField
                id='npwd'
                label='New Password'
                type="password"
                error={formikPass.touched.password1 && formikPass.errors.password1}
                className=""
                placeholder="New Password"
                {...formikPass.getFieldProps("password1")}
              />
            </Flex>
            <InputField
              id='rpwd'
              label='Reapeat Password'
              type="password"
              error={formikPass.touched.password2 && formikPass.errors.password2}
              className=""
              placeholder="Repeat Password"
              {...formikPass.getFieldProps("password2")}
            />
            <div className="font-light">
              <Button disabled={formikPass.isSubmitting}  className='!w-full !text-primary-blue' type='submit' >
                {formikPass.isSubmitting ? <Loader className='animate-spin' /> : "Update"}
                </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}
