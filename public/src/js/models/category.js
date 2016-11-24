angular
  .module('Hobbyist')
  .factory('Category', Category);

Category.$inject = ['$resource', 'API_URL'];
function Category($resource, API_URL){

  return $resource(
    API_URL+'/category/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}
