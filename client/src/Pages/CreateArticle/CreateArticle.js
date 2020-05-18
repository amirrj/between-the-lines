import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTopics } from '../../Redux/Actions/TopicActions';

import Navigation from '../../Components/Navigation/Navigation';
import Loading from '../../Components/Helpers/Loading/Loading';
import CreateArticleForm from '../../Components/CreateArticleForm/CreateArticleForm';
import './CreateArticle.css';

const CreateArticle = (props) => {
  const dispatch = useDispatch();
  const userLoading = useSelector((state) => state.auth.isLoading);
  const topicsLoading = useSelector((state) => state.topics.isLoading);

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const display =
    topicsLoading || userLoading ? (
      <Loading />
    ) : (
      <Fragment>
        <Navigation />
        <div className="createArticle">
          <h1 className="createArticle__title">Write your own story</h1>
          <CreateArticleForm history={props.history} />
        </div>
      </Fragment>
    );

  return display;
};

export default CreateArticle;
