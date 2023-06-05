import React, { useState } from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function BookItem({ 
    image, 
    title, 
    description, 
    purchaseUrl,
    likes,
    id,
    book,
    booksArray,
    setBooksArray
 }) {

    const [showFullDescription, setShowFullDescription] = useState(false)
    function handleDescClick() {
        setShowFullDescription((showFullDescription) => !showFullDescription)
    }

    const [isLiked, setIsLiked] = useState(false);

    const handleClick = () => {
      const updatedLikes = isLiked ? likes - 1 : likes + 1;
      setIsLiked(!isLiked);
  
      const updateObj = {
        likes: updatedLikes,
      };
      fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateObj),
      })
        .then((resp) => resp.json())
        .then((updatedBook) => {
          const newBooksArray = booksArray.map((book) =>
            book.id === id ? updatedBook : book
          );
          setBooksArray(newBooksArray);
        });
    };

    return (
        <div>
          <Card sx={{ maxWidth: 370, minHeight: 410, marginBottom: "20px" }}>
            <CardMedia sx={{ height: 250 }} image={image} />
            <div className="card-content">
              <div className="likes">
                <a className="like-button" onClick={handleClick}>
                  {isLiked ? "♥" : "♡"}
                </a>
                Likes: {likes}
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                lineHeight="1.2em"
                fontSize="15pt"
              >
                {title}
              </Typography>
              <Typography
                onClick={handleDescClick}
                style={{ cursor: "pointer" }}
                variant="body2"
                color="text.secondary"
                sx={{ minHeight: 10 }}
              >
                {showFullDescription
                  ? description
                  : description.substring(0, 120) + "..."}
              </Typography>
            </div>
            <div className="card-action">
              <a href={purchaseUrl} target="_blank">
                <button className="link-button">Buy Now</button>
              </a>
            </div>
          </Card>
        </div>
      );

}

export default BookItem;

// return (
//     <div>
//         <Card sx={{ maxWidth: 370, minHeight: 400, marginBottom: "20px" }}>
//             <CardMedia sx={{ height: 250 }} image={image} />
//             <CardContent sx={{ minHeight: 150 }}>
//                 <Typography gutterBottom variant="h5" component="div">
//                     {title}
//                 </Typography>
//                 <Typography onClick={handleDescClick} style={{cursor:'pointer'}} variant="body2" color="text.secondary">
//                     {showFullDescription ? description : description.substring(0, 100) + "..."}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Button href={purchaseUrl} target="_blank" size="small">Buy Now</Button>
//             </CardActions>
//         </Card>
//     </div>
// );