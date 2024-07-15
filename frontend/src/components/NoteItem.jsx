/* eslint-disable react/prop-types */
import { useContext } from "react";

import noteContext from "../Context/Notes/NoteContext";

function NoteItem(props) {
  const { deleteNote } = useContext(noteContext);

  // eslint-disable-next-line react/prop-types
  const { note, handleUpdate } = props;
  return (
    <>
      <div className='card max-h-30 w-96 m-6 bg-base-100 drop-shadow-lg  drop-shadow-primary-content border border-neutral-content '>
        <div className='card-body text-transform: capitalize '>
          <h2 className='card-title uppercase  '>{note.title}</h2>
          <hr />
          <p className='max-h-20 min-h-20 overflow-hidden opacity-70'>
            {note.description}
          </p>
          <p className='text-secondary opacity-100'>{note.tag}</p>

          <div className='card-actions justify-between'>
            <i
              className='fa-solid fa-pen'
              onClick={() => {
                handleUpdate(note);
              }}
            ></i>
            <i
              id='deleteButton'
              data-modal-target='deleteModal'
              data-modal-toggle='deleteModal'
              className='fa-solid fa-trash'
              onClick={(e) => {
                e.preventDefault();
                deleteNote(note._id);
                console.log("delete clicked");
                // deleteNote(note._id);
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
