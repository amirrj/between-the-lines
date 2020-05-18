import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../Redux/Actions/PostActions';

import './CreateArticleForm.css';

const CreateArticleForm = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
  const [topic, setTopic] = useState();
  const errors = useSelector((state) => state.error);
  const topics = useSelector((state) => state.topics.topics);

  const onSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      article,
      topic,
    };

    dispatch(createPost(postData, props.history));
  };

  return (
    <form onSubmit={onSubmit} className="createArticleForm">
      <div className="createArticleForm__inputGroup">
        <label className="createArticleForm__inputGroup-label" htmlFor="topic">
          What topic are you writting about?
        </label>
        {errors.topic && (
          <p className="createArticleForm__error">*{errors.topic}</p>
        )}
        <select
          name="topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
          className="createArticleForm__inputGroup-input"
          style={{ textTransform: 'capitalize' }}
        >
          <option value="">Please select a topic</option>
          {topics.map((topic) => {
            return (
              <option key={topic._id} value={topic.topic}>
                {topic.topic}
              </option>
            );
          })}
        </select>
      </div>

      <div className="createArticleForm__inputGroup">
        <label className="createArticleForm__inputGroup-label" htmlFor="title">
          Title
        </label>
        {errors.title && (
          <p className="createArticleForm__error">*{errors.title}</p>
        )}
        <input
          className="createArticleForm__inputGroup-input"
          type="text"
          name="title"
          style={{ textAlign: 'center' }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className="createArticleForm__inputGroup">
        <label
          className="createArticleForm__inputGroup-label"
          htmlFor="description"
        >
          Description
        </label>
        {errors.description && (
          <p className="createArticleForm__error">*{errors.description}</p>
        )}
        <textarea
          className="createArticleForm__inputGroup-input"
          type="text"
          name="description"
          style={{ height: '5rem' }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      <div className="createArticleForm__inputGroup">
        <label
          className="createArticleForm__inputGroup-label"
          htmlFor="article"
        >
          Article
        </label>
        {errors.article && (
          <p className="createArticleForm__error">*{errors.article}</p>
        )}
        <textarea
          className="createArticleForm__inputGroup-input"
          type="text"
          name="article"
          style={{ height: '20rem' }}
          value={article}
          onChange={(e) => {
            setArticle(e.target.value);
          }}
        />
      </div>

      <button className="createArticle__button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateArticleForm;
