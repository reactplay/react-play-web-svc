import { submit } from "../../services/submit.js";

const GetAllParticipantIdeasMemberId = () => {
  return {
    display: "Get All Participants",
    name: "hackathon_ideas_members",
    function: "hackathon_ideas_members",
    return: ["user_id", "idea_id"],
  };
};

const GetAllAuthorsId = () => {
  return {
    display: "Get All Author",
    name: "hackathon_ideas",
    function: "hackathon_ideas",
    return: ["id", "owner"],
  };
};

const GetAllCompletedIdeasId = () => {
  return {
    display: "Get All Submissions",
    name: "hackathon_idea_submission",
    function: "hackathon_idea_submission",
    return: ["idea_id"],
  };
};

const GetAllWinnerUserId = () => {
  return {
    display: "Get Winners",
    name: "hackathon_winners",
    function: "hackathon_winners",
    return: ["user_id", "position_type"],
  };
};

export const UpdateHackRPlayBadges = (url) => {
  const promises = [
    submit(GetAllParticipantIdeasMemberId(), url),
    submit(GetAllCompletedIdeasId(), url),
    submit(GetAllWinnerUserId(), url),
    submit(GetAllAuthorsId(), url),
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
      //   allContributors.forEach((cont) => {
      //     if (participants.indexOf(cont.user_id) < 0) {
      //       participants.push(cont.user_id);
      //     }

      //     const completedIdeaFilter = completedIdeas.filter(
      //       (ci) => ci.idea_id === cont.idea_id
      //     );
      //     if (
      //       completedIdeaFilter.length > 0 &&
      //       submitters.indexOf(cont.user_id) < 0
      //     ) {
      //       submitters.push(cont.user_id);
      //     }
      //   });
      //   winnersIdeas.forEach((wi) => {
      //     if (wi.position_type.toLowerCase() === "w") {
      //       winners.push(wi.user_id);
      //     }
      //   });
      console.log(`Participants : ${contributorsId.length}`);
      console.log(contributorsId);
      console.log(`Submitters: ${completedContributorsId.length}`);
      console.log(completedContributorsId);
      console.log(`Winners : ${winners.length}`);
      console.log(winners);
      return {
        winners: winners,
        submitters: completedContributorsId,
        participants: contributorsId,
      };
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
