/*   Copyright (c) 2010, Diaspora Inc.  This file is
 *   licensed under the Affero General Public License version 3 or later.  See
 *   the COPYRIGHT file.
 */
(function() {
  var TimeAgo = function() {
    var self = this;
    this.selector = "abbr.timeago";

    this.subscribe("widget/ready", function(evt, element) {
      self.element = element;
      self.updateTimeAgo();

      if(Diaspora.I18n.language !== "en") {
				$.each($.timeago.settings.strings, function(index) {
	  			$.timeago.settings.strings[index] = Diaspora.I18n.t("timeago." + index);
				});
      }
    });

    self.globalSubscribe("stream/scrolled stream/reloaded", this.updateTimeAgo, this);

    this.updateTimeAgo = function(selector) {
      $((selector) ? selector : self.element).timeago();
    };
  };

  Diaspora.Widgets.add("TimeAgo", TimeAgo);
})();
