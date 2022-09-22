import React from "react";
import { Col, Row } from "antd";
import ScrollAnimation from "react-animate-on-scroll";
import "antd/dist/antd.css";
import "./About.css";
import NFTCard from "./NftCard";
import "./animate.css";

const ethers = require('ethers')

export const About = () => {
  const nftSelect = () => {
   alert()
 }
  return (
    <ScrollAnimation animateIn="fadeIn">
      <section id="about">
        <Row gutter={[24, 24]} justify="center" className="about-row">
          <Col lg={12}>
            <div className="about-container">
              <div className="wrapper">
                <div className="infoPanel">
                <h1 style={{color:"rgb(127, 85, 168)", fontWeight:"700", fontSize:'40px'}}>AA NFTs</h1>
                  <div className="tokenGrid">
                    <button className="nftSelectBtn" onClick={nftSelect}><NFTCard/></button>
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                  </div>
                </div>
              </div>
            </div>
            <button className="depositBtn">Deposit</button>
          </Col>
          <Col lg={12}>
            <div className="about-container">
              <div className="wrapper">
                <div className="infoPanel">
                  <h1 style={{color:"rgb(127, 85, 168)", fontWeight:"700", fontSize:'40px'}}>PP NFTs</h1>
                  <div className="tokenGrid">
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                  </div>
                </div>
              </div>
            </div>
            <button className="withdrawBtn">Withdraw</button>
          </Col>
        </Row>
      </section>
    </ScrollAnimation>
  );
};
