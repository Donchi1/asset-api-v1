"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Security from '../others/Security';



export default function Footer() {
    const navItems = [
        { label: 'HOME', href: '/' },
        { label: 'ABOUT', href: '/main/about-us' },
        { label: 'FAQ', href: '/main/faq' },
        { label: 'CONTACT', href: '/main/contact' },
        { label: 'PLAN', href: '/main/plan' },
    ]

    return (
        <footer className=" w-full main-gradient !bg-gradient-to-br overflow-hidden ">
            <section className='relative bg-primary-blue/30 py-8'>

            <div className="container-size mx-auto px-4">
                <div className=" mb-12  h-auto lg:h-[10vh] ">

                    <Image
                        src={"/images/payment_methods1.png"}
                        alt={"payment-icons"}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full "
                    />
                </div>

                {/* Logo */}
                <div className="flex justify-center items-center w-full mb-12">
                    <div className="relative w-[100px] h-[100px] rounded-full glow-effect bg-primary/10">
                        <div className="w-[100px] h-[100px] overflow-hidden rounded-full bg-primary/10 ">
                            <Image
                                src="/images/logo.png"
                                alt="API Trade"
                                fill
                                className="object-contain px-4"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mb-12 pb-6">
                    <ul className="flex justify-center gap-8 text-primary-light">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="text-sm tracking-wider hover:text-primary transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Copyright */}
                <div className='flex md:justify-between gap-4 flex-col-reverse  lg:flex-row mb-8 items-center'>
                <div className="text-center text-sm text-primary-gray ">
                    © 2022 ASSET-API.INFO. ALL RIGHTS RESERVED.
                </div>
                <Security />
                </div>
            </div>

           

            {/* Chat Widget */}
            {/* <button
                onClick={onChatOpen}
                className="fixed bottom-8 right-8 bg-[#4AE54A] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#3BD43B] transition-colors flex items-center gap-2"
            >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Chat with us, we&apos;re online!
            </button> */}

            <style jsx global>{`
                .glow-effect {
                    box-shadow: 0 0 3px #90ff8c, 0 0 3px #90ff8c;
                }
            `}</style>
            </section>
        </footer>
    )
}