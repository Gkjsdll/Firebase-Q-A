var mainRef = new Firebase("https://gkjsdll-firebase-q-a.firebaseio.com/");

var $newTitle, $newContent, $listings;

$(document).ready(function(){
  $('#addListing button').click(createListing);
  $newTitle = $('#newTitle');
  $newContent = $('#newContent');
  $listings = $("#listings");
  $listings.on("click", "div", showListing);
  mainRef.on("value", updateListings);
});

function createListing(){
  var listing = {title: "", content: ""};
  listing["title"] = $newTitle.val();
  listing["content"] = $newContent.val();
  mainRef.push(listing);
}

function updateListings(listings){
  var allListings = [];
  listings.forEach(function(childSnapshot){
    debugger;
    var data = childSnapshot.val();
    var listItem = $("<div>").text(data.title + " – " + data.content)
                            .data("key", childSnapshot.key());
    allListings.push(listItem);
  });
  $listings.empty();
  $listings.append(allListings);
};
