// api/service.js
import axios from "axios";

// theFile - passing the 'uploadData' variable to process the url
const handleUpload = theFile => {
  return axios
    .post("/googleApi", theFile)
    .then(response => response.data)
    .catch(err => err.response.data);
};
const saveNewThing = newThing => {
  return axios
    .post("/googleApi/upload", newThing)
    .then(response => {
      // console.log('TEEEST', response.data);
      return response.data;
      // response.data
    })
    .catch(err => err.response.data);
  // .then(console.log('test'))
};

export { handleUpload, saveNewThing };
