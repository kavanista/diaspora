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
        publish: function(eventName, args) {
          var eventNames = eventName.split(" ");

          for(var eventName in eventNames) {
            this.eventsContainer.trigger(eventNames[eventName], args);
          }
        },
        subscribe: function(eventName, callback, context) {
          var eventNames = eventName.split(" ");

          for(var eventName in eventNames) {
            this.eventsContainer.bind(eventNames[eventName], $.proxy(callback, context));
          }
        }
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
      $.extend(Diaspora.Widgets[Widget].prototype, Diaspora.EventBroker.extend(Diaspora.BaseWidget));
      var widget = new Diaspora.Widgets[Widget](),
        args = Array.prototype.slice.call(arguments, 1);

      widget.publish("widget/ready", args);

      return widget;
    },

    globalSubscribe: function(eventName, callback, context) {
      if(typeof callback === "undefined") { throw new Error("Callback must be defined for event: " + eventName); }
      Diaspora.page.subscribe(eventName, callback, context);
    },  

    globalPublish: function(eventName, args) {
      Diaspora.page.publish(eventName, args);
    }
  };

  window.Diaspora = Diaspora;
})();


$(function() {
  $.extend(Diaspora.Pages[Diaspora.Page].prototype, Diaspora.EventBroker.extend(Diaspora.BaseWidget));

  Diaspora.page = new Diaspora.Pages[Diaspora.Page]();
  Diaspora.page.publish("page/ready", [$(document)])
});