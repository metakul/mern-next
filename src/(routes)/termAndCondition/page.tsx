import { Container, Typography, Box } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container className="py-2">
      <Box className=" shadow-lg rounded-lg ">
        <Typography variant="h2" className="font-bold mb-4">
          Terms and Conditions
        </Typography>
        <Typography sx={{
         mt:2,
         mb:2
        }}
        >
          <strong>Effective Date:</strong> [20 NOVEMBER,2024]
        </Typography>
        <Typography className="t mb-4">
          Welcome to <strong>WHATIWEAR</strong>! By accessing or using our
          website (the “Site”), you agree to be bound by these Terms and
          Conditions. If you do not agree with any part of these terms, please
          refrain from using our Site.
        </Typography>

        <Box className="space-y-4">
          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By accessing or using WHATIWEAR, you confirm that you are at least 18 years old or have the permission of a parent or guardian to use this website. These terms constitute a binding agreement between you and WHATIWEAR.",
            },
            {
              title: "2. Use of the Site",
              content: (
                <>
                  You agree to use the Site for lawful purposes only. You are
                  prohibited from:
                  <ul className="list-disc ml-6 mt-2">
                    <li>Violating any local, state, or international laws.</li>
                    <li>
                      Uploading or sharing harmful, abusive, or offensive
                      content.
                    </li>
                    <li>
                      Interfering with the proper functioning of the Site or its
                      associated systems.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "3. User Accounts",
              content: (
                <>
                  When creating an account:
                  <ul className="list-disc ml-6 mt-2">
                    <li>You must provide accurate and complete information.</li>
                    <li>
                      You are responsible for maintaining the confidentiality of
                      your login credentials.
                    </li>
                    <li>
                      You agree to notify us immediately of any unauthorized use
                      of your account.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "4. Purchases and Payments",
              content: (
                <>
                  By placing an order through WHATIWEAR:
                  <ul className="list-disc ml-6 mt-2">
                    <li>
                      You agree to provide current and accurate payment
                      information.
                    </li>
                    <li>
                      All prices listed on the Site are subject to change
                      without notice.
                    </li>
                    <li>
                      Orders are subject to availability, and we reserve the
                      right to cancel or refuse orders for any reason.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "5. Returns and Refunds",
              content:
                "We strive for customer satisfaction. Please review our Return Policy for details on eligibility, timelines, and processes for returns and refunds.",
            },
            {
              title: "6. Intellectual Property",
              content:
                "All content on the Site, including but not limited to text, images, logos, and design elements, is the property of WHATIWEAR or our licensors. Unauthorized use, reproduction, or distribution is prohibited.",
            },
            {
              title: "7. Third-Party Links",
              content:
                "The Site may contain links to third-party websites. WHATIWEAR is not responsible for the content, accuracy, or practices of these external sites. Accessing them is at your own risk.",
            },
            {
              title: "8. Limitation of Liability",
              content:
                "To the fullest extent permitted by law: WHATIWEAR is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site. Our liability is limited to the amount you paid for products or services, if applicable.",
            },
            {
              title: "9. Privacy Policy",
              content:
                "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.",
            },
            {
              title: "10. Termination",
              content:
                "We reserve the right to suspend or terminate your access to the Site at any time, without notice, for any violation of these Terms.",
            },
            {
              title: "11. Changes to Terms",
              content:
                "WHATIWEAR reserves the right to update these Terms at any time. Changes will be effective upon posting to the Site. Continued use of the Site constitutes acceptance of the revised Terms.",
            },
            {
              title: "12. Governing Law",
              content:
                "These Terms are governed by the laws of [Insert Jurisdiction]. Any disputes arising from these Terms or your use of the Site will be subject to the exclusive jurisdiction of the courts of [Insert Jurisdiction].",
            },
            {
              title: "13. Contact Us",
              content: (
                <>
                  If you have any questions about these Terms, please contact us
                  at:
                  <ul className="list-disc ml-6 mt-2">
                    <li>Email: [founders@whatiwear.com]</li>
                    <li>Phone: [73100747066]</li>
                    <li>Address: [Shubham Kunwar, Metakul, IIT Kanpur]</li>
                  </ul>
                </>
              ),
            },
          ].map((section, index) => (
            <Box key={index} className="space-y-2">
              <Typography variant="h6" className="font-semibold">
                {section.title}
              </Typography>
              <Typography className="">
                {section.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
