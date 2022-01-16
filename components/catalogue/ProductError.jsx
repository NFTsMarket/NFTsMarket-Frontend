import ErrorAlert from "./errorAlert";

export default function ProductError({ message }) {
  return (
    <div className="upload-show">
      {message !== "" ? (
        <ErrorAlert text="" description={`${message}`} />
      ) : null}
    </div>
  );
}
