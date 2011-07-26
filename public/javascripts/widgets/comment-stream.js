(function() {
  var CommentStream = function() {
    var self = this;

    this.subscribe("widget/ready", function(evt, commentStream) {
      $.extend(self, {
        commentStream: commentStream,
        commentToggler: self.instantiate("CommentToggler", commentStream),
        comments: []
      });

      self.instantiateCommentWidgets();

      self.globalSubscribe("commentStream/" + self.commentStream.attr("id") + "/loaded", self.instantiateCommentWidgets);
    });

    this.instantiateCommentWidgets = function() {
      self.comments = [];

      $.each(self.commentStream.find("li.comment"), function(index, element) {
        self.comments.push(self.instantiate("Comment", $(element)));
      });
    };
  };

  Diaspora.Widgets.add("CommentStream", CommentStream);
})();