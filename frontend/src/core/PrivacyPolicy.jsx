import { useState } from "react";

export default function PrivacyPolicy() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // Function to toggle the display of the privacy policy popup
  const togglePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy);
  };

  return (
    <div className="privacy-policy-container">
      <h2>Privacy Policy</h2>
      <p>
        As a volunteer of Food Bank Kenya, I agree to maintain the privacy and
        confidentiality of any and all personal information of users. I
        recognize the value and sensitivity of confidential information, and I
        agree not to copy, discuss, or otherwise disclose any participant's
        information to anyone who does not have official responsibility
        regarding that information of the food bank. I agree to keep all the
        organization's information completely confidential even after I am no
        longer volunteering with the food bank. I understand that failure to
        comply with this policy will result in my immediate dismissal as a
        volunteer. I have carefully read this and fully understand its content.
        I acknowledge and agree this shall be binding upon my survivors, heirs,
        successors, and assigns. I am aware that this is a release of
        liability, including but not limited to liability for negligence, and
        an indemnification agreement, and I sign it of my own will.
      </p>
      <button className="close-button" onClick={togglePrivacyPolicy}>
        Close
      </button>
    </div>
  );
}

