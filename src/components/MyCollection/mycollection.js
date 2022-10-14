import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function MyCollection({ reload }) {
  const [isLoading, setIsLoading] = useState(true);
  const [coll, setColl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchColl() {
      try {
        setIsLoading(true);
        const response = await api.get("/collections/my-collections");
        setColl(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchColl();
  }, [reload]);

  return (
    <div className="collections">
      <Card>
        {!isLoading &&
          coll.map((oneColl) => {
            return (
              <Card
                className={styles.card}
                key={oneColl._id}
                onClick={() => {
                  navigate(`/collection-detail/${oneColl._id}`);
                }}
              >
                <div className={styles.container}>
                  <Card.Header>
                    <Card.Title className="colName">
                      {oneColl.collectionName}
                    </Card.Title>
                    <Card.Text className="subs">
                      {oneColl.collectionDetails}
                    </Card.Text>
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-around flex-wrap">
                    {oneColl.photos.map((photo) => {
                      return (
                        <Image
                          key={photo._id}
                          src={photo.photoUrl}
                          alt="Avatar"
                          className="d-flex"
                          fluid
                          style={{
                            padding: 5,
                            borderRadius: 10,
                            width: 230,
                            height: 215,
                            justifyContent: "center",
                          }}
                        />
                      );
                    })}
                  </Card.Body>
                </div>
              </Card>
            );
          })}
      </Card>
    </div>
  );
}

export default MyCollection;
