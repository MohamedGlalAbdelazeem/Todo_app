import React from 'react';

function Completedtodos({ id, completed, onComplete }) {
  const handleComplete = () => {
    fetch(`https://6689378d0ea28ca88b8753bb.mockapi.io/tasks/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Failed to mark task as completed');
      })
      .then(task => {
        onComplete(id, !completed);
      })
      .catch(error => {
        console.error('Error marking task as completed:', error);
      });
  };

  return (
    <>
      <i
        className={`fa-solid fa-circle-check ${completed ? 'completed' : ''}`}
        onClick={handleComplete}
      ></i>
    </>
  );
}

export default Completedtodos;
