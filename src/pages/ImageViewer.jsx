import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getImageData } from "../utils/queryDB";
import { BiArrowBack } from "react-icons/bi";

function ImageViewer() {
  const [imageData, setImageData] = useState(null);
  const { fileUUId } = useParams();
  const navigate = useNavigate();

  const fetchImage = async () => {
    try {
      const response = await getImageData(fileUUId, "url");
      setImageData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="w-screen h-screen p-8 bg-slate-800 select-none">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="h-72 w-72 md:h-96 md:w-96 bg-black">
          {imageData && (
            <img
              className="h-72 w-72 md:h-96 md:w-96 border-4 shadow-lg border-teal-400 rounded"
              src={`data:${imageData.type};base64,${imageData.base64Data}`}
              alt="From server"
            />
          )}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="rounded-3xl p-2 md:p-4 mt-6 bg-white flex items-center"
        >
          <BiArrowBack className="text-2xl" />
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ImageViewer;
