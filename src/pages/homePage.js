import { useContext, useEffect } from "react";
import AllCollections from "../components/AllCollections/allcollections";
import { AuthContext } from "../contexts/authContext";
import SignUpPage from "./signUpPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../assets/Travel-concept.-Opened-book-with-empty-pages-vintage-photos-retro-postcard-label-starfish-and-shell-Scrapbook-Ideas-ss.jpg";
import Image from "react-bootstrap/Image";
import LoginPage from "./loginPage";

function HomePage() {
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {}, [loggedUser]);
  return (
    <div>
      {loggedUser ? (
        <AllCollections />
      ) : (
        <Container className="d-flex align-items-start">
          <Row className="d-flex align-items-start justify-content-between">
            <Col
              lg={7}
              className="align-items-start "
              style={{ backgroundColor: "" }}
            >
              <h1 className="colName">Welcome to SnapScrap!</h1>
              <span className="userNames">
                A place where you can collect and share all your amazing
                pictures as if it were a real Scrap Book, but without all the
                glue and the whatnots!
              </span>
              <br></br>
              <span className="userNames">
                At the same time you can also get to know alike minds from all
                over the world!
              </span>
            </Col>
            <Col
              lg={8}
              className="align-items-start"
              style={{ backgroundColor: "" }}
            >
              <Image src={img} alt="" width={800} />
            </Col>
          </Row>

          <Col xs={4} style={{ backgroundColor: "" }}>
            <SignUpPage />
            <LoginPage />
          </Col>
        </Container>
      )}
    </div>
  );
}

export default HomePage;
