angular
    .module('Hobbyist')
    .controller('HobbyController', HobbyController);

    HobbyController.$inject = ['Hobby', 'Statement', 'Category','$stateParams'];



    function HobbyController(Hobby, Statement, Category, $stateParams) {
      // Binding this
      self      = this;
      self.firstTwoHobbies       =  [];
      self.secondTwoHobbies      =  [];
      self.savedHobbies           =  [];
      self.saveFirstHobby         = saveFirstHobby;
      self.saveSecondHobby        = saveSecondHobby;
      self.saveFinalHobby         = saveFinalHobby ;
      self.firstHobby             = null;
      self.secondHobby            = null;
      self.chosenHobby            = null;


      Hobby.query(function(response) {
        var hobbies = response.filter(function(hobby) {
          return hobby.category === $stateParams.id;
        });
        var hobbyTexts = hobbies.map(function(hobby) {
          var text = hobby.text;
          hobby.text = text[Math.floor(Math.random() * text.length)];
          return hobby;
        });
        self.firstTwoHobbies = hobbyTexts;
        self.secondTwoHobbies = self.firstTwoHobbies.splice(0,2);
      });

      function saveFirstHobby(hobby) {
        self.firstHobby = hobby;
        self.savedHobbies.push(self.firstHobby);
      }
      function saveSecondHobby(hobby) {
        self.secondHobby = hobby;
        self.savedHobbies.push(self.secondHobby);
      }

      function saveFinalHobby(hobby) {
        self.chosenHobby = hobby;
      }
    }
