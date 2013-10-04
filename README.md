##serializeObject()

This handy jQuery extension provides support for client side form data gathering. serializeObject() returns a JavaScript object comprising of key/value pairs from submitted form. This allows you to access the form data from a single source point without having to gather each value individually. Providing the input field has a name attribute set, all inputs will be automatically added to the returned object.

This can be helpful tool for validation and/or working with other event based functionality in JavaScript. As always with client side validation, this does not replace the need for validation on the server side.

###Installation

jQuery 1.3+ is the minimum requirement. Load the serializeObject() plugin script after the main jQuery library.
	
	<script src="/js/jquery-1.9.1.min.js"></script>
	<script src="/js/serializeObject.js"></script>

###Usage

	var formData = $('form').serializeObject();

###Supported (and Tested) Form Elements

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

As most HTML5 form inputs natively behave as "text" elements, these naturally are supported. Also supported are the more specific inputs such as radios, checkboxes, multiselects which behave differently when serialized (see examples below).

###Examples

####Text Inputs

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


####Multiselect and Checkbox Inputs

Inputs that can handle more than one value, will store the values as an object. If only one choice is made, the value will be stored as a string.

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
				return true;
	        }

	        return false;

	    });
	</script>


####Array Inputs (Linear & Associative)

To create an array input, append '[]' to the end of the inputs name attribute. This will return an array of values. To create an associative array add a property name into the square brackets('[property_name]') and an object of key/values will be returned instead.

	<form id="form">
		<label>Name</label>
		<input type="text" placeholder="First Name" name="name[first_name]" value="Joe" />
		<input type="text" placeholder="Last Name" name="name[last_name]" value="Bloggs" />
		<br />
		<label>Phone Number(s)</label>
		<input type="text" placeholder="Work Email" name="email[]" value="test@test.com" />
		<input type="text" placeholder="Home Email" name="email[]" value="test@test.co.uk" />
		<button>Submit</button>
	</form>

	<script>
	    $('#form').on('submit', function(){

	        var formData = $(this).serializeObject();
			
			//Return Value(s)
			//data.name = {first_name : "Joe", last_name : "Bloggs"}
	        //data.email = ["test@test.com", "test@test.co.uk"]

	        if(data.name.first_name && data.name.last_name){
	        	name = data.name.first_name+" "+data.name.last_name+", ";
	        }

			for(i=0;i<formData.email.length;i++){
				if(formData.email[i]){
					alert(name+'Please Provide A Valid Email Address!');
					return false;
				}
			}

			return true;

	    }); 
	</script>

###Notes/Issues

- The 'name' attribute is the only requirement for a key/value pair to be set on the object. If this is omitted from the input, the property will not be set in the returned object.
- I have tried to incorporate as many common form inputs and techniques I can think of, if you think I have missed any let me know.