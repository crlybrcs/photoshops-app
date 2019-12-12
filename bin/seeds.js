// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Product = require("../models/Product");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/photoshops-app", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//title | product_id | stars | num_reviews | price | image

const seeds = [
  {
    title: "Nike Mens Air Max Torch 4 Running Shoes",
    product_id:
      "/Torch-Anthracite-Metallic-Silverq-Running/dp/B01CB0NXGO/ref=sr_1_1?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-1",
    stars: 4.2,
    num_reviews: "47",
    price: "$98.95",
    image: "https://m.media-amazon.com/images/I/81ZjV09zpqL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Mens Air Max Motion 2 Running Shoes",
    product_id:
      "/Nike-Mens-Motion-Running-Shoes/dp/B07NWZFR4J/ref=sr_1_2?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-2",
    stars: 4.2,
    num_reviews: "13",
    price: "$89.98",
    image: "https://m.media-amazon.com/images/I/81uyRRDnQ4L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max 2017 Running Shoes-Bright Crimson/Total Crimson",
    product_id:
      "/Mens-Nike-Air-Max-2017-UK/dp/B06Y4KXZF2/ref=sr_1_3?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-3",
    stars: 4.2,
    num_reviews: "274",
    price: "$160.00",
    image: "https://m.media-amazon.com/images/I/61zacPsaHnL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Air Max Torch 3 Men's Running Shoes",
    product_id:
      "/Nike-Torch-Running-Shoes-Black/dp/B001CQ3CG0/ref=sr_1_4?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-4",
    stars: 4.4,
    num_reviews: "672",
    price: "$86.66",
    image: "https://m.media-amazon.com/images/I/71wbXtpEwQL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Sneakers",
    product_id:
      "/Nike-Air-Max-90-Essential/dp/B019RKYJ2I/ref=sr_1_5?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-5",
    stars: 4.5,
    num_reviews: "967",
    price: "$149.96",
    image: "https://m.media-amazon.com/images/I/81PRe9ihKKL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Air Max 90 Qs 'Mars Landing' - Cd0920-600 - Size 10",
    product_id:
      "/Air-Max-Mars-Landing-Cd0920-600/dp/B07PSKLTB5/ref=sr_1_6?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-6",
    stars: 1,
    num_reviews: "1",
    price: "$139.00",
    image: "https://m.media-amazon.com/images/I/51JGgMxmBHL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Motion Low Cross Trainer",
    product_id:
      "/NIKE-Motion-Athletic-White-Regular/dp/B013S3HRBA/ref=sr_1_7?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-7",
    stars: 4.6,
    num_reviews: "227",
    price: "$59.99",
    image: "https://m.media-amazon.com/images/I/81vdmjyoqZL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Air Max 270 React Mens Ao4971-002",
    product_id:
      "/Nike-React-Mens-Ao4971-002-Size/dp/B07TR339BQ/ref=sr_1_8?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-8",
    stars: 4.3,
    num_reviews: "10",
    price: null,
    image: "https://m.media-amazon.com/images/I/41UEStlkZAL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Mens Air Max 270 SE, Spirit Teal - 10.5",
    product_id:
      "/Nike-Mens-Air-Spirit-Teal/dp/B07RGXSYK1/ref=sr_1_9?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-9",
    stars: 5,
    num_reviews: "2",
    price: "$134.00",
    image: "https://m.media-amazon.com/images/I/61yjDeaCBJL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Womens Air Max 2017 Running Shoes",
    product_id:
      "/Womens-Nike-2017-Running-Shoe/dp/B003KG5JR0/ref=sr_1_10?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-10",
    stars: 4.4,
    num_reviews: "187",
    price: "$129.96",
    image: "https://m.media-amazon.com/images/I/81O2Liop1rL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max 270 SE Shoes (7, Black/White)",
    product_id:
      "/Nike-Womens-Shoes-Black-White/dp/B07RQ1FQ6T/ref=sr_1_11?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-11",
    price: null,
    image: "https://m.media-amazon.com/images/I/61Fp1l9QvBL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Women's Nike Air Max 2017 Running Shoe, White/Black/Hot Punch, 7.5",
    product_id:
      "/Womens-Nike-2017-Running-Shoe/dp/B003KIFNE2/ref=sr_1_12?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-12",
    stars: 3.4,
    num_reviews: "3",
    price: "$129.96",
    image: "https://m.media-amazon.com/images/I/81O2Liop1rL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Men's Air Max 270 Flyknit Fashion Sneakers (10, Chili Red/Black/Challenge Red/White)",
    product_id:
      "/Nike-Air-Max-270-Flyknit/dp/B07G7SN7K5/ref=sr_1_13?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-13",
    stars: 4.1,
    num_reviews: "7",
    price: "$126.34",
    image: "https://m.media-amazon.com/images/I/61z+xJ5SfjL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max LTD 3 Running Sneakers",
    product_id:
      "/Nike-Shoes-Black-White-bv1171-001/dp/B07HYFXP2R/ref=sr_1_14?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-14",
    stars: 3.7,
    num_reviews: "14",
    price: "$169.96",
    image: "https://m.media-amazon.com/images/I/41wLwaFIv0L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max 270",
    product_id:
      "/Nike-Womens-WMNS-White-Black-White/dp/B079QJSHSB/ref=sr_1_15?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-15",
    stars: 4.5,
    num_reviews: "2",
    price: "$173.23",
    image: "https://m.media-amazon.com/images/I/61klirFhC4L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max Sequent 3 Running Shoe",
    product_id:
      "/NIKE-Womens-Sequent-Running-Platinum/dp/B07144JYGM/ref=sr_1_16?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-16",
    stars: 3.7,
    num_reviews: "171",
    price: "$64.96",
    image: "https://m.media-amazon.com/images/I/8162r2MSJ9L._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Impdoo Mens Air Cushion Running Tennis Shoes Fashion Breathable Casual Walking Sneakers Us7-12.5",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_mtf_aps_sr_pg1_1?ie=UTF8&adId=A0011605DLJJDK1PUH6Z&url=%2FImpdoo-Cushion-Running-Breathable-Sneakers%2Fdp%2FB07T6LKV8Y%2Fref%3Dsr_1_17_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-17-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_mtf",
    stars: 4.1,
    num_reviews: "22",
    price: "$36.99",
    image: "https://m.media-amazon.com/images/I/71OiLbNOLFL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Impdoo Mens Air Athletic Running Sneaker Cute Fitness Sport Gym Jogging Tennis Shoes (US7-12.5 D(M)",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_mtf_aps_sr_pg1_2?ie=UTF8&adId=A0059677R7L3BNJL5SE4&url=%2FImpdoo-Athletic-Running-Sneaker-Whiteblue%2Fdp%2FB07XZ5LNK6%2Fref%3Dsr_1_18_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-18-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_mtf",
    stars: 4.2,
    num_reviews: "23",
    price: "$36.99",
    image: "https://m.media-amazon.com/images/I/81ie8VQ+18L._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "GANNOU Men's Air Athletic Running Shoes Fashion Sport Gym Jogging Tennis Fitness Sneaker (US7-12.5 D(M)",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_mtf_aps_sr_pg1_3?ie=UTF8&adId=A1048223EAXNVAW1NPW8&url=%2FGANNOU-Athletic-Running-Fashion-Graygreen%2Fdp%2FB07XZ7479N%2Fref%3Dsr_1_19_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-19-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_mtf",
    stars: 4.1,
    num_reviews: "38",
    price: "$36.99",
    image: "https://m.media-amazon.com/images/I/81XNwSaCz8L._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "GANNOU Men Air Cushion Running Tennis Shoes Trail Lightweight Breathable Athletic Fitness Fashion Walking Sneakers Us7-11.5",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_mtf_aps_sr_pg1_4?ie=UTF8&adId=A0990524YFBUIQM20ZIU&url=%2FGANNOU-Lightweight-Breathable-Athletic-Sneakers%2Fdp%2FB07RQ6Y4JJ%2Fref%3Dsr_1_20_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-20-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_mtf",
    stars: 4,
    num_reviews: "51",
    price: "$32.99",
    image: "https://m.media-amazon.com/images/I/81Qj1wCaeaL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Air Max 270 Flyknit - Mens Chili Red/Black/Challenge Red/White Nylon Training Shoes,11",
    product_id:
      "/NIKE-Air-Max-270-Flyknit/dp/B07G7RV6HT/ref=sr_1_21?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-21",
    stars: 3,
    num_reviews: "1",
    price: "$135.39",
    image: "https://m.media-amazon.com/images/I/71yo08pn8OL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Mens Air Vapormax 2019 Running Shoes",
    product_id:
      "/Nike-Vapormax-Black-Cross-Trainers-Shoes/dp/B07NF1KN64/ref=sr_1_22?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-22",
    stars: 3.8,
    num_reviews: "49",
    price: "$144.73",
    image: "https://m.media-amazon.com/images/I/714auqKaeRL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Womens Air Max Dia Running Shoes",
    product_id:
      "/Nike-Womens-Running-Shoes-Fuschia/dp/B07QQZJ4Q4/ref=sr_1_23?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-23",
    stars: 4.5,
    num_reviews: "36",
    price: "$62.48",
    image: "https://m.media-amazon.com/images/I/81FBTynD2mL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Air Max 95 Now Kids Big Kids Av2289-600 Size 6",
    product_id:
      "/Nike-Air-Kids-Av2289-600-Size/dp/B07PP5DXGX/ref=sr_1_24?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-24",
    price: null,
    image: "https://m.media-amazon.com/images/I/61BsEnkzcSL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max LTD 3 Running Sneakers",
    product_id:
      "/Nike-Shoes-White-University-bv1171-100/dp/B07HYGB67F/ref=sr_1_25?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-25",
    stars: 5,
    num_reviews: "7",
    price: "$167.96",
    image: "https://m.media-amazon.com/images/I/61GvUNOmFYL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Reax Run 5 Running Shoes",
    product_id:
      "/NIKE-WMNS-Reax-Womens-407987-116/dp/B0091UYZGK/ref=sr_1_26?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-26",
    stars: 4.3,
    num_reviews: "222",
    price: "$89.00",
    image: "https://m.media-amazon.com/images/I/61P9Ddj8G1L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max 270 Running Shoe",
    product_id:
      "/Nike-Womens-Black-White-Cross-Trainers/dp/B07NJMCJXC/ref=sr_1_27?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-27",
    stars: 4.1,
    num_reviews: "52",
    price: null,
    image: "https://m.media-amazon.com/images/I/61pMtezVo4L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Typha 2 Training Shoes",
    product_id:
      "/NIKE-Typha-Mens-Ao3020-001-Size/dp/B078FG43XB/ref=sr_1_28?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-28",
    stars: 4.1,
    num_reviews: "8",
    price: "$95.89",
    image: "https://m.media-amazon.com/images/I/51gtgFCh36L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max Torch 4 Running Shoe",
    product_id:
      "/NIKE-Womens-Running-Platinum-Metallic/dp/B07BNR8PYX/ref=sr_1_29?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-29",
    stars: 4.5,
    num_reviews: "339",
    price: "$60.00",
    image: "https://m.media-amazon.com/images/I/61tS8uJ6LyL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Axis Ankle-High Mesh Running",
    product_id:
      "/Nike-AA2146-009-Casual-Shoes-Red-Platinum/dp/B07HKKFLPS/ref=sr_1_30?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-30",
    stars: 4,
    num_reviews: "9",
    price: "$79.51",
    image: "https://m.media-amazon.com/images/I/71cJrgxfyYL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max 270 Running Shoes-Total Orange/White",
    product_id:
      "/Nike-Womens-Black-Anthracite-AH6789-001/dp/B079QJZ9V9/ref=sr_1_31?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-31",
    stars: 4.7,
    num_reviews: "17",
    price: null,
    image: "https://m.media-amazon.com/images/I/51fTaWaWrsL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Monarch IV Cross Trainer",
    product_id:
      "/Nike-Air-Monarch-Black-size/dp/B004K4F2Q4/ref=sr_1_32?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-32",
    stars: 4.4,
    num_reviews: "6,570",
    price: null,
    image: "https://m.media-amazon.com/images/I/81xxEY5CigL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Sequent 3 Running Shoe",
    product_id:
      "/Sequent-Running-Black-Anthracite-Shoes/dp/B06XTM8G36/ref=sr_1_33?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-33",
    stars: 3.7,
    num_reviews: "231",
    price: "$88.99",
    image: "https://m.media-amazon.com/images/I/81awN5qE8pL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max 720 Mesh Casual Shoes",
    product_id:
      "/Nike-Black-Anthracite-Casual-Shoes/dp/B07NVVQY3Z/ref=sr_1_34?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-34",
    stars: 3.9,
    num_reviews: "18",
    price: "$128.53",
    image: "https://m.media-amazon.com/images/I/61nJ9jPz27L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Mens Air Max 720 Running Shoes",
    product_id:
      "/Nike-Mens-Shoes-Royal-Hyper/dp/B07PPK7HST/ref=sr_1_35?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-35",
    stars: 3.9,
    num_reviews: "24",
    price: null,
    image: "https://m.media-amazon.com/images/I/51Fv-KEPlPL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Air Max 270 Men's Running Shoes White/Black-White AH8050-100 (11.5 D(M) US)",
    product_id:
      "/NIKE-Running-Shoes-Black-White-AH8050-100/dp/B078WZGYFQ/ref=sr_1_36?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-36",
    price: null,
    image: "https://m.media-amazon.com/images/I/81iVBPuZxIL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Women's Air Max 2017 Running Shoe Pure Platinum/White-Cool Grey-HOT Lava 8.0",
    product_id:
      "/Nike-Running-Platinum-White-Cool-Grey-HOT/dp/B06XSXNCXH/ref=sr_1_37?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-37",
    price: "$130.12",
    image: "https://m.media-amazon.com/images/I/716+5gdaoiL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Air Max 97 Se Reflective Mens Running Trainers Bq6524 Sneakers Shoes",
    product_id:
      "/Nike-BQ6524-001-Mens-Orange-Sneakers/dp/B00NQ6ATI8/ref=sr_1_38?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-38",
    stars: 4.4,
    num_reviews: "16",
    price: null,
    image: "https://m.media-amazon.com/images/I/61RspW+6iBL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max 1",
    product_id:
      "/Nike-Womens-Shoe-319986-116-Size/dp/B073N5NFY4/ref=sr_1_39?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-39",
    stars: 4.3,
    num_reviews: "12",
    price: null,
    image: "https://m.media-amazon.com/images/I/71Zkduyn73L._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Air Max 270 AH8050-013 Oil Grey/Habanero Red/Black Men's Running Shoes (11.5)",
    product_id:
      "/NIKE-AH8050-013-Habanero-Black-Running/dp/B00IFOUGPC/ref=sr_1_40?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-40",
    stars: 4.7,
    num_reviews: "3",
    price: null,
    image: "https://m.media-amazon.com/images/I/71552L5ls1L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max Tavas Running Shoes",
    product_id:
      "/NIKE-Womens-Tavas-Running-916791/dp/B0763QKJDX/ref=sr_1_41?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-41",
    stars: 5,
    num_reviews: "2",
    price: "$68.88",
    image: "https://m.media-amazon.com/images/I/716szg84IbL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Mens Air Max 270 SE, Spirit Teal - 10",
    product_id:
      "/Nike-Mens-Air-Spirit-Teal/dp/B07RMSCGLT/ref=sr_1_42?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-42",
    price: "$111.94",
    image: "https://m.media-amazon.com/images/I/61yjDeaCBJL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Multisport Outdoor Shoes",
    product_id:
      "/NIKE-Mens-Command-Leather-Sneakers/dp/B01HZQU8QC/ref=sr_1_43?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-43",
    stars: 3.9,
    num_reviews: "4",
    price: "$52.05",
    image: "https://m.media-amazon.com/images/I/81FhF71nlNL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Alpha Trainer",
    product_id:
      "/Nike-Trainers-AA7060-Sneakers-Anthracite/dp/B07DCJ5FPN/ref=sr_1_44?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-44",
    stars: 4.7,
    num_reviews: "5",
    price: null,
    image: "https://m.media-amazon.com/images/I/71Lv0zzIWuL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Air Max 270 Se Mens Running Trainers Aq9164 Sneakers Shoes",
    product_id:
      "/Nike-Spirit-Teal-Mens-AQ9164-102/dp/B07RJ222VR/ref=sr_1_45?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-45",
    stars: 5,
    num_reviews: "4",
    price: "$116.93",
    image: "https://m.media-amazon.com/images/I/61yjDeaCBJL._AC_UL320_ML3_.jpg"
  },
  {
    title: "NIKE W Air Max Thea MID Women's Sneaker Black 859550 001",
    product_id:
      "/NIKE-Womens-Trainers-859550-Sneakers/dp/B01MA3XX43/ref=sr_1_46?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-46",
    stars: 4.3,
    num_reviews: "17",
    price: null,
    image: "https://m.media-amazon.com/images/I/81COTTocWkL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Typha Training Shoe",
    product_id:
      "/Typha-Training-Shoes-Metallic-Silver-M/dp/B07797MDD4/ref=sr_1_47?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-47",
    stars: 4.5,
    num_reviews: "85",
    price: "$85.48",
    image: "https://m.media-amazon.com/images/I/81Wy1Nu-+0L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max Axis Premium Running Shoe",
    product_id:
      "/Nike-Womens-Premium-Running-Sapphire/dp/B07HKKK862/ref=sr_1_48?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-48",
    stars: 4.2,
    num_reviews: "31",
    price: "$53.39",
    image: "https://m.media-amazon.com/images/I/71ZpyhRCwWL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Air Max 270",
    product_id:
      "/Nike-Air-Max-White-University/dp/B07TCJDFP9/ref=sr_1_49?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-49",
    stars: 4.3,
    num_reviews: "7",
    price: null,
    image: "https://m.media-amazon.com/images/I/81-XsTFQEbL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max 1 Premium Retro Tough Red Mushroom Rush Red",
    product_id:
      "/NIKE-Premium-Retro-Mens-908366-600/dp/B00ZZM1HUU/ref=sr_1_50?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-50",
    stars: 5,
    num_reviews: "2",
    price: "$89.00",
    image: "https://m.media-amazon.com/images/I/81PnN5JbtaL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Women's Air Max 270 Running Shoe (6.5, Lava Glow/Black/White/Blue Fury)",
    product_id:
      "/Nike-Womens-Black-White-Cross-Trainers/dp/B07NJMJF6N/ref=sr_1_51?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-51",
    price: "$148.78",
    image: "https://m.media-amazon.com/images/I/61--YDvaxaL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Women's Air Max Oketo Sneaker",
    product_id:
      "/Nike-Womens-Oketo-Sneaker-Regular/dp/B07HKZPB6T/ref=sr_1_52?dchild=1&keywords=nike+air+max&qid=1576166263&sr=8-52",
    stars: 5,
    num_reviews: "4",
    price: "$69.95",
    image: "https://m.media-amazon.com/images/I/81NlDcFB3KL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Sequent 3 Running Shoe",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_1?ie=UTF8&adId=A0679255332DF3CF9I6NB&url=%2FNIKE-Air-Max-Sequent-Running%2Fdp%2FB075ZYRLCS%2Fref%3Dsr_1_53_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-53-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    stars: 3.7,
    num_reviews: "231",
    price: "$99.12",
    image: "https://m.media-amazon.com/images/I/71pm4AKlZvL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max 2017 Running Shoes-Bright Crimson/Total Crimson",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_2?ie=UTF8&adId=A06798352YAPXLUTFGA2O&url=%2FNike-Mens-Running-Black-Black-Black%2Fdp%2FB00E4Z0034%2Fref%3Dsr_1_54_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-54-spons%26psc%3D1%26smid%3DA36SNRHNJD3Z6X&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    stars: 2.6,
    num_reviews: "4",
    price: "$132.75",
    image: "https://m.media-amazon.com/images/I/8176APJa-aL._AC_UL320_ML3_.jpg"
  },
  {
    title:
      "Nike Mens Air Max Torch 4 Running Shoes (11.5, Black/White University Gold)",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_3?ie=UTF8&adId=A06087803UG9HNLS71SKU&url=%2FNike-Torch-Running-Shoes-University%2Fdp%2FB0813W9B71%2Fref%3Dsr_1_55_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-55-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    price: "$79.95",
    image: "https://m.media-amazon.com/images/I/81IkkyKnfzL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Mens Air Max Torch 4 Running Shoes",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_4?ie=UTF8&adId=A0941657Z7AKBFA0DWHK&url=%2FNIKE-Mens-Torch-Military-Blue-Black%2Fdp%2FB07B1SNGXV%2Fref%3Dsr_1_56_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-56-spons%26psc%3D1%26smid%3DA134OEVQ3I2MCT&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    stars: 4.7,
    num_reviews: "10",
    price: "$80.17",
    image: "https://m.media-amazon.com/images/I/61ldrwXiB4L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Air Max Fly Mens Running Shoes",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_5?ie=UTF8&adId=A10002663G7EU2KZAN6K&url=%2FNike-Air-Max-Fly-White-Wolf%2Fdp%2FB07X51S3LG%2Fref%3Dsr_1_57_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-57-spons%26psc%3D1%26smid%3DA36SNRHNJD3Z6X&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    price: "$58.53",
    image: "https://m.media-amazon.com/images/I/71TcMMvcJhL._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Wavy AV8061-101 Shoes",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_6?ie=UTF8&adId=A00583491MHZE4K3R7N3T&url=%2FNike-AV8061-101-Shoes-White-White-Gum%2Fdp%2FB07YDXRYV5%2Fref%3Dsr_1_58_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-58-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    price: "$62.04",
    image: "https://m.media-amazon.com/images/I/51BdbYU+w2L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Men's Air Max Typha 2 Training Shoes (8, Black/White)",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_7?ie=UTF8&adId=A0971819DPW2FG0Q2RFT&url=%2FNIKE-Typha-Mens-Ao3020-001-Size%2Fdp%2FB0789TLHPZ%2Fref%3Dsr_1_59_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-59-spons%26psc%3D1&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    price: "$68.89",
    image: "https://m.media-amazon.com/images/I/51gtgFCh36L._AC_UL320_ML3_.jpg"
  },
  {
    title: "Nike Mens Air Max 720 Running Shoes",
    product_id:
      "/gp/slredirect/picassoRedirect.html/ref=pa_sp_btf_aps_sr_pg1_8?ie=UTF8&adId=A101130219BE8PVTBRYFD&url=%2FNike-Total-Eclipse-Court-Purple%2Fdp%2FB07VFQJSG1%2Fref%3Dsr_1_60_sspa%3Fkeywords%3Dnike%2Bair%2Bmax%26qid%3D1576166263%26sr%3D8-60-spons%26psc%3D1%26smid%3DA1B6QBLJWGCZW2&qualifier=1576166263&id=6042254850172278&widgetName=sp_btf",
    stars: 3.9,
    num_reviews: "24",
    price: "$115.57",
    image: "https://m.media-amazon.com/images/I/61-o2BCVzgL._AC_UL320_ML3_.jpg"
  }
];

seeds.forEach(product => {
  Product.create({ ...product }).then(productCreated => {
    console.log(productCreated);
    mongoose.disconnect();
  });
});

// Product.create(seeds).then(productsCreated => {
//   console.log(`${productsCreated.length} products created)`).catch(err => {
//     mongoose.disconnect();
//     throw err;
//   });
// });

// User.deleteMany()
//   .then(() => {
//     return User.create(users);
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     mongoose.disconnect();
//     throw err;
//   });
