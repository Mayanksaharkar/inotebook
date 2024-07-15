import { useContext, useEffect, useState } from "react";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import noteContext from "../Context/Notes/NoteContext";
function NoteBoard() {
  const { notes, fetchAllNotes, updateNote } = useContext(noteContext);
  const [title, setTitle] = useState();
  const [id, setId] = useState();
  const [tag, setTag] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const handleUpdate = (currentNote) => {
    setTitle(currentNote.title);
    setTag(currentNote.tag);
    setDescription(currentNote.description);
    setId(currentNote._id);
    document.getElementById("my_modal_5").showModal();
  };
  const handleUpdateNoteClick = (e) => {
    e.preventDefault();
    updateNote(id, title, description, tag);
    document.getElementById("closeBtn").click();
  };

  return (
    <>
      <button
        className='btn'
        onClick={() => document.getElementById("my_modal_5").showModal()}
        style={{ display: "none" }}
      ></button>
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <form className=' w-full h-full mt-4'>
            <div className='flex flex-col w-full h-full justify-center align-middle'>
              <div className='flex col-md-6 w-full justify-center'>
                <label className='form-control w-full max-w-xs'>
                  Title:
                  <input
                    type='text'
                    placeholder='Title Here'
                    className='input input-bordered w-full max-w-xs rounded'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className='flex col-md-6 w-full justify-center my-4'>
                <label className='form-control w-full max-w-xs' htmlFor='tag'>
                  Tag:
                  <input
                    type='text'
                    name='tag'
                    placeholder='Tag Here'
                    className='input input-bordered w-full max-w-xs rounded'
                    value={tag}
                    onChange={(e) => {
                      setTag(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className='flex col-md-6 w-full justify-center'>
                <label className='form-control w-full max-w-xs'>
                  Description:
                  <input
                    type='text'
                    placeholder='Description Here'
                    className='input input-bordered w-full max-w-xs rounded'
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className='flex col-md-6 mt-11 w-full justify-center '>
                <button
                  className='btn btn-active btn-primary w-full max-w-xs '
                  onClick={handleUpdateNoteClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </form>

          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn' id='closeBtn'>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className='flex h-full w-full'>
        <div className='flex-1  w-6/12'>
          <AddNote />
        </div>
        <div className=' w-6/12 max-h-screen h-screen bg-base-300  flex flex-col'>
          <span className='text-6xl w-100 text-center m-4 font-semibold font-sans text-primary'>
            Your Notes
          </span>
          <div className=' grid grid-cols-2 gap-4 overflow-auto'>
            {notes.map((note) => {
              return (
                <NoteItem
                  key={note._id}
                  note={note}
                  handleUpdate={handleUpdate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteBoard;
