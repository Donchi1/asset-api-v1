
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Title from '@/components/global/Title'


export default function AboutPage() {
  return (
    <>
      <Header />

    <div className="min-h-screen main-gradient !bg-gradient-to-br">
      {/* Main Content */}
      <main className="container-size px-4 py-16 ">
        <Title label='ABOUT US'  className="text-3xl text-primary-light mb-12" /> 
        <div className='space-y-4 text-primary-gray  text-md leading-relaxed tracking-wide'>
          <p >
            Asset-api.info is a private online cryptocurrency investment company that has been legally registered in united states in 2017. Previously several years we provided lucrative investment services to private clients and have honed our knowledge of how to do business with a small attracted capital. Within that period we have formed our own trading strategy in different markets with the elements of high financial security. The main goal of our work is the safety of funds, and only the following our task is to make high profits.
          </p>
          <p >
            The company asset-api.info provides each investor working in finance and crypto currency field with the opportunity to get stable profit due to passing investments through stocks. Our experts monitor online each stock exchange daily and due to favorable exchange rate we maximize our investor&apos;s profit.
          </p>
          <p >
            We earn money with price drop and rise for crypto currency. However, this kind of activity is very risky. Most investors don’t have enough information and knowledge, so they often lose their capital when trading crypto currency on stocks.
          </p>
        </div>
      </main>
      <Footer />
    </div>
    </>
  )
}