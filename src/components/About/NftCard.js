import React, { useState, useEffect } from 'react'
import "./NftCard.css"
import NFT from "../../assets/welcome.png"
// eslint-disable-next-line react/prop-types
const NFTCard = ({ tokenId, isStaked, balance, src, tier, level }) => {
    return (
        <div className="nftCardContainer">
            <img src={ NFT } className="nftIMG" alt="nftIMG"/>
        <h1
            style={{
            textAlign:'center',
            fontWeight: '800',
            fontSize: '20px',
            color: 'rgb(69, 42, 122)',
          }}
        >
          tokenID{tokenId}
        </h1>
      </div>
  )}

export default NFTCard
