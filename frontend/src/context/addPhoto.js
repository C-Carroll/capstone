import { csrfFetch } from "../store/csrf";

const addPhoto = async (file) => {
  const { url } = await csrfFetch("/api/u/imageUpload").then((res) =>
    res.json()
  );
  console.log(url);
  csrfFetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  const imgUrl = url.split("?")[0];
  return imgUrl;
};

export default addPhoto;
