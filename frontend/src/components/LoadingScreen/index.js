import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import { TailSpin } from "react-loader-spinner";
import './LoadingPage.css'



const LoadingPage = () => {
  return(
      <div className='loadp'>
        <div className='loadpCont'>
          <i class="fa-solid fa-sailboat"></i>
          <h1 id='loadhead'>Loading</h1>
        </div>
        </div>


    )
}
export default LoadingPage
