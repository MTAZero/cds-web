import { toast } from "react-toastify";

export const success = (content = "") => {
  toast.success(content, {
    position: "top-center",
    isLoading: false,
  });
};

export const error = (content = "") => {
  toast.error(content, {
    position: "top-center",
    isLoading: false,
  });
};

export const notify = (content = "") => {
  toast.info(content, {
    position: "top-center",
    isLoading: false,
  });
};
