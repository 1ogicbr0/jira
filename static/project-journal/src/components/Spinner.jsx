import React from "react";

import Spinner from "@atlaskit/spinner";

const Loading = ({ size, appearance }) => {
  return <Spinner size={size || "small"}
  
   appearance={appearance || "inverted"}
  />;
};

export default Loading;
