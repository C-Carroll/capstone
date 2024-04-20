import { csrfFetch } from "../store/csrf";

const addAudio = async (uid, file) => {
  const { url } = await csrfFetch(`/api/u/songUpload/${uid}`).then((res) =>
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

  const audUrl = url.split("?")[0];
  return audUrl;
};

export default addAudio;
