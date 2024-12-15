"use client"
import React from 'react'
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { InputField, TextAreaField } from '@/components/ui/CustomInputs';
import { Card } from '@/components/ui/card';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/db/firebaseConfig';

export default function Contact() {
    const { toast } = useToast()


    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            subject: "",
            message: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .trim()
                .required("Email required")
                .lowercase(),
            name: Yup.string().lowercase().trim().required("Name is required"),
            subject: Yup.string().optional(),
            message: Yup.string()
                .min(4, "Message must be more then 4 characters")
                .required("Message required"),
        }),
        onSubmit: (values) => handleSubmit(values),
    });

    const handleSubmit = async (val: {
        email: string;
        name: string;
        subject: string;
        message: string;
    }) => {
        formik.setSubmitting(true);
        const { email, name, subject, message } = val;

        try {
            // await makeRequestApi.post("/contact", val)
            await addDoc(collection(db, "contacts"), {
              uid: auth.currentUser ? auth.currentUser?.uid : Date.now(),
              name,
              email,
              subject,
              message,
              status: "success",
              filterDate: new Date().toLocaleDateString(),
              date: serverTimestamp(),
            });
            formik.setSubmitting(false);
            formik.resetForm();
            toast({
                description: "Thanks for contacting cryptonomize. We will get back to you soon.",
            });

        } catch (err: any) {
            formik.setSubmitting(false);
            formik.resetForm();
            toast({ description: "An error occured", variant: "destructive" });
        }
    };
    // const formikSub = useFormik({
    //     initialValues: {
    //         email: "",
    //     },

    //     validationSchema: Yup.object({
    //         email: Yup.string()
    //             .email("Invalid email address")
    //             .trim()
    //             .required("Email required")
    //             .lowercase(),
    //     }),
    //     onSubmit: (values) => handleSubmitSub(values),
    // });

    // const handleSubmitSub = async (val: { email: string }) => {
    //     formik.setSubmitting(true);
    //     const { email } = val;

    //     try {
    //         //await makeRequestApi.post("/newsletter", val)
    //         // await addDoc(collection(db, "newsletters"), {
    //         //   newsLetter: email,
    //         //   uid: auth.currentUser ? auth.currentUser?.uid : Date.now(),
    //         //   status: "success",
    //         //   date: serverTimestamp(),
    //         //   user: currentUser? currentUser?.firstname : "Guest User"
    //         // });
    //         formik.setSubmitting(false);
    //         formik.resetForm();
    //         toast({ description: "Thanks for subscribing for our newsletter." });
    //     } catch (err) {
    //         formik.setSubmitting(false);
    //         formik.resetForm();
    //         toast({ description: "An error occured you can check your email address", variant: "destructive" });
    //     }
    // };

    return (
        <>
            <Header />
            <section className='py-10 min-h-screen main-gradient !bg-gradient-to-br'>
                <div className="container-size">
                    <h1 className='text-primary-light my-14 font-bold text-3xl'>Contact Us</h1>
                    <div className='flex gap-8 justify-between flex-col md:flex-row '>
                        <Card className="contact   p-4 flex-1" >
                            <h4 className='py-2 text-primary-light mb-2'>Write Your Message </h4>
                            <form className="w-full space-y-4" onSubmit={formik.handleSubmit}>

                                <div className="form-group col-md-6">
                                    <InputField
                                        label='Your Name'
                                        error={formik.touched.name && formik.errors.name}
                                        id='name'
                                        placeholder="Name"
                                        {...formik.getFieldProps("name")}
                                    />

                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-red-500 mb-2">
                                            {formik.errors.name}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form-group col-md-6">
                                    <InputField
                                        label='Your Email'
                                        error={formik.touched.email && formik.errors.email}
                                        id='email'
                                        placeholder="Email"
                                        {...formik.getFieldProps("email")}
                                    />

                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 mb-2">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form-group col-md-12">
                                    <InputField
                                        label='Subject'
                                        error={formik.touched.subject && formik.errors.subject}
                                        id='subject'
                                        placeholder="Subject"
                                        {...formik.getFieldProps("subject")}
                                    />

                                    {formik.touched.subject && formik.errors.subject ? (
                                        <div className="text-red-500 mb-2">
                                            {formik.errors.subject}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form-group col-md-12">
                                    <TextAreaField
                                        rows={4}
                                        id='message'
                                        className='py-4 px-6'
                                        label='Message'
                                        placeholder="Your Message"
                                        {...formik.getFieldProps("message")}
                                    ></TextAreaField>

                                    {formik.touched.message && formik.errors.message ? (
                                        <div className="text-red-500 mb-2">
                                            {formik.errors.message}
                                        </div>
                                    ) : null}
                                </div>

                                <Button

                                    type="submit"
                                    value="Send message"
                                    className="bg-primary hover:bg-primary uppercase text-primary-blue"
                                    title="Submit Your Message!"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting
                                        ? "Submitting..."
                                        : "Submit Message"}
                                </Button>

                            </form>
                        </Card>
                        <Card className="contact  p-4 flex-1" >
                            <div className="space-y-2">
                                <div className="single_address">
                                    <div className="address_br">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <h5 className="font-bold text-[15px]">Germany Office</h5>

                                    <p className="text-sm">Oschatzer Strasse 19 Dresden, 01127 Saxony Germany</p>
                                </div>
                                <div className="single_address">
                                    <div className="address_br">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <h5 className="font-bold text-[15px]">USA Office</h5>
                                    <p className="text-sm">6930 Old Seward Hwy Anchorage, Alaska Unitd States</p>
                                </div>
                                <div className="single_address">
                                    <div className="address_br">
                                        <span className="fas fa-phone"></span>
                                    </div>
                                    <h5 className="font-bold text-[15px]">Phone</h5>
                                    <p className="text-sm">+03518492393</p>
                                </div>
                                <div className="single_address">
                                    <div className="address_br">
                                        <span className="fas fa-phone"></span>
                                    </div>
                                    <h5 className="font-bold text-[15px]">Phone</h5>
                                    <p className="text-sm">+147386834649</p>
                                </div>
                                <div className="single_address">
                                    <div className="address_br">
                                        <span className="fa fa-envelope"></span>
                                    </div>
                                    <h5 className="font-bold text-[15px]">Email</h5>
                                    <p className="text-sm">support@asset-api.info</p>
                                </div>
                                <div className="single_address">
                                    <div className="address_br">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <h5 className="font-bold text-[15px]">Working Hours</h5>
                                    <p className="text-sm">Mon to Sat 9:00am to 5:00pm</p>
                                </div>
                            </div>
                        </Card>
                        {/* END COL  */}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
