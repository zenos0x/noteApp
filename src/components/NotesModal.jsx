import { useRef, useState } from "react";
import uploadImg from "../assets/images/uploadIcon.webp";
import deleteIcon from "../assets/images/deleteIcon.webp";
import closeIcon from "../assets/images/closeIcon.webp";
import style from "./less/noteModal.module.less";

const NotesModal = (props) => {
  const { setOpen, handleAdd, note, type, handleEdit } = props;
  const [noteContent, setNoteContent] = useState(note);
  const inputRef = useRef();

  const handleonChange = (e) => {
    console.log(e.target.value);
    setNoteContent((prev) => ({ ...prev, data: e.target.value }));
  };
  const handleUpload = () => {
    inputRef.current && inputRef.current.click();
  };
  const handleUploadedImg = () => {
    const files = inputRef.current.files;
    const urls = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        urls.push(reader.result);
        if (urls.length === files.length) {
          console.log(urls);
          setNoteContent((prev) => ({ ...prev, imgList: urls }));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleDelete = (idx) => {
    const arr = noteContent.imgList.filter((ele, i) => i !== idx);
    setNoteContent((prev) => ({ ...prev, imgList: arr }));
  };
  console.log(type);
  return (
    <div className={style.modalWrapper}>
      {type === "show" ? (
        <>
          <div className={style.showmodalContainer}>
            <div className={style.closeIconWrapper}>
              <img
                src={closeIcon}
                className={style.closeIcon}
                onClick={() => {
                  setOpen(false);
                  setNoteContent({ id: 0, data: "", imgList: [] });
                }}
              />
            </div>
            <div className={style.contentWrapper}>
              {noteContent?.data?.startsWith("http") ||
              noteContent?.data?.trim().endsWith(".com") ? (
                <a href={noteContent.data} target="_blank">
                  {noteContent?.data}
                </a>
              ) : (
                <p>{noteContent?.data}</p>
              )}
              {noteContent?.imgList?.length > 0 &&
                noteContent.imgList.map((ele, idx) => (
                  <img src={ele} key={`img${idx}`} />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className={style.addorEditContainer}>
          <h1>{type === "add" ? "Add your notes" : "Edit your content"}</h1>
          <textarea value={noteContent.data} onChange={handleonChange} />
          <div className={style.actionContainer}>
            <img
              src={uploadImg}
              onClick={handleUpload}
              className={style.uploadIcon}
            />
            <button
              className={style.cancelBtn}
              onClick={() => {
                setOpen(false);
                setNoteContent({ id: 0, data: "", imgList: [] });
              }}
            >
              cancel
            </button>
            <button
              className={style.confirmBtn}
              disabled={
                noteContent.data.length === 0 &&
                noteContent.imgList.length === 0
              }
              onClick={() => {
                type === "add"
                  ? handleAdd(noteContent)
                  : handleEdit(noteContent);
                setNoteContent({ id: 0, data: "", imgList: [] });
              }}
            >
              {type === "add" ? "Add" : "Update"}
            </button>
          </div>
          {noteContent?.imgList?.length > 0 && (
            <div className={style.uploadedImgContainer}>
              {noteContent.imgList.map((ele, idx) => (
                <>
                  <div
                    key={`uploadedImg_${idx}`}
                    className={style.imageWrapper}
                  >
                    <img
                      src={ele}
                      width={"50px"}
                      className={style.uploadedImg}
                    />
                    <img
                      className={style.deleteIcon}
                      src={deleteIcon}
                      onClick={() => handleDelete(idx)}
                      width={"50px"}
                    />
                  </div>
                </>
              ))}
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUploadedImg}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default NotesModal;
