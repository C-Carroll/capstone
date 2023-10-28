import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import './LandingPage.css'


const LandingPage = () => {
    const user = useSelector((state) => state.session.user)
    const history = useHistory()


    if (user) history.push('/albums')
    else return(

        <div className='lpCont'>
            <div className="lpCon">
                <div id='forty'>
                    <h1>Sound Voyage</h1>
                </div>
                <div>
                    Embark on Your Sound Voyage: Discover the Melody of Life
                </div>
            </div>
        </div>
    )
}
export default LandingPage
