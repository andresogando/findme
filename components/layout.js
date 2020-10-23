import Footer from '../components/footer';
import Meta from '../components/meta';
import Headerx2 from '../components/headerx2';





export default function Layout({children}) {
    return(
        <>

        <div className='layout__main'>
            <Meta />
            <Headerx2 title="Andres"/>
            <main>{children}
                                    
                   
                </main>        
           
        </div>
      <Footer title="Find Me 🔎  " description=" 🚧     Site under construction   🚧  "/>
      </>
      )
    }
