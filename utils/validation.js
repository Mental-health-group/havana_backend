const Joi = require("joi");

exports.validateClientRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

exports.validateProfessionalRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

exports.validatePostCreation = (data) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(data);
};

exports.validateSessionScheduling = (data) => {
  const schema = Joi.object({
    professional: Joi.string().required(),
    client: Joi.string().required(),
    date: Joi.date().required(),
    duration: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.validateMessageSending = (data) => {
  const schema = Joi.object({
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    message: Joi.string().required(),
  });
  return schema.validate(data);
};
