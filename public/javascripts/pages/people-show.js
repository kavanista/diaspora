Diaspora.Pages.PeopleShow = function() {
  var self = this;

  this.subscribe("page/ready", function(evt, document) {
    self.stream = self.instantiate("Stream", document.find("#main_stream"));

    self.notifications = self.instantiate("Notifications",
      document.find("#notifications"),
      document.find("#notification_badge .badge_count")
    );

    self.notificationsDropdown = self.instantiate("NotificationsDropdown",
      document.find("#notification_badge"),
      document.find("#notification_dropdown")
    );

    self.hoverCard = self.instantiate("HoverCard", document.find("#hovercard"));
    self.infiniteScroll = self.instantiate("InfiniteScroll");
    self.timeAgo = self.instantiate("TimeAgo", "abbr.timeago");
    self.directionDetector = self.instantiate("DirectionDetector");
    self.flashMessages = self.instantiate("FlashMessages");
  });
};