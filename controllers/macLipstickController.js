var rp = require("request-promise");
var cheerio = require("cheerio");

var Colorurl =
  "http://www.maccosmetics.co.uk/product/13854/310/Products/Makeup/Lips/Lipstick/Lipstick";

var Nameurl =
  "http://www.maccosmetics.co.uk/product/13854/310/Products/Makeup/Lips/Lipstick/Lipstick#/shade/Finally_Free_%28ONLINE_EXCLUSIVE%29";
var lipsticks = [];

function getImage(Colorurl) {
  return rp(Colorurl)
    .then(function(body) {
      var $ = cheerio.load(body);
      var images = [];
      $(".shade-picker__color-texture").each(function() {
        images.push($(this).attr('data-bg-image'));
      })
      for (var i = 0; i < images.length; i++) {
        if (images[i] === undefined) {
          images.splice(i, 1);
          i--;
        }

      }
      images.splice(1, 178);
      return images
    })
}

function getColor(Colorurl, response) {
  var images = response;
  return rp(Colorurl)
    .then(function(body) {
      var $ = cheerio.load(body);
      var lipsticksColors = [];
      $("div.shade-picker__color-texture").each(function() {
        lipsticksColors.push($(this).css('background-color'));
      })
      for (var i = 0; i < lipsticksColors.length; i++) {
        if (lipsticksColors[i] === undefined) {
          lipsticksColors.splice(i, 1);
          i--;
        }
      }

      lipsticksColors.splice(1, 178);

      return [images, lipsticksColors];
    })
}

function getName(Nameurl, response) {
  return rp(Nameurl)
    .then(function(body) {
      var $ = cheerio.load(body);
      var lipsticksName;
      var firstFilter;
      var names;
      $("div.shade-picker-float__colors").each(function() {
        lipsticksName = $(this).html();
        // console.log(lipsticksName);
      });
      firstFilter = lipsticksName.match(/(>([^>]+)<\/)/ig);
      names = String(firstFilter).match(
        /[^>|<\/]*[a-z]/ig);
      return [names, response];
    })
}


function createLipstickObject(lippyResponse) {
  var names = lippyResponse[0];
  var lipsticksColors = lippyResponse[1][1];
  var images = lippyResponse[1][0];
  for (var i = 0; i < images.length; i++) {
    lipsticks.push({
      name: names[i],
      color: lipsticksColors[i],
      image: images[i],
      brand: "/media/dev/global/site-logo.svg"
    });
  }
  return lipsticks;
}

function sendLipstick(req, res) {
  return getImage(Colorurl)
    .then(function(response) {
      return getColor(Colorurl, response)
    })
    .then(function(response) {

      return getName(Nameurl, response);
    })
    .then(function(response) {
      return createLipstickObject(response);
    })
    .then(function(response) {
      console.log(response);
      return res.status(200).send(response);
    })
    .catch(function(err) {
      console.log(err);
      if (err) return res.sendStatus(404);
      return res.status(500).send(err);
    });
}

module.exports = {
 lipsticks : sendLipstick
}
