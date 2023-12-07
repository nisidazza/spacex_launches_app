import LoadingDots from "../loading-dots";

type Button = {
  loading: boolean;
  label: string;
};

export default function Button(props: Button) {
  const { loading, label } = props;
  return (
    <button
      disabled={loading}
      className={`${
        loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
      } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
    >
      {loading ? <LoadingDots color="#808080" /> : <p>{label}</p>}
    </button>
  );
}
