const cancelButtons = document.querySelectorAll('.btn-danger');

cancelButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    const projectId = event.target.getAttribute('data-id');

    try {
        const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  });
});