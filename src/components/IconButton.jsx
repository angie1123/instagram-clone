import { Button } from "react-bootstrap";

export default function IconButton({ isTop, isBottom, className, onClick }) {
  let margin = "light";

  if (isTop){
    margin="light my-4"
  } else if (isBottom) {
    margin="light mt-auto mb-3"
  }

  return (
    /*Use variant to apply predefined styles provided by Bootstrap.
    Use className when you need to apply custom styles or additional classes that are not covered by the built-in variant prop
    */
    <Button variant={margin} style={{ marginBottom: '7px' }} onClick={onClick}>
      <i className={className} style={{fontSize:'24px'}}></i>
    </Button>
  )
}