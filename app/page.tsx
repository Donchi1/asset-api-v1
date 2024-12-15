import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import AboutCompany from "@/components/others/AboutCompany";
import HomeHero from "@/components/others/HomeHero";
import PartnerProgram from "@/components/others/PartnerProgram";
import FullTradingWidget from "@/components/others/TradingWidget";
import CustomersFeedBack from "@/components/others/Testimonial";
import Statistics from "@/components/others/Statistics";

export default function Home() {
 
  return (

    <>
    <Header />
    <main className="w-full h-screen ">
      <HomeHero />
      <FullTradingWidget />
      <PartnerProgram />
      <AboutCompany />
      <Statistics />
      <CustomersFeedBack />
      <Footer />
    </main>
    </>
  );
}
