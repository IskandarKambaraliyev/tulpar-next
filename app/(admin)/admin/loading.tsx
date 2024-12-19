const AdminPageLoading = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[20rem] rounded-2xl bg-black/10 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default AdminPageLoading;
