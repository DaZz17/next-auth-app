export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <span className="p-2 rounded-md bg-gray-300 text-black">{params.id}</span>
      <hr />
      <p className="mt-4 text-4xl">Profile Page</p>
    </div>
  );
}
