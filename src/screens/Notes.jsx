import { useEffect, useState } from "react";
import NotesModal from "../components/NotesModal";
import plusIcon from "../assets/images/plusIcon.webp";
import deleteIcon from "../assets/images/deleteIcon.webp";
import sun from "../assets/images/sun.webp";
import moon from "../assets/images/moon.webp";
import edit from "../assets/images/editIcon.webp";
import style from "./less/notes.module.less";
import BgImg from "../components/BackgroundImage";

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [noteList, setNoteList] = useState([]);
  const [note, setNote] = useState({ id: 0, data: "", imgList: [] });
  const [type, setType] = useState("add");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNoteList(storedNotes);
    }
  }, []);

  const handleAdd = (note) => {
    setOpen(false);
    let updatedNotes;
    const id = noteList.length === 0 ? 1 : noteList[noteList.length - 1].id + 1;
    updatedNotes = [...noteList, { ...note, id }];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNoteList(updatedNotes);
  };

  const handleEdit = (note) => {
    setOpen(false);
    const updatedNotes = noteList.map((ele) => {
      if (ele.id === note.id) {
        return note;
      }
      return ele;
    });
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNoteList(updatedNotes);
  };

  const handleDelete = (id) => {
    const updatedNotes = noteList.filter((ele) => ele.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNoteList(updatedNotes);
  };

  const renderContent = (obj) => {
    return (
      <div
        className={style.content}
        onClick={() => {
          setType("show");
          setOpen(true);
          setNote(obj);
        }}
      >
        {obj?.data?.startsWith("http") || obj?.data?.trim().endsWith(".com") ? (
          <a href={obj.data} target="_blank">
            {obj?.data}
          </a>
        ) : (
          <p>{obj?.data}</p>
        )}
        <div className={style.imgContainer}>
          {obj?.imgList?.length > 0 &&
            obj.imgList.map((ele, idx) => <img src={ele} key={`img${idx}`} />)}
        </div>
      </div>
    );
  };

  return (
    <>
        <div className={style.font}>
          <BgImg theme={theme} />
        </div>
      <div
        className={style.container}
      >
        <img
          src={plusIcon}
          onClick={() => {
            setOpen(true);
            setType("add");
            setNote({ id: 0, data: "", imgList: [] });
          }}
          className={style.plusIcon}
        />
        <div>
          <img
            src={theme==='light' ? moon : sun}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={style.themeChanger}
          />
        </div>
        <div className={style.noteListContainer}>
          {noteList.map((obj, index) => (
            <div key={index} className={style.note}>
              {renderContent(obj, index)}
              <div className={style.actionContainer}>
                <img
                  className={style.editIcon}
                  src={edit}
                  alt="editIcon"
                  onClick={() => {
                    setOpen(true);
                    setNote(obj);
                    setType("edit");
                  }}
                />
                <img
                  className={style.deleteIcon}
                  src={deleteIcon}
                  alt="delIcon"
                  onClick={() => handleDelete(obj.id)}
                />
              </div>
            </div>
          ))}
        </div>
        {open && (
          <div className={style.modalContainer}>
            <NotesModal
              setOpen={setOpen}
              handleAdd={handleAdd}
              note={note}
              type={type}
              handleEdit={handleEdit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
