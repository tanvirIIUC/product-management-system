const Loading = () => {
    return  <div className="h-screen bg-black/10 z-[999] fixed inset-0 backdrop-blur-md flex justify-center items-center">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  };
  export default Loading;