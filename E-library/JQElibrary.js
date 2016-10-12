var page=1, totalPages;
var books;
var url = "http://it-ebooks-api.info/v1/search/php/page/"

$(document).ready(function() {
  tileFinder();
  $('a.sidebaar').on('click', function() {
    var bookName;
    page = 1;
    bookName = $(this).data("bookname");
    url = "http://it-ebooks-api.info/v1/search/" + bookName + "/page/";
    tileFinder();
  });

  $('button.next').on('click', function() {
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

  $('#tileArea').on('click', 'img.tile-image', function() {
    //event.stopImmediatePropagation();
    var imageURL = $(this).attr("src");
    imageClickedModal(imageURL);
  });

  $('#tileArea').on('click', 'button.full-description', function() {
    var dataId = $(this).data("id");
    var urlById = "http://it-ebooks-api.info/v1/book/"+ dataId;
    console.log(1);
    buttonClickedModal(urlById);
  });

  $('#tileArea').on('click', 'p.tile-content', function() {
    var elements = $(this).hasClass("truncate");
    console.log(elements);
    if( elements == true ) {
      $(this).hide();
      $(this).removeClass("truncate").show(1000);
    }
    else {
      $(this).hide();
      $(this).addClass("truncate").show(1000);
    }
  });
});

function tileFinder() {
  var tile;
  var dynamicUrl;
  var tiles = [];
  dynamicUrl = url + page;
  console.log(dynamicUrl);
  $.get(dynamicUrl, function(data, status) {
    if(status == "success") {
      books = data.Books;
      totalPages = Math.round(parseInt(data.Total)/10);
      for(var i = 0; i < books.length; i++) {
        tile = $('#tile-detailed-html').html();
        var view = {
          image : books[i].Image,
          title : books[i].Title,
          description : books[i].Description,
          rawdata : books[i].ID
       };
       var output = Mustache.render(tile, view);
        console.log(output);
        tiles[i] = output;
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

function imageClickedModal(imageURL) {
  var htmlText = $('#tile-modal-image').html();
  var  view = {
    image : imageURL
  }
 var output = Mustache.render(htmlText, view);
 console.log(output);
  $('#tile-image-modal').html(output);
  $('#image-modal').modal('show');
}

function buttonClickedModal(identifier) {
  var urlById = identifier;

  $.get(urlById , function(data, status) {
    if(status == "success") {
      book = data;
      console.log(book);
      detailedModals();
    }
});
}

function detailedModals() {
  var htmlText = $('#tile-detailed-modal').html();
  var view = {
    title : book.Title,
    subtitle : book.SubTitle,
    author : book.Author,
    publisher : book.Publisher,
    image : book.Image,
    isbn : book.ISBN,
    description : book.Description
  }
  var output = Mustache.render(htmlText, view);
  $('#tile-full-modal').html(output);
  console.log(output);
  $('#complete-modal').modal('show');
}
