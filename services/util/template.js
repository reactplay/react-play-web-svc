const { HTMLTemplate } = require("./html_template");

const GetTemplateFileContent = (
  user_display_name,
  user_email,
  user_avatar,
  user_badges
) => {
  return HTMLTemplate.replace("{{user_display_name}}", user_display_name)
    .replace("{{user_avatar}}", user_avatar)
    .replace("{{user_email}}", user_email)
    .replace("{{user_badges}}", user_badges);
};

module.exports.GetTemplateFileContent = GetTemplateFileContent;
