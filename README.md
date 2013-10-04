##serializeObject()

This handy jQuery extension provides support for client side validation/result gathering.
serializeObject() returns an JavaScript object comprising of key/value pairs from submitted form.
This allows you to access the form data from a single source point without having to gather each input value individually.
Providing the form input has a name attribute, all inputs will be atomatically added to the returned object.

This can be helpful as a further help to client side validation or for a more intergral part of a JavScript based web or mobile app.

###Usage

	<script>
	    $('#form').on('submit', function(){
	        var formData = $('form').serializeObject();
	    }); 
	</script>

###Supported (and Tested) Form Elements

As most HTML5 form inputs natively behave like "text" elements, these naturally are supported.
Also supported are more specific inputs such as radio, checkbox, multiselect which behave differently when serialized (see examples below).

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

###Examples

Basic form validation.

	<form id="form">
		<input type="text" name="name" value="Joe Bloggs" />
		<input type="text" name="email" value="test@test.com" />
		<textarea nmae="message">Hi There!</textarea>
		<button>Submit</button>
	</form>

	<script>

	    $('#form').on('submit', function(){
			
			//Gather form data
	        var data = $(this).serializeObject();

	        //Return value(s)
	        //data.name = "Joe Bloggs"
	        //data.email = "test@test.com"
	        //data.message = "Hi There!"
			
			//Test required fields are not empty.
			if(!formData.name || !formData.email || !formData.message){
				alert('Please Ensure All Fields Are Filled Out!');
				return false;
			}
		
			//Test a valid email address has been submitted
			if(formData.email){
				alert('Please Provide A Valid Email Address!');
				return false;
			}

			return true;

	    }); 
	</script>


####Multiselect and Checkboxes Inputs

Inputs that can handle more than one value, will store the values as an object for that key. If only one choice is selected, the value will be stored as a string.

	<form id="form">
		<label for="">Select Post Types To Include</label>
		<select name="post_type" multiple>
			<option value="posts" selected>Posts</option>
			<option value="pages">Pages</option>
			<option value="products" selected>Products</option>
		</select>
		<button>Submit</button>
	</form>

	<script>

	    $('#form').on('submit', function(){

	       	//Gather form data
	        var data = $(this).serializeObject();

	        //Return value(s)
	        //data.post_type = {post : true, products : true}

	        if( data.post_type.posts || data.post_type.pages || data.post_type.products ){
				alert('Save Options Updated!');
	        }

	    });
	</script>


####Input Arrays
To create an input array, append '[]' to the end of name attribute. This will return an array of values for that key.

	<form id="form">
		<input type="text" name="email[]" value="test@test.com" />
		<input type="text" name="email[]" value="test@test.co.uk" />
		<button>Submit</button>
	</form>

	<script>

	    $('#form').on('submit', function(){

	        var formData = $(this).serializeObject();
			
			//Return Value(s)
	        //formData.email = ["test@test.com", "test@test.co.uk"]

			for(i=0;i<formData.email.length;i++){
				if(formData.email[i]){
					alert('Please Provide A Valid Email Address!');
					return false;
				}
			}

			return true;

	    }); 
	</script>

###Notes/Issues

- The 'name' attribute is the only requirement for a key/value pair to be set on the object.
- 'checkbox' and 'multiselect' elements will set the value as an object if more than one selection is made.
- I have tried to incorporate as many common form techniques I can think of, if you think I have missed any


