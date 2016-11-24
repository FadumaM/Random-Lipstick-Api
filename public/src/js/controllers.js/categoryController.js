angular
    .module('Hobbyist')
    .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['Hobby', 'Category'];



    function CategoryController(Hobby, Category) {
      // //Binding this to self
      self                              = this;

      // //Narrow down Category

      self.firstFiveCategories          = [];
      self.secondFiveCategories         = [];
      self.saveFirstCategory            = saveFirstCategory;
      self.saveSecondCategory           = saveSecondCategory;
      self.saveFinalChosenCategory      = saveFinalChosenCategory;
      self.firstCategory                = null;
      self.secondCategory               = null;
      self.savedCategories              = [];
      self.chosenCategory               = null;

      Category.query(function(response) {
        var categories = response.map(function(category) {
          var text = category.text;
          category.text = text[Math.floor(Math.random() * text.length)];
          return category;
        });
        self.firstFiveCategories= categories;
        self.secondFiveCategories = self.firstFiveCategories.splice(0,5);
      });

      function saveFirstCategory(category) {
          self.firstCategory = category;
          self.savedCategories.push(self.firstCategory);
      }
      function saveSecondCategory(category) {
          self.secondCategory = category;
          self.savedCategories.push(self.secondCategory);
      }

      function saveFinalChosenCategory(category) {
        self.chosenCategory = category;

      }
    }
