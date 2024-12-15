"use client"
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { EmptyPage } from '@/components/dashboard/EmptyPage'
import SubHeader from '@/components/dashboard/SubHeader'
import LoadingPage from '@/components/global/LoadingPage'
import { Card } from '@/components/ui/card'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { auth } from '@/db/firebaseConfig'
import useCollection from '@/hooks/UseCollection'
import formatCurrency, { getDaysDifference } from '@/lib/utilFunc/converter'
import { InvestmentType } from '@/types/plan'
import moment from 'moment'
import React from 'react'





function Investment() {
  
  const [investments, loading] = useCollection(`investments/${auth.currentUser?.uid}/investmentDatas`) as readonly [InvestmentType[], boolean, string | null]
  
  if (loading) return <LoadingPage />
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader label="Dashboard" />
        <div className="p-6 main-gradient !bg-gradient-to-br min-h-screen">
          <SubHeader />
          {investments.length > 0 ? <>
            <Card className='bg-primary-blue/30'>
              <Table>
                <TableHeader>
                  <TableRow >
                    <TableHead >Plan</TableHead>
                    <TableHead >Amount</TableHead>
                    <TableHead >Desc</TableHead>
                    <TableHead title='Starting Date'>StartDate</TableHead>
                    <TableHead title='Ending Date'>EndDate</TableHead>
                    <TableHead title='Remaining Days' >RDate</TableHead>
                    <TableHead title='Expected Profit'>ExpProfit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments?.map((investment) => (

                    <TableRow key={investment.id} >
                      <TableCell className="font-medium ">
                        <div className="font-semibold capitalize">{investment.plan}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm uppercase">{formatCurrency(Number(investment.amount))}</div>
                      </TableCell>
                      <TableCell>
                        <div>{investment.desc}</div>
                      </TableCell>
                      <TableCell>
                        <div>{moment(investment?.startDate).format("ll")}</div>
                      </TableCell>
                      <TableCell>
                        <div>{moment(investment.endDate).format("ll")}</div>
                      </TableCell>
                      <TableCell>
                        <div className='uppercase'>{getDaysDifference(new Date(investment.startDate), new Date(investment.endDate))}</div>
                      </TableCell>
                      <TableCell>
                        <div className='uppercase'>{investment.expProfit}</div>
                      </TableCell>

                      <TableCell>
                        <div>{investment.status}</div>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </Card>
          </>
            :
            <EmptyPage text='Please add a wallet' onClick={() => { }} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Investment