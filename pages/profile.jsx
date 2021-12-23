import { useAuth } from "../context/AuthContext";

function Profile() {
  const {
    userData: { email, name, profilePicture },
  } = useAuth();

  return (
    <div>
      <h1>Welcome to your profile</h1>
      <div>
        <p>{email}</p>
        <p>{name}</p>
        <p>{profilePicture}</p>
      </div>
    </div>
  );
}

export default Profile;
