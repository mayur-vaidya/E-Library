var url, page, totalPages;
$(document).ready(function() {
  $('a.sidebaar').on('click', function() {
    var bookName;
    page = 1;
    bookName = $(this).data("bookname");
    url = "http://it-ebooks-api.info/v1/search/";
    url += bookName;
    url += "/page/";
    tileFinder();
  });

  $("button.next").on("click", function() {
    var selector = $(this).data("type");
    if(selector == "next" && page < totalPages) {
      page += 1;
      tileFinder();
    }
    if(selector == "previous" && page > 1) {
      page -= 1;
      tileFinder();
    }
  });

  $("#tileArea").on("click", "img.tileImage", function() {
    //event.stopImmediatePropagation();
    var images = $(this).attr("src");
    imageClickedModal(images);
  });

  $("#tileArea").on("click", "button.fullDescription", function() {
    //var identifier = $(this).data("sequence");
    var dataId = $(this).data("id");
    var urlById = "http://it-ebooks-api.info/v1/book/"+ dataId;
    //console.log(urlById);
    buttonClickedModal(urlById);
  });

  $("#tileArea").on("click", "a", function(){
    // $(".tile").animate({minHeight: "500px"},1000);
  });


});

function tileFinder() {
  var books;
  var tiles;
  var dynamicUrl;
  var tiles = [];
  dynamicUrl = url + page;
  console.log(dynamicUrl);
  $.get(dynamicUrl, function(data, status) {
    if(status == "success") {
      books = data.Books;
      totalPages = Math.round(parseInt(data.Total)/10);
      //console.log(totalPages);
      for(var i = 0; i < books.length; i++) {
        tile = "<div class='tile'>";
        tile += "<img class='tileImage' data-toggle='modal' data-target='#myImageModal' src='";
        tile += books[i].Image;
        tile += "'/>";
        tile += "<p class='tile-heading'>";
        tile += books[i].Title;
        tile += "</p>";
        tile += "<p class='tile-content'>";
        if(books[i].Description != null) {
          tile += books[i].Description;
          tile += "<a href=''> &nbsp;&nbsp;&nbsp; more.. </a>";
        }
        else {
          tile += "Sorry! Text Not Available.";
        }
        tile +="</p>"
        tile += "<div class='full-description-button'>";
        tile += "<button type='button' class='btn btn-primary fullDescription' data-toggle='modal' data-target='#myModal' data-id='";
        tile += books[i].ID;
        tile += "'> Details </button></div></div>";
        tiles[i] = tile;
      }

      var node = ["","","",""];
      for(var k = 0, a = 0; k < tiles.length; k++, a++) {
        if(a == 4){a = 0;}
        node[a] += tiles[k];
      }

      for(var l = 0; l < node.length; l++) {
        var idName = "#column";
        idName = idName + (l+1);
        $(idName).html(node[l]);
      }
    }
  });
}

function imageClickedModal(image) {
  var modal;
  var image = image;
  modal = "<div class='modal fade' id='myImageModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>";
  modal += "<div class='modal-dialog' role='document'>";
  modal += "<div align='center'><img src='";
  modal += image;
  modal += "'></div>";
  modal += "</div>";
  $("#tile-modal").empty();
  $("#tile-modal").html(modal);
}

function buttonClickedModal(identifier) {
  var modal;
  var urlById = identifier;

  $.get(urlById , function(data, status) {
    if(status == "success") {
      book = data;
      //var modal = "<div class='modal-dialog''><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal 'aria-label='Close'><span aria-hidden='true'>&times;</span></button><h4>"+book.Title+"</h4><h6>"+subtitle+"</h6></div><div class='modal-body'><div style = 'padding:20px'><img style ='float: left;height: 200px;' src ='"+book.Image+"'><img><p style='padding: 20px;  margin-left: 30%;'>"+book.Description+"</p><ul style='margin-left: 30%;'><li>ISBN number is: "++"</li></ul></div></div></div></div>";
    detailedModals();
      // modal = "<div id='myModal' class='modal fade' role='dialog'>";
      // modal += "<div class='modal-dialog'>";
      // modal += "<div class='modal-content'>";
      // modal += "<div class='modal-header'>";
      // modal += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
      // modal += "<h4 class='modal-title'>";
      // modal += book.Title+" - "+book.SubTitle;
      // modal += "</h4>";
      // modal += "</div>";
      // modal += "<div class='modal-body'>";
      // modal += "<p>hello";
      // modal += "<img style='float:left;' src='"+book.Image+"'>"+book.Description;
      // modal +="</p>";
      // modal += "</div>";
      // modal += "<div class='modal-footer'>";
      // modal += "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
      // modal += "</div>";
      // modal += "</div>";
      // modal += "</div>";
      // modal += "</div>";
      // $("#tile-modal").empty();
      //
      // $("#tile-modal").html(modal);
      // $("#tile-modal").show(modal);
    }

});

}

function detailedModals(){
  console.log(book);
  console.log(book.Title);
  console.log(book.SubTitle);
  console.log(book.Description);
  console.log(book.Author);
  console.log(book.Publisher);
  //var modal;
  $("#tile-full-modal").show();
  $("#tile-full-modal").addClass("my-modal");
  var modal = "<div id='modal' >";
  modal += "<div class='modal-dialog'>";
  modal += "<div class='modal-content'>"
  modal += "<div class='modal-header'>";
  modal += "<button type='button' class='close' data-dismiss='modal 'aria-label='Close'>";
  modal += "<span aria-hidden='true'>&times;</span>";
  modal += "</button><h4>"+book.Title+"</h4><h6>";
  if(book.SubTitle != null) { modal += book.SubTitle + "</h6></div>"; }
  else {modal += " " + "</h6></div>";}
  modal += "<div class='modal-body'><div style = 'padding:20px'>";
  modal += "<img style ='float: left;' src ='"+book.Image+"'>";
  modal += "<img><p style='padding: 20px;  margin-left: 30%;'>"+book.Description+"</p>";
  modal += "<ul style='margin-left: 30%;'>";
  modal += "<li>ISBN number is: "+book.ISBN+"</li>";
  modal += "<li>Author is: "+book.Author+"</li><li>Publisher is: "+book.Publisher+"</li></ul>";
  modal += "</div></div></div></div></div>";
  $("#tile-full-modal").on("click", "button", function(){
    console.log("Hello");
    $("#tile-full-modal").removeClass("my-modal");
    $("#tile-full-modal").hide();
  });
  // modal = "<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>";
  // modal += "<div class='modal-dialog' role='document'>";
  // modal += "<div class='modal-header'>";
  // modal += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
  // modal +="<h4 class='modal-title detailing'>";
  // modal += book.Title;
  // modal += "</h4></div>";
  // modal += "<div class='modal-body detailing'>";
  // modal += book.Description + "</div>";
  // modal += "<div align='center'><img src='";
  // modal += book.Image;
  // modal += "'></div>";
  // modal += "</div>";
  $("#tile-full-modal").html(modal);
}
