angular
  .module('Hobbyist')
  .factory('User', User);

User.$inject = ['$resource', 'API_URL'];
function User($resource, API_URL){

  return $resource(
    API_URL+'/users/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'register': {
                    url: API_URL +'/register',
                    method: "POST"
                  },
      'login':      {
                    url: API_URL + '/login',
                    method: "POST"
                  },
      'saveHobby':{
                    url: API_URL + '/users/hobby/save',
                    method : 'POST'
                  }
    }
  );
}
