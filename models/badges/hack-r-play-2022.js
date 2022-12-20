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
const { sendMail } = require("../../services/email/index.js");

const BADGE_PREFIX = "Hack-R-Play";

const UpdateHackRPlayBadges = async () => {
  const promises = [
    gsubmit(GetAllParticipantIdeasMemberIdQuery()),
    gsubmit(GetAllCompletedIdeasIdQuery()),
    gsubmit(GetAllWinnerUserIdQuery()),
    gsubmit(GetAllAuthorsIdQuery()),
  ];
  return Promise.all(promises)
    .then((res) => {
      const gsubmittedContributors = res[0];
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
        gsubmitPromises.push(
          InsertBadge(cont, HackRPlayBadges.winners, "Winner")
        );
      });
      completedContributorsId.forEach((cont) => {
        gsubmitPromises.push(
          InsertBadge(cont, HackRPlayBadges.submitters, "Finisher")
        );
      });
      contributorsId.forEach((cont) => {
        gsubmitPromises.push(
          InsertBadge(cont, HackRPlayBadges.participant, "Participant")
        );
      });

      return Promise.all(gsubmitPromises)
        .then((res) => {
          return {
            winners: winners,
            submitters: completedContributorsId,
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

const getUserEmailID = async (user_id) => {
  const res = await gsubmit(GetUserDetailsQuery(user_id));
  return res[0].email;
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
  return res.length > 0;
};

const InsertBadge = async (user_id, badge_id, badge_text) => {
  console.log(`Processing user: ${user_id} for ${badge_id} badge`);
  if (!(await IsUserBadgeExists(user_id, badge_id))) {
    const res = gsubmit(InsertBadgeQuery(user_id, badge_id));
    sendMail(await getUserEmailID(user_id), `${BADGE_PREFIX} ${badge_text}`);
    return res;
  } else {
    console.log(`User badge exists: ${user_id}`);
    return false;
  }
};

module.exports.UpdateHackRPlayBadges = UpdateHackRPlayBadges;
