import React, { useState, useEffect } from 'react'
import "./NftCard.css"
import aaNFT from "../../assets/doodcatIcon.png"
import ppNFT from "../../assets/dedcatIcon.png"
import { Button, Row, Col } from 'antd'
// eslint-disable-next-line react/prop-types
const StakedNftCard = ({ aatokenId, pptokenId, leftTime, setAATravelNftSelected, setPPTravelNftSelected, setLeftTime}) => {
  const[tokenIDState, setTokenIDState] = useState(false)

  const nftTravelSelect = (aatokenId, pptokenId, leftTime) => {
    setAATravelNftSelected(aatokenId)
    setPPTravelNftSelected(pptokenId)
    setLeftTime(leftTime)
  }
  useEffect(() => {
    if (aatokenId === "0") {
      setTokenIDState(false)
    } else {
      setTokenIDState(true)
    }
  }, [])

    
  return (
    <>
      {tokenIDState ? (
        <>
           <Button className="stakedNftContainer" onClick={() => nftTravelSelect(aatokenId, pptokenId, leftTime)}>
        <Row style={{}}>
          <Col lg={11} xs={24}>
            <h1
              style={{
                textAlign: 'center',
                fontWeight: '800',
                fontSize: '20px',
                color: 'rgb(69, 42, 122)',
              }}
            >
              AA NFT
            </h1>
            <img src={aaNFT} className="stakenftIMG" alt="nftIMG" />
            <h1
              style={{
                textAlign: 'center',
                fontWeight: '800',
                fontSize: '20px',
                color: 'rgb(69, 42, 122)',
              }}
            >
              tokenID: {aatokenId}
            </h1>
          </Col>
          <Col lg={2} xs={24} style={{top:"35%", fontSize:"30px",color: 'rgb(69, 42, 122)', fontWeight:'800'}}> + </Col>
          <Col lg={11} xs={24}>
            <h1
              style={{
                textAlign: 'center',
                fontWeight: '800',
                fontSize: '20px',
                color: 'rgb(69, 42, 122)',
              }}
            >
              PP NFT
            </h1>
            <img src={ppNFT} className="stakenftIMG" alt="nftIMG" />
            <h1
              style={{
                textAlign: 'center',
                fontWeight: '800',
                fontSize: '20px',
                color: 'rgb(69, 42, 122)',
              }}
            >
              tokenID: {pptokenId}
            </h1>
          </Col>
        </Row>
      </Button>
      </>
      ) : (
          <>
          </>
      )}
   
    </>
    )
  }

export default StakedNftCard
