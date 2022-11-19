const { gsubmit } = require("../../services/submit");
const { UpdateHackRPlayBadges } = require("../badges/hack-r-play-2022");
const {
  GetUserDetailsQuery,
  GetUserAllBadgeQuery,
} = require("../queries/auth/user");
const nodeHtmlToImage = require("node-html-to-image");
const { GetTemplateFileContent } = require("../../services/util/template");

const UpdateBadges = (req, res) => {
  console.log("Received request to update badges");
  res.writeHead(200, { "Content-Type": "application/json" });
  UpdateHackRPlayBadges().then((result) => {
    var response = {
      response: "Successfully updated badges.",
    };
    console.log(response);
    res.end(JSON.stringify(result));
  });
};

const MetaImage = async (req, res) => {
  console.log(`Badge request received for ${req.params.userId}`);
  try {
    const getUser = await gsubmit(GetUserDetailsQuery(req.params.userId));
    console.log(`User details: ${JSON.stringify(getUser, undefined, 2)}`);
    const getBadges = await gsubmit(GetUserAllBadgeQuery(req.params.userId));
    console.log(`Badge details: ${getBadges[0]?.id}`);
    let images = ``;
    for (let i of await getBadges) {
      images = images.concat(
        `<div><img src="${i.badge_id_map.image}" style="height:100%;width:100%"/></div>`
      );
    }
    const image = await nodeHtmlToImage({
      html: GetTemplateFileContent(
        getUser[0].displayName,
        getUser[0].email,
        getUser[0].avatarUrl,
        images
      ),
    });
    console.log(`Image created`);
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
    });
    res.end(image, "base64");
  } catch (e) {
    console.error("Something went wrong");
    console.log(e);
    res.end(`Something went wrong: ${e}`);
  }
};

module.exports.UpdateBadges = UpdateBadges;
module.exports.MetaImage = MetaImage;
