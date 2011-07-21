/*   Copyright (c) 2010, Diaspora Inc.  This file is
*   licensed under the Affero General Public License version 3 or later.  See
*   the COPYRIGHT file.
*/
describe("Diaspora", function() {
  describe("widgets", function() {
    describe("notifications", function() {
      var changeNotificationCountSpy, notifications;

      beforeEach(function() {
        notifications = Diaspora.BaseWidget.instantiate("Notifications");
        
        changeNotificationCountSpy = spyOn(notifications, "changeNotificationCount").andCallThrough();
        $("#jasmine_content").html("<div id='notifications'></div>");
        notifications.publish("widget/ready");
        changeNotificationCountSpy.reset();
      });

      describe("decrementCount", function() {
        it("decrements Notifications.count", function() {
          var originalCount = notifications.count;
          notifications.decrementCount();
          expect(notifications.count).toBeLessThan(originalCount);
        });

        it("calls Notifications.changeNotificationCount", function() {
          notifications.decrementCount();
          expect(notifications.changeNotificationCount).toHaveBeenCalled();
        })
      });

      describe("incrementCount", function() {
        it("increments Notifications.count", function() {
          var originalCount = notifications.count;
          notifications.incrementCount();
          expect(notifications.count).toBeGreaterThan(originalCount);
        });

        it("calls Notifications.changeNotificationCount", function() {
          notifications.incrementCount();
          expect(notifications.changeNotificationCount).toHaveBeenCalled();
        });
      });

      describe("showNotification", function() {
        it("prepends a div to div#notifications", function() {
          expect($("#notifications div").length).toEqual(0);

          notifications.showNotification({
            html: '<div class="notification"></div>'
          });

          expect($("#notifications div").length).toEqual(1);
        });

        it("only increments the notification count if specified to do so", function() {
          var originalCount = notifications.count;

          notifications.showNotification({
            html: '<div class="notification"></div>',
            incrementCount: false
          });

          expect(notifications.count).toEqual(originalCount);

        });
      });
    });
  });
});
