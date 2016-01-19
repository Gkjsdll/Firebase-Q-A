var mainRef = new Firebase("https://gkjsdll-firebase-q-a.firebaseio.com/");

var $newTitle, $newContent, $listings, $mainDiv, $itemInfo, $itemComment;

$(document).ready(function(){
  $('#addListing').on("submit", createListing);
  $newTitle = $('#newTitle');
  $newContent = $('#newContent');
  $listings = $("#listings");
  $mainDiv = $("#mainDiv");
  $itemInfo = $("#itemInfo");
  $itemComment = $("#itemComment");
  $comments = $("#comments");
  $itemInfo.on("click", "span", hideItemInfo);
  $listings.on("click", "div", showListing);
  mainRef.on("value", updateListings);
  $('#comment').on("submit", addComment);
});

function createListing(e){
  e.preventDefault();
  var listing = {title: "", content: "", time: moment().format("h:mma MMM DD"), comments: []};
  listing["title"] = $newTitle.val();
  listing["content"] = $newContent.val();
  listing["comments"] = [];
  mainRef.push(listing);
}

function updateListings(listings){
  var allListings = [];
  listings.forEach(function(childSnapshot){
    var data = childSnapshot.val();
    var listItem = $("<div>").text(data.title + " – " + childSnapshot.val().time)
                             .data("key", childSnapshot.key()); //I would prefer to pull the data from firebase
    allListings.push(listItem);
  });
  $listings.empty();
  $listings.append(allListings);
};

function showListing(e){
  var listing = $(this).data("key");
  mainRef.child(listing).once("value", function(snap){
    $itemInfo.find("#title").text(snap.val().title);
    $itemInfo.find("#infoContent").text(snap.val().content);
    $itemInfo.find("#time").text(snap.val().time);
    $itemInfo.data("key", snap.key());
  });
  popComments($itemInfo.data("key"));
  $itemInfo.show();
  $mainDiv.hide();
}

function hideItemInfo(){
  $itemInfo.hide();
  $mainDiv.show();
}

function addComment(e){
  e.preventDefault();
  var listing = $(this).closest("#itemInfo").data("key");
  var comment = {comment: $("#itemComment").val()};
  mainRef.child(listing + '/messages').push(comment);
  popComments($(this).closest('#itemInfo').data("key"));
}

function popComments(baseKey){
  var comments = [];

  mainRef.child(baseKey+"/messages").once("value", function(babySnap){
    if(babySnap.val()){
      $.each(babySnap.val(), function(key){
        mainRef.child(baseKey+"/messages/"+key).once("value", function(x){
          var comment = $('<li>').text(x.val().comment);
          comments.push(comment);
        });
      });
    }
  });

  $comments.empty();
  $comments.append(comments);
}
