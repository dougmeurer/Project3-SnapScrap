import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../contexts/authContext";

function AllCollections() {
  const [isLoading, setIsLoading] = useState(true);
  const [coll, setColl] = useState();
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const userId = loggedUser.user._id;

  useEffect(() => {
    async function fetchColl() {
      try {
        setIsLoading(true);
        const response = await api.get("/collections/collections");
        setColl(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchColl();
  }, []);

  console.log(coll);
  console.log();

  return (
    <div className="collections">
      {!isLoading &&
        coll.map((oneColl) => {
          if (userId === oneColl.author) {
            return null;
          }
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
                        width: 150,
                        height: 140,
                      }}
                    />
                  );
                })}
              </div>
            </Card>
          );
        })}
    </div>
  );
}

export default AllCollections;
