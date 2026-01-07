import { Spinner } from "./ui/spinner";

export const LoadingSpinner = ({ isLoading, message }) => {
  return (
    <div
      className={`mx-auto ${
        isLoading ? "flex flex-col items-center gap-1" : "hidden"
      }`}
    >
      <Spinner className="size-12" />
      <p className="text-sm">{message}</p>
    </div>
  );
};
