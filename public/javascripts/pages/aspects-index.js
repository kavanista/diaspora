Diaspora.Pages.AspectsIndex = function() {
  var self = this;

  this.subscribe("page/ready", function(evt, document) {
    self.stream = self.instantiate("Stream", document.find("#main_stream"));

    self.notifications = self.instantiate("Notifications",
      document.find("#notifications"),
      document.find("#notification_badge .badge_count")
    );

    self.notificationBadge = self.instantiate("NotificationsDropdown",
      document.find("#notification_badge"),
      document.find("#notification_dropdown")
    );

    self.infiniteScroll = self.instantiate("InfiniteScroll");
  });
};