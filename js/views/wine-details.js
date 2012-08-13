define(
  ['jquery','lodash','backbone','utils/tpl'],
  function($, _, Backbone, tpl){

var WineView = Backbone.View.extend({
  tagName: "div",
 initialize:function(){
  this.template = _.template(tpl.get('wine-details'));
  
  this.model.bind( 'change', this.render, this);
 },
 render:function(){
  this.$el.html(this.template(this.model.toJSON()));
  return this.el;
 },
 events:{
  "change input": "change",
  'click .save':"savewine",
  'click .delete':"deletewine"
 },
 change: function(event) {
            var target = event.target;
            console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
            // You could change your model on the spot, like this:
            // var change = {};
            // change[target.name] = target.value;
            // this.model.set(change);
        },
 savewine:function(){
  this.model.set({
    name:$('#name').val(),
    grapes:$('#grapes').val(),
    country:$('#country').val(),
    region:$('#region').val(),
    year:$('#year').val(),
    description:$('#description').val()
  });
  if(this.model.isNew()){

    var self = this;
    app.wineList.create(this.model,{
      success:function(){
        app.navigate('wines/'+self.model.id,false);
      }
    });
  }else{
    console.log('aguardar');
    this.model.save();
  }
return false;
 },
 deletewine:function(){
   this.model.destroy({
    success:function(){
            alert('wine was deleted successfully');
            window.history.back();
    }
   });
   return false;
 }

});
return WineView;
});