import axios from "axios";
import React, { useEffect, useState, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import AuctionListItem from "../../component/AuctionListItem";
import { ArtworkItem } from "./../../Interface";

interface Props {
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

function Auction({ setIsLoading }: Props): JSX.Element {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState<Array<ArtworkItem>>([]);

  const onClick = () => {
    navigate("/auction/create");
  };

  useEffect(() => {
    const callAuction = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          url: api.artwork.readAllOrPost(),
          method: "get",
        });

        if (response.status === 200) {
          const items = response.data;

          const newAuctions: Array<ArtworkItem> = items.map((auction: any) => {
            const {
              artwork_id,
              attachmentRequestDtoList,
              genre,
              ingredient,
              like_count,
              price,
              sell_user_email,
              sell_user_nickname,
              title,
              view_count,
              createdDate,
              profile_picture,
              description,
            } = auction;
            const newAuction: ArtworkItem = {
              artwork_id,
              mediaList: attachmentRequestDtoList,
              genre,
              ingredient,
              like_count,
              price,
              sell_user_email,
              sell_user_nickname,
              title,
              view_count,
              createdDate,
              profile_picture,
              description,
            };
            return newAuction;
          });
          setItemList(newAuctions);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    callAuction();
  }, [setIsLoading]);

  return (
    <>
      <h1>Auction</h1>
      <button onClick={onClick}>상품등록</button>
      {itemList.map((item) => {
        return (
          <div key={item.artwork_id}>
            <AuctionListItem item={item}></AuctionListItem>
          </div>
        );
      })}
    </>
  );
}

export default Auction;
