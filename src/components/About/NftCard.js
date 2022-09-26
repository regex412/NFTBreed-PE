import React, { useState, useEffect } from 'react'
import "./NftCard.css"
import aaNFT from "../../assets/doodcatIcon.png"
import ppNFT from "../../assets/dedcatIcon.png"
import { Button } from 'antd'
// eslint-disable-next-line react/prop-types
const NFTCard = ({ tokenId, isAANFT, setAASelectTokenID, setPPSelectTokenID, imgSrc}) => {
  const [aanftSelected, setAANftSelected] = useState(false)
  const [aaPPnftSelected, setPPNftSelected] = useState(false)

  const nftSelect = (tokenID, isAANFT) => {
    if (isAANFT) {
      setAASelectTokenID(tokenID)
      console.log("aa" + tokenID)
    } else {
      setPPSelectTokenID(tokenID)
      console.log("pp" + tokenID)
   }
  }
    
    if (isAANFT) {
      return (
        <Button className="nftCardContainer" onClick={() => nftSelect(tokenId, isAANFT)}>
          <img src={imgSrc} className="nftIMG" alt="nftIMG" />
          <h1
            style={{
              textAlign: 'center',
              fontWeight: '800',
              fontSize: '20px',
              color: 'white',
            }}
          >
            tokenID: {tokenId}
          </h1>
        </Button>
      )
    } else {
      return (
        <Button className="nftCardContainer" onClick={() => nftSelect(tokenId, isAANFT)}>
          <img src={imgSrc} className="nftIMG" alt="nftIMG" />
          <h1
            style={{
              textAlign: 'center',
              fontWeight: '800',
              fontSize: '20px',
              color: 'white',
            }}
          >
            tokenID: {tokenId}
          </h1>
        </Button>
      )
    }
  }

export default NFTCard
