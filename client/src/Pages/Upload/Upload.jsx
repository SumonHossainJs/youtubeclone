import React, { useEffect, useState } from "react";
import "./Upload.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [video, setVideo] = useState(undefined);
  const [img, setImg] = useState(undefined);
  const [imgPers, setImgPers] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
  });
  const [tags, setTags] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        urlType === "imgUrl"
          ? setImgPers(Math.round(progress))
          : setVideoPerc(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  useEffect(() => {
    // Enable the button if all required fields are filled
    setIsButtonDisabled(
      !video || !img || !inputs.title || !inputs.desc || tags.length === 0
    );
  }, [video, img, inputs.title, inputs.desc, tags]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5030/video/addVideo",
      { ...inputs, tags },
      { withCredentials: true }
    );

    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  const navigate = useNavigate();

  return (
    <div className="updiiv">
      <h2>Upload a new video </h2>

      <div className="input">
        <label htmlFor="video">Video:</label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <input
            className="videoInput"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <input
          className="title"
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="v-description"
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <input
          className="v-tags"
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />

        <div className="input">
          <label htmlFor="img">Img:</label>
          {imgPers > 0 ? (
            "Uploading:" + imgPers + "%"
          ) : (
            <input
              className="c-img"
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
        </div>

        <button
          className="upbtn"
          onClick={handleUpload}
          disabled={isButtonDisabled}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
