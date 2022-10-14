import SignUpPage from "./signUpPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../assets/Travel-concept.-Opened-book-with-empty-pages-vintage-photos-retro-postcard-label-starfish-and-shell-Scrapbook-Ideas-ss.jpg";
import Image from "react-bootstrap/Image";
import LoginPage from "./loginPage";
import { useState } from "react";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLoggin, setIsOpenLoggin] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleLoggin = () => setIsOpenLoggin(!isOpenLoggin);

  return (
    <div>
      <Container className="d-flex align-items-start">
        <Row className="d-flex align-items-start justify-content-between">
          <Col
            lg={7}
            className="align-items-start "
            style={{ backgroundColor: "" }}
          >
            <h1 className="colName">Welcome to SnapScrap!</h1>
            <span className="userNames">
              A place where you can collect and share all your amazing pictures
              as if it were a real Scrap Book, but without all the glue and the
              whatnots!
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
          <SignUpPage
            isOpen={isOpen}
            toggle={toggle}
            toggleLoggin={toggleLoggin}
          />
          <LoginPage isOpenLoggin={isOpenLoggin} toggleLoggin={toggleLoggin} />
        </Col>
      </Container>
    </div>
  );
}

export default HomePage;
