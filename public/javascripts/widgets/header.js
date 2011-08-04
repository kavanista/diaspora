(function() {
  var Header = function() {
    var self = this;
    
    this.subscribe("widget/ready", function(evt, header) {
      self.notifications = self.instantiate("Notifications",
        header.find("#notifications"),
        header.find("#notification_badge .badge_count")
      );
  
      self.notificationsDropdown = self.instantiate("NotificationsDropdown",
        header.find("#notification_badge"),
        header.find("#notification_dropdown")
      );
          
      self.userDropdown = self.instantiate("UserDropdown", header.find("#user_menu"));
    });
  };

  Diaspora.Widgets.add("Header", Header);
})();