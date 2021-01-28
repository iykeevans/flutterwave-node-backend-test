export const getPersonalInfo = async (req, res) => {
  return res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Ezeani Ikenna",
      github: "@iykeevans",
      email: "elochi238@gmail.com",
      mobile: "07053052215",
      twitter: "@iykeevan",
    },
  });
};
