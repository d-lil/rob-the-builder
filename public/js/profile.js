//handle form submission for creating new project
const newFormHandler = async (event) => {
  event.preventDefault();

 //gets project type and location from form 
  const project_type = document.querySelector('#type').value;
  const location = document.querySelector('#location').value.trim();
  if (project_type && location) {
    const response = await fetch('/api/project', {
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
//handles the click event on the delete project button
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/project/${id}`, {
      method: 'DELETE',
    });
//redirect to profile 
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('submit', delButtonHandler);

