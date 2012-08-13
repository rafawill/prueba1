define(
['jquery', 'lodash', 'backbone', 'model/wine-model'],

function($, _, Backbone, Wine) {

  var WineCollection = Backbone.Collection.extend({
    model: Wine,
    url: "wines/index.php/"
  });

  return WineCollection;
});