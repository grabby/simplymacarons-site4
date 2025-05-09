import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const Toast = () => {
  const { toast, dismissToast } = useToast();

  const getIcon = () => {
    switch (toast?.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-[hsl(var(--mint))]" />;
      case "error":
        return <XCircle className="h-5 w-5 text-[hsl(var(--destructive))]" />;
      default:
        return <AlertCircle className="h-5 w-5 text-[hsl(var(--accent))]" />;
    }
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 max-w-xs"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              {getIcon()}
            </div>
            <div>
              <p className="font-medium">{toast.message}</p>
            </div>
            <button
              onClick={dismissToast}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
