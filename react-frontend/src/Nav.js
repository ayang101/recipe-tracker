import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import menuIcon from './icons/menu-icon.svg';
import cookIcon from './icons/cook-icon.svg';
import planIcon from './icons/plan-icon.svg';
import shopIcon from './icons/shop-icon.svg';
import logoutIcon from './icons/logout-icon.svg';
import accountIcon from './icons/account-icon.svg';
import './App.css';

const Layout = () => {
  const [expanded, setExpanded] = useState(false);

  function toggleNav() {
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  }

  function openNav() {
    setExpanded(true);
    document.getElementById("side-nav").style.width = "250px";
    // set all tags not of the side-nav id
    //document.querySelectorAll(":not(#side-nav)").marginLeft = "250px";
  }

  function closeNav() {
    setExpanded(false);
    document.getElementById("side-nav").style.width = "110px";
    // set all tags not of the side-nav id
    //document.querySelectorAll(":not(#side-nav)").marginLeft = "110px";
  }

  return (
    <>
        <div id="side-nav">
          <div className="obj-link" onClick={toggleNav} style={{paddingLeft: 30, color: 'white'}}>
            {expanded ?
                <div style={{paddingBottom: 35}}>
                  <img src={menuIcon} width={25} style={{display: 'inline-block', float: 'left', margin: 0, padding: 0}} />
                  <div style={{display: 'inline-block', float: 'left', paddingTop: 3}}>&nbsp; MENU</div>
                </div> :  
                <>
                  <img src={menuIcon} width={25} style={{margin: 0, padding: 0}} />
                </>
              }
          </div>
          <Link className="obj-link" to="/">
            {expanded ?
              <div className="side-nav-link" style={{paddingLeft: 45}}>
                meal quest
              </div>
              :
              <div className="side-nav-link" style={{paddingLeft: 10}}>
                meal quest
              </div>
            }
          </Link>
          <Link className="obj-link" to="/recipes">
            <div className="side-nav-link">
              {expanded ?
                <>
                  <img src={cookIcon} width={42} style={{display: 'inline-block', float: 'left', margin: 0, padding: 0}} />
                  <div style={{display: 'inline-block', float: 'left', padding: 10}}>&nbsp; COOK</div>
                </> :  
                <>
                  <img src={cookIcon} width={42} style={{margin: 0, padding: 0}} />
                </>
              }
            </div>
          </Link>
          <Link className="obj-link" to="/meal-planner">
            <div className="side-nav-link">
              {expanded ?
                <>
                  <img src={planIcon} width={32} style={{display: 'inline-block', float: 'left', margin: 0, padding: 0}} />
                  <div style={{display: 'inline-block', float: 'left', padding: 10}}>&nbsp; PLAN</div>
                </> : 
                <>
                  <img src={planIcon} width={32} style={{margin: 0, padding: 0}} />
                </>
              }
            </div>
          </Link>
          <Link className="obj-link" to="/grocery-list">
            <div className="side-nav-link">
              {expanded ?
                <>
                  <img src={shopIcon} width={35} style={{display: 'inline-block', float: 'left', margin: 0, padding: 0}} />
                  <div style={{display: 'inline-block', float: 'left', padding: 10}}>&nbsp; SHOP</div>
                </> : 
                <>
                  <img src={shopIcon} width={35} style={{margin: 0, padding: 0}} />
                </>
              }
            </div>
          </Link>
          <Link className="obj-link" to="/logout">
            <div className="side-nav-link">
              {expanded ?
                <>
                  <img src={logoutIcon} width={30} style={{display: 'inline-block', float: 'left', margin: 0, padding: 0}} />
                  <div style={{display: 'inline-block', float: 'left', padding: 10}}>&nbsp; LOG OUT</div>
                </> : 
                <>
                  <img src={logoutIcon} width={30} style={{margin: 0, padding: 0}} />
                </>
              }
            </div>
          </Link>
        </div>
        <Outlet />
    </>
  )
};

export default Layout;