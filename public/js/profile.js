const newFormHandler = async (event) => {
    event.preventDefault();
  
    const project_type = document.querySelector('#type').value; // we can add a trim on this, but if we make it a checkbox or dropdown input then we don't need it
    const location = document.querySelector('#location').value.trim();
  // do we add the cost into the form?
    if (project_type && location ) {
      const response = await fetch(`/api/project`, {
        method: 'POST',
        body: JSON.stringify({ project_type, location }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/project/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  // may need to change these query selectors depending on Scott's hbrs
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!