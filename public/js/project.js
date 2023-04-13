
//handles the deletion of a project 
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/project/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/project');
      } else {
        alert('Could not delete project');
      }
    }
  };
//handles the submission of the new project form
const newFormHandler = async (event) => {
    event.preventDefault();
  //get values from the form
    const project_type = document.querySelector('#project_type').value.trim();
    const location = document.querySelector('#location').value.trim();
    const cost = document.querySelector('#cost').value;
    const date_created = document.querySelector('#date_created').value;
    const user_id = document.querySelector('#user_id').value.trim();

//all required fields are filled out then send a POST request to create a new project
    if (project_type && location && date_created && user_id) {
      const response = await fetch(`/api/project`, {
        method: 'POST',
        body: JSON.stringify({ project_type, location, cost, date_created, user_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/project');
      } else {
        alert('Failed to create project');
      }
    }
  };


//event listener/query selector for submit button
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
//event listener/query selector for delete button
document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
