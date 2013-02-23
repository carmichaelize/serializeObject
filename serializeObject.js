/* 
* Project: SerializeObject()
* URL: https://github.com/scottyc1000/serializeObject
* Author: Scott Carmichael
* Version: 1.2
* Requires: jQuery 1.3+
*
* Copyright (c) 2013 Scott Carmichael
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* Copyright notice and license must remain intact for legal use
*/

;(function($, window, document){

$.fn.serializeObject = function() {
              
              var form_values = $(this).serializeArray(),
                  form_final = {};
              
              //fill object with results
              $.each(form_values, function(){

                // Empty assign Null
                if(this.value == '') {

                  form_final[this.name] = null;

                // Store Array Input Array
                } else if(this.name.indexOf('[]') > 0){
                  
                  //Remove [] from input name
                  this.name = this.name.split("[]")[0];
                  
                  if(form_final.hasOwnProperty(this.name)){
                    form_final[this.name].push(this.value);
                  } else {
                    form_final[this.name] = [this.value]
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
                
                }

              });
              
              //Output Object
              return form_final;

          }

}(jQuery, window, document));