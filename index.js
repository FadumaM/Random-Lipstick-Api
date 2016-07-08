var rp = require("request-promise");
var cheerio  = require("cheerio");
var mongoose = require("mongoose");
var config   = require("./config/config");


mongoose.connect(config.database, function(){
  console.log("Connected with database");
});


var Colorurl   = "http://www.maccosmetics.co.uk/product/13854/310/Products/Makeup/Lips/Lipstick/Lipstick";

var Nameurl = "http://www.maccosmetics.co.uk/product/13854/310/Products/Makeup/Lips/Lipstick/Lipstick#/shade/Finally_Free_%28ONLINE_EXCLUSIVE%29";

getColor(Colorurl);
getName(Nameurl);

function getColor(Colorurl) {
  return rp(Colorurl)
    .then(function(body) {
      var $      = cheerio.load(body);
      var lipsticks;
      $("select").each(function() {
        if ($(this).toString().indexOf("data-product") > -1) lipsticks = $(this).text(); {
          var lipsticksColor = lipsticks.match(/(?:#|0x)?(?:[0-9a-f]{2}){3,4}/ig);
          console.log(lipsticksColor);
        }
      });
    })
    .catch(function(err) {
      console.log("something went wrong...", err);
    });
}

function getName(Nameurl) {
  return rp(Nameurl)
    .then(function(body) {
      var $      = cheerio.load(body);
      var lipsticksName;
      $("div.shade-picker-float__colors").each(function() {
        lipsticksName = $(this).text();
        console.log(lipsticksName);
      });
    })
    .catch(function(err) {
      console.log("something went wrong...", err);
    });
}
