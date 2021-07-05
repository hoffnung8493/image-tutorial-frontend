import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ImageContext = createContext();

export const ImageProvider = (prop) => {
  const [images, setImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [imageUrl, setImageUrl] = useState("/images");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [me] = useContext(AuthContext);
  const pastImageUrlRef = useRef();
  useEffect(() => {
    if (pastImageUrlRef.current === imageUrl) return;
    setImageLoading(true);
    axios
      .get(imageUrl)
      .then((result) =>
        isPublic
          ? setImages((prevData) => [...prevData, ...result.data])
          : setMyImages((prevData) => [...prevData, ...result.data])
      )
      .catch((err) => {
        console.error(err);
        setImageError(err);
      })
      .finally(() => {
        setImageLoading(false);
        pastImageUrlRef.current = imageUrl;
      });
  }, [imageUrl, isPublic]);
  useEffect(() => {
    if (me) {
      setTimeout(() => {
        axios
          .get("/users/me/images")
          .then((result) => setMyImages(result.data))
          .catch((err) => console.error(err));
      }, 0);
    } else {
      setMyImages([]);
      setIsPublic(true);
    }
  }, [me]);

  return (
    <ImageContext.Provider
      value={{
        images: isPublic ? images : myImages,
        setImages,
        setMyImages,
        isPublic,
        setIsPublic,
        setImageUrl,
        imageLoading,
        imageError,
      }}
    >
      {prop.children}
    </ImageContext.Provider>
  );
};
