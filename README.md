# Generator
Add new project files using templates

# Usage

```
generator init
generator [task 1, task 2, ..., task n] <file name>
```
Template files perform a string replace on all instances of \__name\__ with \<file name>


# Example
### generator.json
A mapping of generation tasks to source and destination folders.
```
{
	tmp: {
		src: /home/templates/tmp.html,
		dest: /home/app/templates
	},
	view: {
		src: /home/templates/view.js,
		dest: /home/app/scripts/views
	}
	model: {
		src: /home/templates/model.js,
		dest: /home/app/scripts/models
	}

}
```

## cli

```
generator tmp view model Dropdown

Success /home/app/scripts/models/Dropdown.js
Success /home/app/scripts/views/Dropdown.js
Success /home/app/scripts/templates/Dropdown.html
```