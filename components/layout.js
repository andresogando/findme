import Footer from '../components/footer';
import Meta from '../components/meta';
import Headerx2 from '../components/headerx2';
import {Container} from 'react-bootstrap';





export default function Layout({children}) {
    return(
        <>
        <Container fluid="sm">

        <div className='layout__main'>
            <Meta />
            <Headerx2 />
            <main>{children}
                                    
                   
                </main>        
           
        </div>
      <Footer title="Find Me 🔎  " description=" 🚧     Site under construction   🚧  "/>

      </Container>
      </>

      )
    }
