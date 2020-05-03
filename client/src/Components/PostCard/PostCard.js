import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './PostCard.css';

const PostCard = (props) => {
  const posts = useSelector((state) => state.posts.posts);

  const postCard = posts.map((post) => {
    return (
      <React.Fragment key={post._id}>
        <Link to={`/post/${post._id}`} className="postCard">
          <img
            className="postCard__image"
            src={post.image}
            alt={`between the lines - ${post.topic} `}
          />
          <div className="postCard__content">
            <h4 className="postCard__title">{post.title}</h4>
            <p className="postCard__desc">{post.description}</p>
            <p className="postCard__topic">Topic: {post.topics}</p>
            <p className="postCard__author">
              Written By {post.author.firstName} {post.author.lastName}
            </p>
          </div>
        </Link>
        {props.edit ? (
          <div className="postCard__edit">
            <Link
              to="#"
              className="postCard__edit-button postCard__edit-button--edit"
            >
              EDIT
            </Link>
            <button
              className="postCard__edit-button postCard__edit-button--delete"
              onClick={() => props.openModal(post)}
            >
              DELETE
            </button>
          </div>
        ) : null}
      </React.Fragment>
    );
  });

  return postCard;
};

export default PostCard;
