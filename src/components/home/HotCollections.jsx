import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import '../home/HotCollections.css'

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    console.log(data);
    setHotCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const skeletonLoading = (
    <div className="nft_coll nft_coll--skeleton">
      <div className="nft_wrap">
        <Skeleton width={200} height={200} borderRadius={10} marginTop={25}/>
      </div>
      <div className="nft_coll_pp">
        <div className="lazy img-fluid">
          <Skeleton width={60} height={60} borderRadius={100}/>
        </div>
      </div>
      <div className="nft_coll_info">
        <h4>
          <Skeleton width={90} height={20} borderRadius={1} />
        </h4>
        <span>
          <Skeleton width={40} height={20} borderRadius={1} />
        </span>
      </div>
    </div>
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <div className="skeleton__loading--container">
              {new Array(4).fill(0).map(() => skeletonLoading)}
            </div>
          ) : (
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              dots={false}
              items={4}
              nav
            >
              {hotCollections.map((hotCollection) => (
                <div className="nft_coll" key={hotCollection.id}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={hotCollection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={hotCollection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{hotCollection.title}</h4>
                    </Link>
                    <span>ERC-{hotCollection.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
