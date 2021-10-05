import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import "./ProfilePicture.css";

function ProfilePicture(props) {
  const width = props.width || props.height || 250;
  const rounded = props.rounded || false;
  const userContext = useContext(UserContext);

  const getFirstLetter = (username) => {
    if (!username) {
      return "";
    } else {
      return username.charAt(0).toUpperCase();
    }
  };
  if (!userContext?.user?.avatarUrl) {
    // If user does not have profile picture then show first letter of name as profile pic.
    const lineHeight = width;
    const fontSize = width - 10;
    return (
      <div
        className={`letter-as-profile ${rounded && "profile-rounded"}`}
        style={{ width: width + "px", height: width + "px", lineHeight: lineHeight + "px", fontSize: fontSize + "px" }}
      >
        {getFirstLetter(userContext?.userData?.username)}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <img
        src={userContext.user.avatarUrl}
        alt="Profile Pic"
        className={rounded && "profile-rounded"}
        width={width}
        height={width}
      />
    </div>
  );
}

export default ProfilePicture;
