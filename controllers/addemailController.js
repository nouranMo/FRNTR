import mailchimp from "@mailchimp/mailchimp_marketing";
const addemailController = {};
addemailController.addEmail = async (req, res) => {
    const { email } = req.body;

  // Add the user's email to the Mailchimp list
  mailchimp.lists.addListMember("2d4d9e0eaa", {
    email_address: email,
    status: "subscribed",
  })
    .then((response) => {
      console.log(response);
      res.json({ message: "Subscription successful" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Subscription failed" });
    });
};
export default addemailController;