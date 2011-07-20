/*   Copyright (c) 2010, Diaspora Inc.  This file is
*   licensed under the Affero General Public License version 3 or later.  See
*   the COPYRIGHT file.
*/

(function() {
  var Diaspora = {
    Pages: {}
  };

  Diaspora.EventBroker = {
    extend: function(Klass) {
      var whatToExtend = (typeof Klass === "function") ? Klass.prototype : Klass;

      $.extend(whatToExtend, {
	      eventsContainer: $({}),
        publish: $.proxy(function(eventName, args) {
          var eventNames = eventName.split(" ");

          for(var eventName in eventNames) {
            this.eventsContainer.trigger(eventNames[eventName], args);
          }
        }, whatToExtend),
        subscribe: $.proxy(function(eventName, callback, context) {
          var eventNames = eventName.split(" ");

          for(var eventName in eventNames) {
            this.eventsContainer.bind(eventNames[eventName], $.proxy(callback, context));
          }
        }, whatToExtend)
      });

      return whatToExtend;
    }
  };

  Diaspora.Widgets = {
    collection: {},
    add: function(widgetName, Widget) {
      this[widgetName] = this.collection[widgetName] = Widget;
    }
  };

  Diaspora.BaseWidget = {
    instantiate: function(Widget, element) {
      console.log(Widget);
      $.extend(Diaspora.Widgets[Widget].prototype, Diaspora.EventBroker.extend(Diaspora.BaseWidget));
      var widget = new Diaspora.Widgets[Widget](),
        args = Array.prototype.slice.call(arguments, 1);

      widget.publish("widget/ready", args);

      return widget;
    },

    globalSubscribe: function(eventName, callback, context) {
      Diaspora.Page.subscribe(eventName, callback, context);
    },

    globalPublish: function(eventName, args) {
      Diaspora.Page.publish(eventName, args);
    }
  };

  Diaspora.initializePage = function() {
    $.extend(Diaspora.Pages[Diaspora.Page].prototype, Diaspora.EventBroker.extend(Diaspora.BaseWidget));

    Diaspora.Page = new Diaspora.Pages[Diaspora.Page]();
    Diaspora.Page.publish("page/ready", [$(document)])
  };

  window.Diaspora = Diaspora;
})();


$(function() {
  Diaspora.initializePage();
});