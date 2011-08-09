(function() {
  var Search = function() {
    var self = this;

    this.subscribe("widget/ready", function(evt, searchForm) {
      $.extend(self, {
        searchForm: searchForm,
        searchInput: searchForm.find("input#q"),
        options: {
          cacheLength : 15,
          delay : 100,
          extraParams : {limit : 4},
          formatItem : self.formatItem,
          formatResult : self.formatResult,
          max : 5,
          minChars : 2,
          onSelect: self.selectItemCallback,
          parse : self.parse,
          scroll : false
        }
      });

      self.searchInput.autocomplete("/people.json", self.options);
    });

    this.formatItem = function(row) {
      if (typeof row.search !== "undefined") {
        return Diaspora.I18n.t("search_for", row);
      } else {
        return $("<img/>", {
          'class': "avatar",
          src: row.avatar
        }).html() + row.name;
      }
    };

    this.formatResult = function(row) {
      return row.name;
    };

    this.parse = function(data) {
      var results = [];
      $.each(data, function(index, person) {
        results.push({
          data: person,
          value: person.name
        });
      });

      results.push({
        data: {
          name: self.searchInput.val(),
          url: "/people?q=" + self.searchInput.val(),
          search: true
        },
        value: self.searchInput.val()
      });

      return results;
    };

    this.selectItemCallback = function(evt, data, formatted) {
      if (typeof data.id !== "undefined") {
        self.searchInput.val(formatted);
        window.location = data['url'];
      } else {
        window.location = "/people?q=" + self.searchInput.val();
      }
    };
  };

  Diaspora.Widgets.Search = Search;
})();