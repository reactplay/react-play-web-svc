const dotenv = require("dotenv");
dotenv.config();
const { HackRPlayBadges } = require("../../services/badges.js");
// import { sendMail } from "../../services/email/index.js";
const { gsubmit } = require("../../services/submit.js");
const {
  GetAllParticipantIdeasMemberIdQuery,
  GetUserBadgeQuery,
  GetAllAuthorsIdQuery,
  GetAllCompletedIdeasIdQuery,
  GetAllWinnerUserIdQuery,
  InsertBadgeQuery,
} = require("../queries/badges/queries");

const { GetUserDetailsQuery } = require("../queries/auth/user");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

console.log(SENDGRID_API_KEY);

const UpdateHackRPlayBadges = () => {
  const promises = [
    gsubmit(GetAllParticipantIdeasMemberIdQuery()),
    gsubmit(GetAllCompletedIdeasIdQuery()),
    gsubmit(GetAllWinnerUserIdQuery()),
    gsubmit(GetAllAuthorsIdQuery()),
  ];
  return Promise.all(promises)
    .then((res) => {
      const gsubmittedContributors = res[0];
      console.log(JSON.stringify(res[0], undefined, 2));
      const completedIdeas = res[1];
      const winningIdeas = res[2];
      const authorIds = res[3];

      const allContributors = gsubmittedContributors;

      authorIds.forEach((auth) => {
        allContributors.push({
          idea_id: auth.id,
          user_id: auth.owner,
        });
      });

      const contributorsId = getAllContributorsId(allContributors);
      const completedContributorsId = getAllCompletedContributorsId(
        allContributors,
        completedIdeas
      );
      const winners = getAllWinnersId(allContributors, winningIdeas);
      const gsubmitPromises = [];

      winners.forEach((cont) => {
        gsubmitPromises.push(InsertBadge(cont, HackRPlayBadges.winners));
      });
      completedContributorsId.forEach((cont) => {
        gsubmitPromises.push(InsertBadge(cont, HackRPlayBadges.gsubmitters));
      });
      contributorsId.forEach((cont) => {
        gsubmitPromises.push(InsertBadge(cont, HackRPlayBadges.participant));
      });

      return Promise.all(gsubmitPromises)
        .then((res) => {
          // sendMail(sendgrid_api_key);
          return {
            winners: winners,
            gsubmitters: completedContributorsId,
            participants: contributorsId,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
};

const getAllContributorsId = (allContributors) => {
  const participants = [];
  allContributors.forEach((cont) => {
    if (participants.indexOf(cont.user_id) < 0) {
      participants.push(cont.user_id);
    }
  });
  return participants;
};

const getAllCompletedContributorsId = (allContributors, completedIdeas) => {
  const gsubmitters = [];
  allContributors.forEach((cont) => {
    const completedIdeaFilter = completedIdeas.filter(
      (ci) => ci.idea_id === cont.idea_id
    );
    if (
      completedIdeaFilter.length > 0 &&
      gsubmitters.indexOf(cont.user_id) < 0
    ) {
      gsubmitters.push(cont.user_id);
    }
  });
  return gsubmitters;
};

const getAllWinnersId = (allContributors, winningIdeas) => {
  const winners = [];
  winningIdeas.forEach((wi) => {
    if (wi.position_type.toLowerCase() === "w") {
      winners.push(wi.user_id);
    }
  });
  return winners;
};

const IsUserBadgeExists = async (user_id, badge_id) => {
  const res = await gsubmit(GetUserBadgeQuery(user_id, badge_id));
  console.log(res, res.length, res.length > 0);
  return res.length > 0;
};

const InsertBadge = async (user_id, badge_id) => {
  if (!(await IsUserBadgeExists(user_id, badge_id))) {
    console.log(`Inserting user: ${user_id}`);
    const userDetails = await gsubmit(GetUserDetailsQuery(user_id));
    return gsubmit(InsertBadgeQuery(user_id, badge_id));
  } else {
    console.log(`User badge exists: ${user_id}`);
  }
};

module.exports.UpdateHackRPlayBadges = UpdateHackRPlayBadges;
