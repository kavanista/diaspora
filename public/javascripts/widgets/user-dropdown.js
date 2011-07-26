(function() {
  var UserDropdown = function() {
    var self = this;

    this.subscribe("widget/ready", function(evt, userDropdown) {
      $.extend(self, {
        userDropdown: userDropdown
      });

      userDropdown.click(self.toggleDropdown);
      $(document.body).click(self.hideDropdown);
    });

    this.toggleDropdown = function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      self.userDropdown.toggleClass("active");
    };

    this.hideDropdown = function(evt) {
      if(self.userDropdown.hasClass("active") && !$(this).parents("#user_menu").length) {
        self.userDropdown.removeClass("active");
      }
    };
  };

  Diaspora.Widgets.add("UserDropdown", UserDropdown);
})();