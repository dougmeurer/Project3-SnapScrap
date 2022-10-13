import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";
import Card from "react-bootstrap/Card";

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
                  <Card.Title className="colName">
                    {oneColl.collectionName}
                  </Card.Title>

                  <Card.Text>{oneColl.collectionDetails}</Card.Text>
                  {oneColl.photos.map((photo) => {
                    return (
                      <Card.Img
                        key={photo._id}
                        src={photo.photoUrl}
                        alt="Avatar"
                        style={{
                          padding: 5,
                          borderRadius: 10,
                          width: 230,
                          height: "auto",
                          justifyContent: "center"
                        }}
                      />
                    );
                  })}
                </div>
              </Card>
            );
          })}
      </Card>
    </div>
  );
}

export default MyCollection;
