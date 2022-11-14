export const GetAllParticipantIdeasMemberIdQuery = () => {
  return {
    display: "Get All Participants",
    name: "hackathon_ideas_members",
    function: "hackathon_ideas_members",
    return: ["user_id", "idea_id"],
  };
};

export const GetUserDetailsQuery = (user_id) => {
  return {
    display: "Get User Details",
    name: "users",
    function: "users",
    where: {
      clause: {
        operator: "and",
        conditions: [
          {
            field: "id",
            operator: "eq",
            value: user_id,
          },
        ],
      },
    },
    return: ["displayName", "email", "avatarUrl"],
  };
};


export const GetUserAllBadgeQuery = (user_id) => {
  return {
    display: "Get User Badge Map",
    name: "meta_user_badge_map",
    function: "meta_user_badge_map",
    where: {
      clause: {
        conditions: [
          {
            field: "user_id",
            operator: "eq",
            value: user_id,
          }
        ],
      },
    },
    return: [
      {
        badge_id_map: ['image'],
      },
    ],
  };
};

export const GetUserBadgeQuery = (user_id, badge_id) => {
  return {
    display: "Get User Badge Map",
    name: "meta_user_badge_map",
    function: "meta_user_badge_map",
    where: {
      clause: {
        operator: "and",
        conditions: [
          {
            field: "user_id",
            operator: "eq",
            value: user_id,
          },
          {
            field: "badge_id",
            operator: "eq",
            value: badge_id,
          },
        ],
      },
    },
    return: ["id"],
  };
};

export const GetAllAuthorsIdQuery = () => {
  return {
    display: "Get All Author",
    name: "hackathon_ideas",
    function: "hackathon_ideas",
    return: ["id", "owner"],
  };
};

export const GetAllCompletedIdeasIdQuery = () => {
  return {
    display: "Get All Submissions",
    name: "hackathon_idea_submission",
    function: "hackathon_idea_submission",
    return: ["idea_id"],
  };
};

export const GetAllWinnerUserIdQuery = () => {
  return {
    display: "Get Winners",
    name: "hackathon_winners",
    function: "hackathon_winners",
    return: ["user_id", "position_type"],
  };
};

export const InsertBadgeQuery = (badge_id, user_id) => {
  return {
    display: "Get Winners",
    name: "insert_meta_user_badges_one",
    function: "insert_meta_user_badges_one",
    write: true,
    object: {
      badge_id: badge_id,
      user_id: user_id,
    },
    return: ["id"],
  };
};
