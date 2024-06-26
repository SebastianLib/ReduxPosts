import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch()
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [userId, setUserId] = useState()

    const users = useSelector(state => state.users)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const onSavePostClicked = () => {
    if(title && content){
        dispatch(
            postAdded(title,content, userId)
        )
        setTitle("")
        setContent("")
    }
    }

    const canSave = title && content && userId

    const usersOptions = users.map((user)=>(
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))

  return (
    <section>
      <h2>Add a new Post</h2>
      <form>
      <label htmlFor="postTitle">Post Title:</label>
      <input
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={onTitleChanged}
      />
      <label htmlFor="posAuthor">Author:</label>
      <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
        <option value=""></option>
        {usersOptions}
      </select>
      <label htmlFor="postContent">Content:</label>
      <textarea
        name="postContent"
        id="postContent"
        value={content}
        onChange={onContentChanged}
      ></textarea>
      <button disabled={!canSave} type="button" onClick={()=>onSavePostClicked()}>Save Post</button>
      </form>
    </section>
  );
};

export default AddPostForm;
