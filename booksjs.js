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
        tile = "<div class='col-md-3 col-sm-6 col-xs-12' style='padding-right:0px;padding-bottom:0px;padding-top:15px;'>";
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
          document.getElementById("book1").innerHTML = tile;
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
  modal += "<div class='modal-body detailing'><p>";
  modal += books[sequence].Description;
  modal += "&hellip;</p>";
  modal += "</div></div>";
  document.getElementById("modals").innerHTML = modal;
}
