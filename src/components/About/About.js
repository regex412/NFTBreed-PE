import React, {useState, useEffect} from "react";
import { Col, Row, Modal } from "antd";
import ScrollAnimation from "react-animate-on-scroll";
import "antd/dist/antd.css";
import "./About.css";
import NFTCard from "./NftCard";
import StakedNftCard from "./StakedNftCard";
import "./animate.css";

import config, {AliensAddress, BreedingAddress, LoveTokenAddress, PlanetsAddress} from '../config/config'

import aliensABI from '../../assets/abi/aliensABI.json'
import BreedingABI from '../../assets/abi/BreedingABI.json'
import loveTokenABI from '../../assets/abi/loveTokenABI.json'
import planetsABI from '../../assets/abi/planetsABI.json'

const ethers = require('ethers')

export const About = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [withdrawCount, setWithDrawCount] = useState(false)
  const [withdrawState, setWithDrawState] = useState(false)
  const [withdrawLeftTime, setWithDrawLeftTime] = useState('')
  const [defaultAccount, setDefaultAccount] = useState('')
  const [aanfts, setAANfts] = useState([])
  const [ppnfts, setPPNfts] = useState([])
  const [travelList, setTravelList] = useState([])

  const [aliensContract, setAliensContract] = useState('')
  const [breedingContract, setBreedingContract] = useState('')
  const [loveTokenContract, setLoveTokenContract] = useState('')
  const [planetsContract, setPlanetsContract] = useState('')

  const [aaselectedtokenID, setAASelectTokenID] = useState('')
  const [ppselectedtokenID, setPPSelectTokenID] = useState('')
  const [aaTravelNftSeleted, setAATravelNftSelected] = useState('')
  const [ppTravelNftSelected, setPPTravelNftSelected] = useState('')
  const [leftTimeSecond, setLeftTimeSecond] = useState('')
  
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

    let BreedingContract = await new ethers.Contract(BreedingAddress, BreedingABI, tempSigner2)
    setBreedingContract(BreedingContract)

    let AliensContract = await new ethers.Contract(AliensAddress, aliensABI, tempSigner)
    setAliensContract(AliensContract)


    let LoveTokenContract = await new ethers.Contract(LoveTokenAddress, loveTokenABI, tempSigner3)
    setLoveTokenContract(LoveTokenContract)

    let PlanetsContract = await new ethers.Contract(PlanetsAddress, planetsABI, tempSigner4)
    setPlanetsContract(PlanetsContract)
  }

  const startGetInfo = async () => {
    let aanftlist = []
    let ppnftlist = []
    let travellist = []
    if (defaultAccount !== "") {
      await aliensContract.walletOfOwner(defaultAccount).then((aanftList) => {
        for (let j = 0; j < aanftList.length; j++) {
          aanftlist.push({
            tokenId: Number(aanftList[j]).toString(),
            isAANFT: true
          })
        }
      })

      await planetsContract.walletOfOwner(defaultAccount).then((ppnftList) => {
        for (let j = 0; j < ppnftList.length; j++) {
          ppnftlist.push({
            tokenId: Number(ppnftList[j]).toString(),
            isAANFT: false
          })
        }
      })

      await breedingContract.getStakedInfos().then((stakedInfo) => {
        
        for (let j = 0; j < stakedInfo.length; j++) {
          if (Number(stakedInfo[j].stakedAlienID) != 0 && Number(stakedInfo[j].owner) == Number(defaultAccount)) {
            console.log(stakedInfo[j].owner)
            travellist.push({
              aatokenId: Number(stakedInfo[j].stakedAlienID).toString(),
              pptokenId: Number(stakedInfo[j].stakedPlanetID).toString(),
              leftTime: Number(stakedInfo[j].stakedTime).toString(),
            })
          }
        }
        if (travellist.length === 0) {
          setWithDrawCount(false)
        } else {
          setWithDrawCount(true)
        }
        // // setStaked(stakedinfo.isStaked)
        // console.log(Number(stakedinfo.stakedAlienID).toString())
        // console.log(Number(stakedinfo.stakedAlienID).toString())
        // let stakedTime = Number(stakedinfo.stakedTime.toString())
        // let currentTimeInSeconds = Math.floor(Date.now() / 1000)
        // setWithDrawLeftTime(Number(Math.floor(10 - (currentTimeInSeconds - stakedTime) / 60)))
        // if ( Number(Math.floor(10 - (currentTimeInSeconds - stakedTime) / 60)) < 0) {
        //   setWithDrawState(true)
        // } else {
        //   setWithDrawState(false)
        // }
      })

      await breedingContract.SGBPrice().then((stakedInfo) => {
        console.log("SGB" + stakedInfo)
      })

    }


    aanftlist.sort((a, b) => {
      return a.tokenId - b.tokenId
    })

    ppnftlist.sort((a, b) => {
      return a.tokenId - b.tokenId
    })

    travelList.sort((a, b) => {
      return a.aatokenId - b.aatokenId
    })
    setAANfts(aanftlist)
    setPPNfts(ppnftlist)
    setTravelList(travellist)

    console.log("withdraw::", withdrawCount)
  }

  const unconnected = () => {
    setIsConnected(false)
    window.location.reload()
    localStorage.clear()
  }

  const deposit = async () => {
    let amount = 1
    let ETH_VALUE_AS_STRING = 1

    if (isConnected) {
      if (aaselectedtokenID === "" || ppselectedtokenID === "") {
        Modal.info({
          content: 'Please Select NFTs',
            onOk() {
            },
        })
      } else {
        const amountValue = ethers.BigNumber.from(amount).mul(ethers.BigNumber.from(10).pow(17))
        await planetsContract.setApprovalForAll(BreedingAddress, true, { gasLimit: 5000000 }).then((tx) => {
          tx.wait().then(() => {
            aliensContract.setApprovalForAll(BreedingAddress, true , { gasLimit: 5000000 }).then((tx2) => {
              tx2.wait().then(() => {
                loveTokenContract.approve(BreedingAddress, amountValue, { gasLimit: 3000000 })
                  .then((tx3) => {
                    tx3.wait().then(() => {
                      breedingContract.stake(aaselectedtokenID, ppselectedtokenID, { value: ethers.utils.parseEther("1.0") })
                      .then((tx4) => {
                        tx4.wait().then(() => { 
                          Modal.success({
                            content: 'Deposit Successful',
                              onOk() {
                                window.location.reload()
                              },
                            })
                          })
                        })
                    })
                  })
              })
            })
          })
        })
       }
      } else {
          Modal.info({
            content: 'Please Connect Wallet',
              onOk() {
              },
          })
      }
  }

  const withdraw = () => {
    let limitTime = 180 // limitTime is 180s
    let currentTimeInSeconds = Math.floor(Date.now() / 1000)
    let lefttime = localStorage.getItem("leftTime")
    console.log(lefttime)
    setWithDrawLeftTime(Number(limitTime - (currentTimeInSeconds - lefttime)))
    console.log(Number(limitTime - (currentTimeInSeconds - lefttime)))
    if (isConnected) {
      if (aaTravelNftSeleted === "" || ppTravelNftSelected === "") {
        Modal.info({
          content: 'Please Select NFTs for Withdraw',
            onOk() {
            },
        })
      } else {
        if (Number(limitTime - (currentTimeInSeconds - leftTimeSecond)) <=0) {
          breedingContract.withdraw(aaTravelNftSeleted, ppTravelNftSelected, { gasLimit: 300000})
          .then((tx) => {
            tx.wait().then(() => { 
              Modal.success({
                content: 'withdraw Successful',
                  onOk() {
                  window.location.reload()
                },
              })
            })
          })
        } else {
          Modal.error({
            content: 'Can not Withdraw! After'+ ' ' + withdrawLeftTime + 's ' + 'can withdraw',
              onOk() {
              },
          })
        } 
      }
    } else {
      Modal.info({
        content: 'Please Connect wallet',
          onOk() {
          },
      })
    }
  }

  return (
    <ScrollAnimation animateIn="fadeIn">
      <section id="about">
      <Row gutter={[24, 24]} justify={"center"} className="headerBar">
          <Col lg={4} xs={0}></Col>
        
          <Col lg={16} xs={24} className="headerBarItem-DAPP">
            <h1 style={{color:"white", fontWeight:"800", fontSize:'60px', textAlign:'center'}}>Travel Program</h1>
          </Col>
          <Col lg={4} xs={0} className="headerBarItem">
          </Col>
        </Row>
        <Row gutter={[24, 24]} justify={"center"} className="headerBar">
          <Col lg={9} xs={2}></Col>
        
          <Col lg={6} xs={15} className="headerBarItem-DAPP">
            {!isConnected ? (
              <>
                <button className="btn-connect" onClick={connect}>
                  Connect
                </button>
              </>
            ) : (
              <>
                <button className="btn-connect">
                  <span
                    style={{
                      fontWeight: '800',
                      color: 'white',
                    }}
                    onClick={unconnected}
                  >
                    Disconnect
                  </span>
                </button>
              </>
            )}
          </Col>
          <Col lg={9} className="headerBarItem">
          </Col>
        </Row>
      
        <Row gutter={[24, 24]} justify="center" className="about-row">
          <Col lg={10}>
            <div className="about-container">
              <div className="wrapper">
                <div className="infoPanel">
                <h1 style={{color:"rgb(127, 85, 168)", fontWeight:"700", fontSize:'30px', textAlign:'center'}}>AncientAliens NFTs</h1>
                  <div className="tokenGrid">
                    {aanfts.map((token) => {
                      return (
                        <NFTCard
                          tokenId={token.tokenId}
                          isAANFT={token.isAANFT}
                          setAASelectTokenID={setAASelectTokenID}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4} style={{marginTop:"10%"}}>
            <h1 style={{color:"rgb(221, 219, 219)", fontWeight:"700", textAlign:"center", fontSize:"30px"}}>AA NFT: {aaselectedtokenID} </h1>
            <h1 style={{color:"rgb(221, 219, 219)", fontWeight:"700", textAlign:"center", fontSize:"30px"}}> + </h1>
            <h1 style={{ color: "rgb(221, 219, 219)", fontWeight: "700", textAlign: "center", fontSize: "30px" }}>PP NFT: {ppselectedtokenID} </h1>
            <button className="depositBtn" onClick={deposit}>Deposit</button>
            {withdrawCount ? (
              <>
                <button className="withdrawBtn" onClick={withdraw}>Withdraw</button>
              </>
            ) : (
                <></>
            )}
          </Col>
          
          <Col lg={10}>
            <div className="about-container">
              <div className="wrapper">
                <div className="infoPanel">
                  <h1 style={{color:"rgb(127, 85, 168)", fontWeight:"700", fontSize:'30px', textAlign:'center'}}>Planetoids NFTs</h1>
                  <div className="tokenGrid">
                  {ppnfts.map((token) => {
                      return (
                        <NFTCard
                          tokenId={token.tokenId}
                          isAANFT={token.isAANFT}
                          setPPSelectTokenID={setPPSelectTokenID}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {withdrawCount ? (
            <>
               <Col lg={10}>
                <div className="about-container">
                  <div className="wrapper">
                    <div className="infoPanel">
                      <h1 style={{color:"rgb(127, 85, 168)", fontWeight:"700", fontSize:'30px', textAlign:'center'}}>In Travel</h1>
                      <div className="tokenGrid">
                        {travelList.map((token) => {
                          return (
                            <StakedNftCard
                              aatokenId={token.aatokenId}
                              pptokenId={token.pptokenId}
                              leftTime={token.leftTime}
                              setAATravelNftSelected={setAATravelNftSelected}
                              setPPTravelNftSelected={setPPTravelNftSelected}
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ) : (
              <>
              </>
          )}
        </Row>
      </section>
    </ScrollAnimation>
  );
};
