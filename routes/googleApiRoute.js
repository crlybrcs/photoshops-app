const express = require("express");
const router = express.Router();
const axios = require("axios");

// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
const uploader = require("../configs/cloudinary-setup");
const Thing = require("../models/thing-model");
// creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "APIKey.json"
});

router.post("/upload", (req, res) => {
  console.log("added!", req.body);
  Thing.create({ imageUrl: req.body.imageUrl }).then(response => {
    console.log("response from .post /upload:", response);
    res.json(response);
  });
});

//
router.get("/search/:id", async (req, res) => {
  console.log("req.params from googleApiRoute", req.params);
  console.log("req.params.id from googleApiRoute:", req.params.id);
  Thing.findById(req.params.id).then(response => {
    console.log("response Thing.findById:", response);
    const { imageUrl } = response;
    let resultLabels;
    let resultWebEntities;
    let resultText;

    // -------- DETECT LABELS ---------
    async function detectLabels() {
      // Performs label detection on the local file
      const [result] = await client.labelDetection(imageUrl);
      const labels = result.labelAnnotations;

      if (labels.length) {
        //console.log("LABELS: ", labels.splice(0, 5));
        resultLabels = labels.splice(0, 5).map(item => {
          return `${item.description}`;
        });
        console.log("NEW LABELS:", resultLabels);
        return resultLabels;
      }
    }

    // ------- WEB DETECTION FROM API --------
    async function detectWeb() {
      // Detect similar images on the web to a local file
      const [result] = await client.webDetection(imageUrl);
      const webDetection = result.webDetection;

      if (webDetection.webEntities.length) {
        // console.log(`Web entities found: ${webDetection.webEntities.length}`);
        resultWebEntities = webDetection.webEntities.splice(0, 5).map(item => {
          return `${item.description}`;
        });
        console.log("NEW WEB ENT: ", resultWebEntities);
        // console.log(`  Description: ${webEntity.description}`);
        // console.log(`  Score: ${webEntity.score}`);
        // });
        return resultWebEntities;
      }
    }

    // -------- DETECT TEXT --------
    async function detectText() {
      // Performs text detection on the local file
      const [result] = await client.textDetection(imageUrl);
      const detections = result.fullTextAnnotation;
      resultText = detections.text;
      // resultText.split('\n').join(' ');
      console.log("NEW TEXT:", resultText);
      // return
      return resultText.split("\n").join(" ");
    }

    const labelsResults = detectLabels().catch(console.error);
    const detectWebResults = detectWeb().catch(console.error);
    const detectTextResults = detectText().catch(console.error);

    Promise.all([labelsResults, detectWebResults, detectTextResults]).then(
      promised => {
        console.log("Promise.all -> promised: ", promised);
        const labels = promised[0];
        const webR = promised[1];
        const textR = promised[2];
        const responseForFrontEnd = {
          imageUrl,
          labels: labels,
          webResults: webR,
          textResults: textR
        };
        res.json(responseForFrontEnd);
      }
    );

    // const responseForFrontEnd = {
    // 	imageUrl,
    // 	labels: labelsResults,
    // 	webResults: detectWebResults,
    // 	textResults: detectTextResults
    // };

    // res.json(responseForFrontEnd);
  });
});

router.post("/", uploader.single("imageUrl"), (req, res, next) => {
  // GET LABEL FROM API
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
  // let resultLabels;
  // let resultWebEntities;
  // let resultText;

  // // -------- DETECT LABELS ---------
  // async function detectLabels() {
  // 	// Performs label detection on the local file
  // 	const [ result ] = await client.labelDetection(req.file.secure_url);
  // 	const labels = result.labelAnnotations;

  // 	if (labels.length) {
  // 		//console.log("LABELS: ", labels.splice(0, 5));
  // 		resultLabels = labels.splice(0, 5).map((item) => {
  // 			return { description: item.description };
  // 		});
  // 		console.log('NEW LABELS:', resultLabels);
  // 		res.json(resultLabels);
  // 	}
  // }

  // // ------- WEB DETECTION FROM API --------
  // async function detectWeb() {
  // 	// Detect similar images on the web to a local file
  // 	const [ result ] = await client.webDetection(req.file.secure_url);
  // 	const webDetection = result.webDetection;

  // 	if (webDetection.webEntities.length) {
  // 		// console.log(`Web entities found: ${webDetection.webEntities.length}`);
  // 		resultWebEntities = webDetection.webEntities.splice(0, 5).map((item) => {
  // 			return { description: item.description };
  // 		});
  // 		console.log('NEW WEB ENT: ', resultWebEntities);
  // 		// console.log(`  Description: ${webEntity.description}`);
  // 		// console.log(`  Score: ${webEntity.score}`);
  // 		// });
  // 		res.json(resultWebEntities);
  // 	}
  // }

  // // -------- DETECT TEXT --------
  // async function detectText() {
  // 	// Performs text detection on the local file
  // 	const [ result ] = await client.textDetection(req.file.secure_url);
  // 	const detections = result.textAnnotations;
  // 	resultText = detections.splice(0, 5).map((item) => item.description);
  // 	console.log('NEW TEXT:', resultText);
  // 	res.json(resultText);
  // }

  // const labelsResults = detectLabels().catch(console.error);
  // const detectWebResults = detectWeb().catch(console.error);
  // const detectTextResults = detectText().catch(console.error);
});

module.exports = router;
