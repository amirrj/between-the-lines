import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../Redux/Actions/PostActions';

import Navigation from '../../Components/Navigation/Navigation';
import Loading from '../../Components/Helpers/Loading/Loading';

import './Post.css';

const Post = (props) => {
  const dispatch = useDispatch();
  const postLoading = useSelector((state) => state.posts.postsLoading);
  const userLoading = useSelector((state) => state.posts.isLoading);
  const post = useSelector((state) => state.posts.post);

  const date = post.post_date ? new Date(post.post_date) : null;
  const displayDate = date ? date.toUTCString() : null;

  const displayArticle = post.article
    ? post.article.map((para, i) => {
        return (
          <p key={i} className="post__article-article">
            {para}
          </p>
        );
      })
    : null;

  useEffect(() => {
    dispatch(getPost(props.match.params.postid));
  }, [dispatch, props.match.params.postid]);

  const display =
    postLoading || userLoading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Navigation />
        <div className="post">
          <div className="post__header">
            <h1 className="post__header-title">{post.title}</h1>
            <p className="post__header-desc">{post.description}</p>
            <p className="post__header-topic">Topic: {post.topic}</p>
            {post.author ? (
              <p className="post__header-author">
                Written by {post.author.firstName} {post.author.lastName} <br />
                On {displayDate}
              </p>
            ) : null}
          </div>
          <div className="post__image">
            <img
              className="post__image-image"
              src={post.image}
              alt={`between the lines - ${post.topics}`}
            />
            <p className="post__image-caption">{post.image_caption}</p>
          </div>
          <div className="post__article">
            {displayArticle}
            <br />
            <hr />
          </div>
        </div>
      </React.Fragment>
    );

  return display;
};

export default Post;
