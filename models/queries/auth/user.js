const GetUserDetailsQuery = (user_id) => {
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

const GetUserAllBadgeQuery = (user_id, badge_id) => {
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
        ],
      },
    },
    return: ["id", { badge_id_map: ["image", "level"] }],
  };
};

module.exports.GetUserDetailsQuery = GetUserDetailsQuery;
module.exports.GetUserAllBadgeQuery = GetUserAllBadgeQuery;
