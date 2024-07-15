import { useContext, useState } from "react";
import noteContext from "../Context/Notes/NoteContext";
import { toast } from "react-toastify";

function AddNote() {
  const { addNote } = useContext(noteContext);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [tag, setTag] = useState(null);

  const handleAddNoteClick = (e) => {
    e.preventDefault();
    if (title.length > 3 && description.length > 3 && tag.length > 3) {
      addNote(title, description, tag);

      setTitle("");
      setTag("");
      setDescription("");
    } else {
      toast.error("Enter Valid Data!");
    }
  };
  return (
    <form className=" w-full h-full">
      <div className="flex flex-col w-full h-full justify-center align-middle">
        <div className="flex col-md-6 w-full justify-center">
          <label className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="Title Here"
              className="input input-bordered w-full max-w-xs rounded"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="flex col-md-6 w-full justify-center my-4">
          <label className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="Tag Here"
              className="input input-bordered w-full max-w-xs rounded"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="flex col-md-6 w-full justify-center">
          <label className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="Description Here"
              className="input input-bordered w-full max-w-xs rounded"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="flex col-md-6 mt-16 w-full justify-center">
          <button
            className="btn btn-active btn-primary w-full max-w-xs"
            onClick={handleAddNoteClick}
          >
            Add Note
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddNote;
