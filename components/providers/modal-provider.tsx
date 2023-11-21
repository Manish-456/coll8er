"use client";

import { CardModal } from "@/components/modals/card-modals";
import { useEffect, useState } from "react";
import { ProModal } from "@/components/modals/pro-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
}
