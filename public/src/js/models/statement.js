angular
  .module('Hobbyist')
  .factory('Statement', Statement);

Statement.$inject = ['$resource', 'API_URL'];
function Statement($resource, API_URL){

  return $resource(
    API_URL+'/statement/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}
