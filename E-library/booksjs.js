var url;
var page = 1;
var total;
var books = [];
function loadDoc(){

  var x = new XMLHttpRequest();
  x.onreadystatechange = function(){
    var allKeys, demo, tile, data;
    var allValues = [];

    if(this.status == 200 && this.readyState == 4)
    {
      data = JSON.parse(this.responseText);
      detailedData();
      function detailedData(){
        allKeys = Object.keys(data);
        for(var i = 0; i < allKeys.length; i++)
        {
          demo = allKeys[i];
          allValues[i] = data[demo];
        }
        books = data["Books"];
        total = parseInt(data.Total);
        console.log(typeof(total));
        total = total / 10;
        total = Math.ceil(total);
        console.log(total);
        // console.log(total);
        //console.log(typeof(total));

      /*  tile = "<div class='col-md-3 col-sm-6 col-xs-12' style=';padding-right:0px;padding-bottom:0px;padding-top:15px;'>";
        for(var j = 0; j < books.length; j++){
          if(j != 0){
            tile += "<div class='col-md-3 col-sm-6 col-xs-12' style='padding-right:0px;padding-bottom:0px;padding-top:15px;'>";
          }
          tile += "<div class='books'>";
          tile += "<img class='tile-image' src='";
          tile += books[j].Image;
          tile += "'>";
          tile += "<div class='full-description2'><div class='full-description'><h5 class='book-title'>";
          tile += books[j].Title;
          tile += "</h5>";
          tile += "<p class='tile-content'>";
          tile += books[j].Description;
          tile += "</p></div>";
          tile += "<div class='full-description-button'><button type='button' onclick='modals(";
          tile += j;
          tile += ")' class='btn btn-primary full-description' data-toggle='modal' data-target='#myModal'> Full Desciption </button></div>";
          tile += "<div id='modals'></div></div></div>";
          tile += "</div></div>";
        }
        tile += "<div class='col-xs-12'>";
        tile += "<div align='center'><button type='button' class='next' onclick='previousPage()'> Previous</button>";
        tile +=  "<button type='button' class='next' onclick='nextPage()'> Next</button></div></div>"
        */





//       tile =  "<div class='card-columns' style='margin-top:30px;margin-left:20px;'>";
//
//       for(var j = 0; j < books.length; j++){
//       tile += "<div class='card'>";
//       tile += "<div class='card-block'>";
//       tile += "<img class='card-img-top tile-image' src='";
//       tile += books[j].Image;
//       tile +=  "' alt='No image found'>";
//       tile += "<h4 class='card-title'>";
//       tile += books[j].Title;
//       tile +="</h4>";
//       tile += "<p class='card-text'>";
//       tile += books[j].SubTitle;
//       tile += "</p>";
//       tile += "<div class='full-description-button'><button type='button' onclick='modals(";
//       tile += j;
//       tile += ")' class='btn btn-primary full-description' data-toggle='modal' data-target='#myModal'> Full Desciption </button></div>";
//       tile += "<div id='modals'></div>";
//       tile += "</div></div>";
// }
//   tile+="</div>";
//   tile += "<div class='col-xs-12'>";
//   tile += "<div align='center'><button type='button' class='next' onclick='previousPage()'> Previous</button>";
//   tile +=  "<button type='button' class='next' onclick='nextPage()'> Next</button></div></div>"

var tiles = [];
for(var i = 0; i < books.length; i++){
  tile = "<div class='tile'>";
  tile += "<img class='tile-image' src='";
  tile += books[i].Image;
  tile += "'/>";
  tile += "<h4 class='tile-heading'>";
  tile += books[i].Title;
  tile += "</h4>";
  tile += "<p class='tile-content'>";
  if(books[i].SubTitle != null){
  tile += books[i].SubTitle;}
  else{tile += "Sorry! Text Not Available.";}
  tile +="</p>"
  tile += "<div class='full-description-button'><button type='button' onclick='modals(";
  tile += i;
  tile += ")' class='btn btn-primary full-description' data-toggle='modal' data-target='#myModal'> Full Desciption </button></div></div>";
  tile += "<div id='modals'></div>";
  tiles[i] = tile;
}

//console.log(tiles.length);
var counter = 1;

var node = ["","","",""];
for(var k = 0, a = 0; k < tiles.length; k++, a++)
{ if(a == 4){a = 0;}
  node[a] += tiles[k];
}
//console.log(node[2]);

for(var l = 0; l < node.length; l++, counter++){
  var idName = "column";
  idName = idName + counter;
  var completeTile = node[l];
  //console.log(completeTile);
  document.getElementById(idName).innerHTML = completeTile;
  //e++;
}
      //    document.getElementById("book1").innerHTML = tile;
          //console.log(m);
      }
    }
  };
  var currentURL = url + page;
  console.log(url);
  x.open("GET", currentURL, true);
  x.send();
}

function nextPage(){
  if(page < total){

    page += 1;
    loadDoc();
    console.log(page);
  }
}

function previousPage(){
  if(page > 1){
    page -= 1;
    loadDoc();
    console.log(page);
  }
}

var getBooks = function(bookName) {
  page = 0;
  url = "http://it-ebooks-api.info/v1/search/" + bookName + "/page/";
  loadDoc();
};

var modals = function(modalName) {
  var modal;
  var sequence = modalName;
  modal = "<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>";
  modal += "<div class='modal-dialog' role='document'>";
  modal += "<div class='modal-header'>";
  modal += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
  modal +="<h4 class='modal-title detailing'>";
  modal += books[sequence].Title;
  modal += "</h4></div>";
  modal += "<div class='modal-body detailing'>";
  modal += books[sequence].Description + "</div>";
  modal += "<div align='center'><img src='";
  modal += books[sequence].Image;
  modal += "'></div>";
  modal += "</div>";
  document.getElementById("modals").innerHTML = modal;
}
