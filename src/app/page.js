import { InfoPrfileSidebar ,MainSection} from '@/components/layout';
export default function Home() {


  return (
    <main className="page" style={{display: 'flex', justifyContent: 'space-between',padding:4}}>
      
      <section style={{width: '25%', height: '100vh'}}>
      <InfoPrfileSidebar />

      </section>

      <section style={{width: '75%', height: '100vh', overflowY: 'scroll'}}>
        
        <MainSection />
      </section>

     
    </main>
  );
}
