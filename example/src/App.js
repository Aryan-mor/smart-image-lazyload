import React from "react";

import { Img } from "smart-image-lazyload";
import "smart-image-lazyload/dist/index.css";


const App = () => {
  return (
    <div style={{
      width: "50%",
    }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}>
        <Img
          imageWidth={1280}
          imageHeight={794}
          src={"https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/08-14-40-23-has-ph.jpg"}
          placeholderSrc={"https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/08-14-40-23-ph.jpg"}
          alt={"image"} />
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
      </p>
    </div>
  );
};

export default App;
