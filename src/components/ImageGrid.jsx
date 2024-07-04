// import { useContext } from "react";
// import { ProfileContext } from "../App";
import { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

export default function ImageGrid() {
  //posts is slice from postsSlice
  // const images = useContext(ProfileContext).posts.map((post) => post.image)
  const posts = useSelector((state) => state.posts)
  const [show, setShow] = useState(false)
  const [currentPost,setCurrentPost]=useState(null)
  const dispatch = useDispatch()
  
  const handleClose = () => {
    setCurrentPost(null)
    setShow(false)
  }

  const handleShow = (post) => {
    setCurrentPost(post)
    setShow(true)
  }
  const renderImages = () => {
    return posts.map((post) => (
      <Col md={4} key={post.id} className="mb-4">
        <Image src={post.image} fluid />
        <Button onClick={() => { handleShow(post) }} variant="outline-primary">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button variant="outline-danger" onClick={()=>dispatch(deletePost(post))}>
          <i className="bi bi-trash"></i>
        </Button>
      </Col>
    ))
    // return images.map((imageUrl, index) => (
    //   <Col md={4} key={{ index }} className="mb-4">
    //     <Image src={imageUrl} fluid />{/*fluid: means will scale image nicely to the parent column  */}
    //   </Col>
    // ))
  }

  return (
    <>
      <Row>{renderImages()}</Row>
      {currentPost && (
        <UpdatePostModal
          show={show}
          handleClose={handleClose}
          postId={currentPost.id}
        />
      )}
    </>
)}