import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import StarRating from "./StarRating";
import App from "./App.jsx";
import "./index.css";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onMovieRate={setMovieRating} />
//       <p>These movie is rated {movieRating} </p>
//     </div>
//   );
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating
      maxRating={5}
      size={24}
      color="red"
      className="test"
      defaultRating={3}
    />
    <Test /> */}
  </StrictMode>
);
