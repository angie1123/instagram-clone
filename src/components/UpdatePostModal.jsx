import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../App";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  updatePost } from "../features/posts/postsSlice";

export default function UpdatePostModal({ show, handleClose,postId }) {
  const { image, name } = useContext(ProfileContext)
  const dispatch = useDispatch()
  
  const post = useSelector((state) => 
  state.posts.find((post)=>post.id===postId)
  )
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [invalidUrl, setInvalidUrl] = useState(false)
  /*invalidUrl is used to signal whether a provided image URL hads cause an error,
  providing a way to give feedback to the user about the validity of their image URL input
  */
  
  useEffect(() => {
    if (post) {
      setImageUrl(post.image);
      setDescription(post.description)
    }
  }, [post])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (imageUrl) {
      dispatch(
        updatePost({
          id:postId,
          image: imageUrl,
          description
        }))
      setImageUrl("")
      setDescription("")
      handleClose()
    } else {
      setInvalidUrl(true)
    }
  }


  const handleImageError = () => {
    setInvalidUrl(true)
  }

  const handleImageLoad = () => {
    setInvalidUrl(false)
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col sm={7} style={{ margin: '0px' }}>
              <Image
                src={imageUrl ? imageUrl : "https://sig1.co/img-placeholder-1"}
                alt="uploaded content"
                onError={handleImageError}
                onLoad={handleImageLoad}//handleImageLoad run when image has loaded successfully
                style={{width:"100%"}}
              />
            </Col>
            <Col sm={5}>
              <Image
                src={image}
                alt="uploader"
                style={{ width: "32px" }}
                roundedCircle
              />
              <span className="ms-3">{name}</span>

              <Form.Control
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="my-3"
                placeholder="Add image url"
              />
              {/*if invalidUrl is true, this div is showing */}
              {invalidUrl && (
                <div className="text-danger">
                  Invalid URL or failed to load image
                </div>
              )}
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="my-3"
                as="textarea"
                rows={3}
              placeholder="Write a caption..."
              />
              <Button type="submit" style={{ width: "100%" }}>
                Share
              </Button>
            </Col>
          </Row>
      </Modal.Body>
      </Form>
    </Modal>
  )
}