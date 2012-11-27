$.fn.serializeObject = function() {

              var form_values = $(this).serializeArray(),
                  form_length = form_values.length,
                  form_final = {};

              //fill object with results
              $.each(form_values, function(){

                // Empty assign Null
                if( this.value == '') {

                   form_final[this.name] = null;

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
                
                }

              });
              
              //Output Object
              return form_final;

          }