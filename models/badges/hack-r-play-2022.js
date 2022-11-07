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
      const winnersIdeas = res[2];
      const authorIds = res[3];

      const allContributors = submittedContributors;

      authorIds.forEach((auth) => {
        allContributors.push({
          idea_id: auth.id,
          user_id: auth.owner,
        });
      });

      const participants = [];
      const submitters = [];
      const winners = [];
      allContributors.forEach((cont) => {
        if (participants.indexOf(cont.user_id) < 0) {
          participants.push(cont.user_id);
        }

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
      winnersIdeas.forEach((wi) => {
        if (wi.position_type.toLowerCase() === "w") {
          winners.push(wi.user_id);
        }
      });
      console.log(`Participants : ${participants.length}`);
      console.log(participants);
      console.log(`Submitters: ${submitters.length}`);
      console.log(submitters);
      console.log(`Winners : ${winners.length}`);
      console.log(winners);
    })
    .catch((err) => {
      // console.error(err);
    });
};
