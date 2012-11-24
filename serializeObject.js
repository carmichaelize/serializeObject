$.fn.serializeObject = function(options) {

              //config
              var defaults = {
                localStorage:false
              }

              var options = $.extend({}, defaults, options);

              //Cache This
              var the_form = $(this);

              //Get Form Name
              if(options.localStorage){
                    
                    if(the_form.attr('id')){
                       var form_name = $(this).attr('id');
                     } else if (the_form.attr('class')) {
                       var form_name = $(this).attr('class');
                     }
              }
              
              //Get Form Values as Array
              var form_values = $(this).serializeArray();

              //Get Length of Array
              var form_length = form_values.length;

              //Create Starting Objects
              var form_final = new Object;

              //fill object with results
                $.each(form_values, function(){

                  // Empty assign Null
                  if( this.value == '') {

                     form_final[this.name] = null;
                   
                     if(options.localStorage){
                       localStorage[form_name+'_'+this.name] = '';
                     }

                    // Store multiple checkboxes as Array
                  } else if(form_final.hasOwnProperty(this.name)) {

                     
                     if(typeof form_final[this.name] != 'object' ){
                     
                         firstItem = form_final[this.name];

                         form_final[this.name] = new Object();

                         form_final[this.name][firstItem] = true;

                     }
 
                     form_final[this.name][this.value] = true;

                  } else {
           
                    form_final[this.name] = this.value;
                     
                     if(options.localStorage){
                        localStorage[form_name+'_'+this.name] = this.value;
                     }
                  
                  }

                });
                
                //Output Object
                return form_final;

          }