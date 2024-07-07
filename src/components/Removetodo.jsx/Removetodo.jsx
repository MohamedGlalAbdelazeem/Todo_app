import { toast } from 'react-toastify';


function Removetodo({ id, onDelete }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`https://6689378d0ea28ca88b8753bb.mockapi.io/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDelete(id);
        toast("You deleted a todo ❌", { type: "success" });
      } else {
        toast("Failed to delete todo", { type: "error" });
      }
    } catch (error) {
      console.log(error);
      toast("An error occurred", { type: "error" });
    }
  };

  return (
    <i className="fa-solid fa-trash" onClick={handleDelete}></i>
  );
}

export default Removetodo;
