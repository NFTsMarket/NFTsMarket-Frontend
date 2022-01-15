import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      {user && (
        <div>
          <h1>Welcome to your profile</h1>
          <p>{user.email}</p>
          <p>{user.name}</p>
          <img src={user.profilePicture} alt={user.name} />
        </div>
      )}
    </div>
  );
}
