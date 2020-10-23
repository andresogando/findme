import Footer from '../components/footer';
import Meta from '../components/meta';
import Header from '../components/header'
import {Container} from 'react-bootstrap'




export default function Layout({children}) {
    return(
        <>
        <Meta />
        <Header />
        <div className='layout__main'>
            <Container >
                <main>{children}
                                    
                   
                </main>        
            </Container>
        </div>

      <Footer />
      </>
      )
    }
