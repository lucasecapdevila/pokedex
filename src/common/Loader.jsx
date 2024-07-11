import { useState } from "react";
import { FadeLoader } from "react-spinners"

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading d-flex justify-content-center my-2">
      <FadeLoader
        color="#485c70"
        height={20}
        width={5}
        loading={loading}
      />
    </div>
  )
}

export default Loader