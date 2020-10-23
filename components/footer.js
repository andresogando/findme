import TwitterIcon from '@material-ui/icons/Twitter';
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';


export default function Footer(){
    return(
        <div>
            <div className="footer__icons">
               <IconButton> <a href="#"> <TwitterIcon /> </a></IconButton>        
               <IconButton> <a href="#"> <FacebookIcon /> </a></IconButton>        
            </div>
        </div>     
    )
}


