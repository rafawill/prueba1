define(
  ['jquery','lodash','backbone','utils/tpl'],
  function($, _, Backbone, tpl){

var WineListView = Backbone.View.extend({
 
    tagName: 'ul',
 
    initialize: function() {
        this.collection.bind( 'reset', this.render, this);        
        this.collection.bind( 'add', this.appendNewWine, this);
        
    },
 
    render: function() {
      console.log(this.collection)
        _.each(this.collection.models, function( wine ) {
            console.log(wine);
            this.appendNewWine( wine );

        }, this);
        console.log(this.el);
        return this.el;
    },
 
    appendNewWine: function( wine ) {

      
        this.$el.append(new WineListItemView({model:wine}).render());
    }
 
});

var WineListItemView = Backbone.View.extend({
tagName:'li',
initialize:function(){
  _.bindAll(this, 'render');
  this.template=_.template(tpl.get('wine-list-item'));
  this.model.bind('change',this.render, this);
  this.model.bind('close',this.close(), this);

 //console.log('list wine'+ this.collection);

},
render:function(){
  this.$el.html(this.template(this.model.toJSON()));
  
  return this.el;
}

});

return WineListView;
});