import React, { useState} from "react";
import "./Navbar.css";
import { Row, Col } from "antd";
import LogoIMG from "../../assets/logo.png";
import "antd/dist/antd.css";

import { Spin, Modal } from 'antd'
import config from '../config/config'
const ethers = require('ethers')

const Navbar = ({ toggle }) => {
   // usestate isConnected false
   const [isConnected, setIsConnected] = useState(false)
   // usestate isStartStaking false
   const [isStartStaking, setIsStartStaking] = useState(false)
   // usestate defaultAccount null
  const [defaultAccount, setDefaultAccount] = useState('')
  
  const connect = async () => {
    if (window.ethereum !== undefined) {
      let chain = config.chainId.toString()
      if (window.ethereum.networkVersion === chain) {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (account) => {
          setDefaultAccount(account)
          localStorage.setItem('defaultaccount', account)
          setIsConnected(true)
          Modal.success({
            content: 'Connected Wallet Successful',
          })
        })
      }
    } else {
      setIsConnected(false)
    }
  }

  const unconnected = () => {
    setIsConnected(false)
    window.location.reload()
    localStorage.clear()
  }


  return (
    <nav>
      <Row gutter={[24, 24]} justify={"center" } className="headerBar">
        <Col lg={10} xs={2}></Col>
        
        <Col lg={4} xs={15} className="headerBarItem-DAPP">
          {!isConnected ? (
            <>
              <button className="btn-connect" onClick={connect}>
                Connect Wallet
              </button>
            </>
          ) : (
            <>
              <button className="btn-connect">
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '800',
                    color: 'white',
                  }}
                  onClick={unconnected}
                >
                  Disconnect Wallet
                </span>
              </button>
            </>
          )}
        </Col>
        <Col lg={10} className="headerBarItem">
        </Col>
      </Row>
      
    </nav>
  );
};

export default Navbar;
