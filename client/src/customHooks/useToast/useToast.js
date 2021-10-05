import { ToastContainer, toast } from "react-toastify";

function useToast() {
  return [
    toast,
    <ToastContainer
      position="bottom-right"
      autoClose={20000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />,
  ];
}

export default useToast;
