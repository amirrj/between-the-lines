const validator = require('validator');
const isEmpty = require('is-empty');

const postsValidation = (data) => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.article = !isEmpty(data.article) ? data.article : '';
  data.image = !isEmpty(data.image) ? data.image : '';
  data.image_caption = !isEmpty(data.image_caption) ? data.image_caption : '';

  if (isEmpty(data.title)) {
    errors.title = 'Please give this article a title';
  } else if (!validator.isLength(data.title, { max: 30 })) {
    errors.title = 'Title is too long. max 30 characters';
  }

  if (isEmpty(data.description)) {
    errors.description = 'Description field is required';
  } else if (!validator.isLength(data.description, { max: 150 })) {
    errors.description = 'Description is too long. max 150 characters';
  }

  if (isEmpty(data.article)) {
    errors.article = 'Body field is required';
  }

  if (!validator.isLength(data.image_caption, { max: 50 })) {
    errors.caption = 'Caption is too long. max 50 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = postsValidation;
