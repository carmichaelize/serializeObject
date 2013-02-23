##serializeObject()

This is a handy extension to jQuery for client side validation/result gathering. serializeObject() returns an object comprising of key/value pairs relating to a submitted form.

###Usage

    <script>
        $('#form').on('submit', function(){
            var formData = $(this).serializeObject();
        }); 
    </script>

###Supported (tested) Form Elements
- text
- radio
- checkbox
- select
- multiselect
- datalist
- number(spinner)
- range(slider)
- date
- time

###Notes/Issues
- The 'name' attribute is the only requirement for a key/value pair to be set on the object.
- 'checkbox' and 'multiselect' elements will set the value as an object if more than one selection is made.
- Append '[]' to the end of input names to create an array.
