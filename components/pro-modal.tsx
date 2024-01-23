"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useProModal } from "@/hooks/use-pro-modal";

export const ProModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const proModal = useProModal();

  const onSubscribe = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data?.url;
    } catch (error: unknown) {
      toast.error("Something went wrong.");
      console.error("[PRO_MODAL_SUBSCRIBE]: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isLoading || proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>

          <DialogDescription className="text-center space-y-2">
            Create <span className="text-sky-500 font-medium">Custom AI</span>{" "}
            Companions!
          </DialogDescription>
        </DialogHeader>

        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9 <span className="text-sm font-normal">.99 / mo</span>
          </p>

          <Button
            variant="premium"
            onClick={onSubscribe}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
