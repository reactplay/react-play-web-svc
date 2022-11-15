const fs = require("fs");
const path = require("path");

const GetTemplateFileContent = (
  user_display_name,
  user_email,
  user_avatar,
  user_badges
) => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "template.txt"),
    "utf8"
  );
  return content
    .replace("{{user_display_name}}", user_display_name)
    .replace("{{user_avatar}}", user_avatar)
    .replace("{{user_email}}", user_email)
    .replace("{{user_badges}}", user_badges);
};

module.exports.GetTemplateFileContent = GetTemplateFileContent;
