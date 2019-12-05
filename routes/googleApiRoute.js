const express = require("express");
const router = express.Router();
// const picnikeImg = require("../picnike");

// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");

// creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "APIKey.json"
});

router.get("/", (req, res) => {
  // GET LABEL FROM API

  let resultLabels;
  let resultWebEntities;
  let resultText;

  // -------- DETECT LABELS ---------
  async function detectLabels() {
    // Performs label detection on the local file
    const [result] = await client.labelDetection("backpack.jpg");
    const labels = result.labelAnnotations;

    if (labels.length) {
      //console.log("LABELS: ", labels.splice(0, 5));
      resultLabels = labels.splice(0, 5).map(item => {
        return { description: item.description };
      });
      console.log("NEW LABELS:", resultLabels);
    }
  }

  // ------- WEB DETECTION FROM API --------
  async function detectWeb() {
    // Detect similar images on the web to a local file
    const [result] = await client.webDetection("backpack.jpg");
    const webDetection = result.webDetection;

    if (webDetection.webEntities.length) {
      // console.log(`Web entities found: ${webDetection.webEntities.length}`);
      resultWebEntities = webDetection.webEntities.splice(0, 5).map(item => {
        return { description: item.description };
      });
      console.log("NEW WEB ENT: ", resultWebEntities);
      // console.log(`  Description: ${webEntity.description}`);
      // console.log(`  Score: ${webEntity.score}`);
      // });
    }
  }

  // -------- DETECT TEXT --------
  async function detectText() {
    // Performs text detection on the local file
    const [result] = await client.textDetection("backpack.jpg");
    const detections = result.textAnnotations;
    resultText = detections.splice(0, 5).map(item => item.description);
    console.log("NEW TEXT:", resultText);
  }

  const labelsResults = detectLabels().catch(console.error);
  const detectWebResults = detectWeb().catch(console.error);
  const detectTextResults = detectText().catch(console.error);
});

module.exports = router;
