import Footer from '@/components/global/Footer'
import Header from '@/components/global/Header'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Title from '@/components/global/Title'



const faqText = {
        right:[{
            title: "How to become the project participant?",
            text: " For participation in the project it is necessary to be registered. For this purpose you shall fill in the registration form. It is necessary to type user name, password, e-mail. Having been registered you will be able to login to your personal account, fill up your account balance, and a make the deposit. Also don't forget to type its payment details in appropriate section of personal area."
        },
        {
            title: "May I change the password, e-wallet and e-mail?",
            text: " Change of the password can be made in the account. E-mail ande-wallet number can be change only through the Administrator for the safety purpose. For this purpose contact the Administrator on any specified contacts."
        },
        {
            title: "What is partner program of the project?",
            text: " Referral program is up to 5%-2%-1% from a referral income. Our team against the strategy of Hit & Run therefore we want of smooth increase in financial fund of the project, and that led to this partner program."
        },
        {
            title: "May I open several accounts in the project?",
            text: " No, multiregistration is forbidden. In case of detection of such accounts - all this accounts will be blocked, and funds on these accounts will frozen."
        },
        {
            title: "How long does enrollment of deposits?",
            text: "All deposits are enrolled and become active instantly. Deposits from Bitcoin can enrollment up to 48 hours."
        },

        {
            title: "What is the minimum amount to withdraw?",
            text: "The minimum withdrawal amount is 5$ in Bitcoin equivalent, and 0.1$ in other payment system."
        },
        {
            title: "Whether there is a commission for funds withdrawal in the project?",
            text: "No."
        }],
        left:[{
            title: "When new languages and EPS in the project will be available?",
            text: "In process of development of the Administration project will add some languages and EPS. The English version of the website is available at the moment."
        },
        {
            title: "When I can check my account?",
            text: "Information about your personal account is available 24 hours a day, 7 days a week."
        },
        {
            title: "How to make the deposit?",
            text: "You can make the deposit of the account of the project, having been registered. After that it is possible to choose a tariff plan and to make the deposit. Also you can make the deposit from balance, having used referral reward."
        },
        {
            title: "Can I create several deposits?",
            text: "Yes it can! But we don't allow multi plans working in same time because it will effect your instant withdraw function in our system!You can make multi deposits in same plan and it is accepted."
        },
        {
            title: "May I recover the forgotten password?",
            text: "Yes, for password recovery follow the  link. After you will specify the data typed at registration, the recovery link will got by you to e-mail.",
            link: "password recovery"
        },
        {
            title: "If I make the deposit from my account balance, will be accrued a referral reward to my upline for such deposit?",
            text: "No. The referral reward will be accrued only in case if the deposit has been made from payment processor directly."
        },
        {
            title: "How I can contact with Administration?",
            text: " Ask your question through the contacts form. Don't forget to study the FAQ section before making request."
        },
    ]}




function Faq() {
    return (
        <>
            <Header />
            <section className='py-10 min-h-screen main-gradient !bg-gradient-to-br'>
                <div className='container-size'>
                    <Title className='text-primary-light' label='Frequently Asked Questions' />
                    <div className='flex items-center gap-8 mt-4'>

                        <div className='flex-1'>
                            <Accordion type="single" collapsible className='px-2 '>
                                {faqText.right.map(each => (
                                    <AccordionItem className='text-primary-gray border-primary-gray/40' key={each.title} value={each.text}>
                                        <AccordionTrigger className='no-underline hover:no-underline'>{each.title}</AccordionTrigger>
                                        <AccordionContent>
                                            {each.text}
                                        </AccordionContent>
                                    </AccordionItem>

                                ))}
                            </Accordion>
                        </div>
                        <div className='flex-1'>

                            <Accordion type="single" collapsible className='px-2'>
                                {faqText.right.map(each => (
                                    <AccordionItem className='text-primary-gray border-primary-gray/40' key={each.title} value={each.title}>
                                        <AccordionTrigger className='no-underline hover:no-underline'>{each.title}</AccordionTrigger>
                                        <AccordionContent>
                                            {each.text}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}

export default Faq



