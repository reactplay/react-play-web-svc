const EmailSlugMaps = [
  {
    text: ".",
    mask: "__dt__",
  },
  {
    text: "@",
    mask: "__at__",
  },
  {
    text: "-",
    mask: "__hy__",
  },
];

const email2Slug = (email) => {
  let convertedEmail = email;
  EmailSlugMaps.forEach((m) => {
    convertedEmail = convertedEmail.replace(
      new RegExp(`[${m.text}]`, "gm"),
      m.mask
    );
  });
  return convertedEmail;
};

module.exports.email2Slug = email2Slug;
