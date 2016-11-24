angular
    .module('Hobbyist')
    .controller('ShowHobbyController', ShowHobbyController);

    ShowHobbyController.$inject = ['User', 'Hobby', '$stateParams', 'CurrentUser'];
    function ShowHobbyController(User, Hobby, $stateParams, CurrentUser) {
      self = this;
      self.currentUser = CurrentUser.getUser();
      Hobby.get({ id: $stateParams.id}, function(hobby) {
        self.hobby = hobby;
      });
      self.text = "hit";
      self.saveHobby = function() {
        User.saveHobby({ user: self.currentUser, hobby: self.hobby},
          function(response) {
          });
        };
    }
