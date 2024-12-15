import Footer from '@/components/global/Footer'
import Header from '@/components/global/Header'
import Title from '@/components/global/Title'
import React from 'react'

interface LevelProps {
    level: string
    number: string
    standardBonus: number
    representativeBonus: number
}

const Level: React.FC<LevelProps> = ({ level, number, standardBonus, representativeBonus }) => {



    return (
        <div className="flex-1 px-4">
            <div className="flex text-primary-gray items-center mb-12">
                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center mr-3">
                    <span className="text-xl font-bold ">{number}</span>
                </div>
                <h3 className="text-xl font-bold">{level}</h3>
            </div>
            <div className="flex justify-between items-end h-64">
                <div className="flex flex-col items-center w-24 text-primary-gray">
                    <div className="w-[50%] bg-green-600 mb-2" style={{ height: standardBonus * 12 }} ></div>
                    <p className="text-sm font-medium text-center">Standard bonus</p>
                    <p className="text-xl font-bold text-green-600" >{standardBonus}%</p>
                </div>
                <div className="flex flex-col items-center w-24 text-primary-gray">
                    <div className="w-[50%] bg-green-600 mb-2" style={{ height: representativeBonus * 12 }}></div>
                    <p className="text-sm font-medium text-center">Representative bonus</p>
                    <p className="text-xl font-bold text-green-600">{representativeBonus}%</p>
                </div>
            </div>
        </div>
    )
}

export default function AffiliateProgram() {
    return (
        <>
        <Header />
        <section className='w-full main-gradient !bg-gradient-to-br min-h-screen'>

            <div className="container-size py-12 md:py-24">
                <Title label='AFFILIATE PROGRAM' className="text-primary-light mb-4" />
                    
             
                <p className=" text-lg mb-12 max-w- mx-auto text-primary-gray">
                    Looking for simple, straightforward ways to make our money work for you? Referring people to Finastone takes little effort and can pay off with big rewards.
                </p>
                <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8 border-t border-gray-200 pt-8">
                    <Level level="FIRST LEVEL" number="1" standardBonus={12} representativeBonus={15} />
                    <Level level="SECOND LEVEL" number="2" standardBonus={10} representativeBonus={14} />
                    <Level level="THIRD LEVEL" number="3" standardBonus={5} representativeBonus={10} />
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
}

