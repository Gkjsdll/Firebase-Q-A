var mainRef = new Firebase("https://gkjsdll-firebase-q-a.firebaseio.com/");

var $newTitle, $newContent;

$(document).ready(function(){
  $('#addListing button').click(createListing);
  $newTitle = $('#newTitle');
  $newContent = $('#newContent');
});

function createListing(){
  var listing = {title: "", content: ""};
  listing["title"] = $newTitle.val();
  listing["content"] = $newContent.val();
  mainRef.push(listing);
}
