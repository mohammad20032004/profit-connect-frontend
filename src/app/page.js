import { RightSidebar, LeftSidebar ,MainSection} from '@/components/layout';
export default function Home() {


  return (
    <main className="page" style={{display: 'flex', justifyContent: 'space-between',padding:2}}>
      
      <section style={{width: '20%', height: '100vh'}}>
      <LeftSidebar />

      </section>

      <section style={{width: '60%', height: '100vh', overflowY: 'scroll'}}>
        
        <MainSection />
      </section>

      <section style={{width: '20%', height: '100vh', textAlign: 'center'}}>
        <RightSidebar />

      </section>
    </main>
  );
}
