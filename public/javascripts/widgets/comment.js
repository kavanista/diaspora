(function() {
  var Comment = function() {
    var self = this;

    this.subscribe("widget/ready", function(evt, comment) {
      $.extend(self, {
        timeAgo: self.instantiate("TimeAgo", comment.find("abbr.timeago"))
      });
    });
  };

  Diaspora.Widgets.Comment = Comment;
})();