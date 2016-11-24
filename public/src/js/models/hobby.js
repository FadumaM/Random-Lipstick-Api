angular
  .module('Hobbyist')
  .factory('Hobby', Hobby);

Hobby.$inject = ['$resource', 'API_URL'];
function Hobby($resource, API_URL){

  return $resource(
    API_URL+'/hobby/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}
