import { HackRPlayBadges } from "../../services/badges.js";
// import { sendMail } from "../../services/email/index.js";
import { submit } from "../../services/submit.js";
import {
  GetAllParticipantIdeasMemberIdQuery,
  GetUserBadgeQuery,
  GetAllAuthorsIdQuery,
  GetAllCompletedIdeasIdQuery,
  GetAllWinnerUserIdQuery,
  InsertBadgeQuery,
  GetUserDetailsQuery,
} from "./queries.js";

export const UpdateHackRPlayBadges = (url, sendgrid_api_key) => {
  const promises = [
    submit(GetAllParticipantIdeasMemberIdQuery(), url),
    submit(GetAllCompletedIdeasIdQuery(), url),
    submit(GetAllWinnerUserIdQuery(), url),
    submit(GetAllAuthorsIdQuery(), url),
  ];
  return Promise.all(promises)
    .then((res) => {
      const submittedContributors = res[0];
      const completedIdeas = res[1];
      const winningIdeas = res[2];
      const authorIds = res[3];

      const allContributors = submittedContributors;

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
      // console.log(`Participants : ${contributorsId.length}`);
      // console.log(contributorsId);
      // console.log(`Submitters: ${completedContributorsId.length}`);
      // console.log(completedContributorsId);
      // console.log(`Winners : ${winners.length}`);
      // console.log(winners);
      const submitPromises = [];
      contributorsId.forEach((cont) => {
        submitPromises.push(
          InsertBadge(cont, HackRPlayBadges.participant, url)
        );
      });

      completedContributorsId.forEach((cont) => {
        submitPromises.push(InsertBadge(cont, HackRPlayBadges.submitters, url));
      });

      winners.forEach((cont) => {
        submitPromises.push(InsertBadge(cont, HackRPlayBadges.winners, url));
      });
      return Promise.all(submitPromises)
        .then((res) => {
          // sendMail(sendgrid_api_key);
          return {
            winners: winners,
            submitters: completedContributorsId,
            participants: contributorsId,
          };
        })
        .catch((err) => {
          // console.log(some)
        });
    })
    .catch((err) => {
      // console.error(err);
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
  const submitters = [];
  allContributors.forEach((cont) => {
    const completedIdeaFilter = completedIdeas.filter(
      (ci) => ci.idea_id === cont.idea_id
    );
    if (
      completedIdeaFilter.length > 0 &&
      submitters.indexOf(cont.user_id) < 0
    ) {
      submitters.push(cont.user_id);
    }
  });
  return submitters;
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

const IsUserBadgeExists = async (user_id, badge_id, url) => {
  const res = await submit(GetUserBadgeQuery(user_id, badge_id), url);
  console.log(res, res.length, res.length > 0);
  return res.length > 0;
};

const InsertBadge = async (user_id, badge_id, url) => {
  if (!(await IsUserBadgeExists(user_id, badge_id, url))) {
    console.log(`Inserting user: ${user_id}`);
    const userDetails = await submit(GetUserDetailsQuery(user_id), url);
    console.log(userDetails);
    return submit(InsertBadgeQuery(user_id, badge_id), url);
  } else {
    console.log(`User badge exists: ${user_id}`);
  }
};
