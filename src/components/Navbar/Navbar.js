import React, { useState, useEffect} from "react";
import "./Navbar.css";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { Spin, Modal } from 'antd'
import config, {AliensAddress, BreedingAddress, LoveTokenAddress, PlanetsAddress} from '../config/config'

import aliensABI from '../../assets/abi/aliensABI.json'
import BreedingABI from '../../assets/abi/aliensABI.json'
import loveTokenABI from '../../assets/abi/aliensABI.json'
import planetsABI from '../../assets/abi/aliensABI.json'

const ethers = require('ethers')

const Navbar = ({ toggle }) => {
  // usestate isConnected false
  const [isConnected, setIsConnected] = useState(false)
  const [defaultAccount, setDefaultAccount] = useState('')

  const [aliensContract, setAliensContract] = useState('')
  const [breedingContract, setBreedingContract] = useState('')
  const [loveTokenContract, setLoveTokenContract] = useState('')
  const [planetsContract, setPlanetsContract] = useState('')
  
  useEffect(() => {
    const callStaking = async () => {
      await updateEthers()
      startGetInfo()
    }
    callStaking()
  }, [defaultAccount])

  const connect = async () => {
    if (window.ethereum !== undefined) {
      let chain = config.chainId.toString()
      if (window.ethereum.networkVersion === chain) {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (account) => {
          setDefaultAccount(account[0])
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

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    let tempSigner = tempProvider.getSigner()

    let tempProvider2 = new ethers.providers.Web3Provider(window.ethereum)
    let tempSigner2 = tempProvider2.getSigner()

    let tempProvider3 = new ethers.providers.Web3Provider(window.ethereum)
    let tempSigner3 = tempProvider3.getSigner()

    let tempProvider4 = new ethers.providers.Web3Provider(window.ethereum)
    let tempSigner4 = tempProvider4.getSigner()

    let AliensContract = new ethers.Contract(AliensAddress, aliensABI, tempSigner)
    setAliensContract(AliensContract)

    let BreedingContract = new ethers.Contract(BreedingAddress, BreedingABI, tempSigner2)
    setBreedingContract(BreedingContract)

    let LoveTokenContract = new ethers.Contract(BreedingAddress, BreedingABI, tempSigner3)
    setLoveTokenContract(LoveTokenContract)

    let PlanetsContract = new ethers.Contract(BreedingAddress, BreedingABI, tempSigner4)
    setPlanetsContract(PlanetsContract)
  }

  const startGetInfo = async () => {
    let aanftlist = []
    if (defaultAccount !== "") {
      await aliensContract.walletOfOwner(defaultAccount).then((aanftList) => {
        for (let j = 0; j < aanftList.length; j++) {
          aanftlist.push({
            tokenId: Number(aanftList[j]).toString(),
          })
        }
        console.log(aanftlist)
      })
    }
  }


    const unconnected = () => {
      setIsConnected(false)
      window.location.reload()
      localStorage.clear()
    }


    return (
      <nav>
        {/* <Row gutter={[24, 24]} justify={"center"} className="headerBar">
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
        </Row> */}
      
      </nav>
    );
  };

export default Navbar;
