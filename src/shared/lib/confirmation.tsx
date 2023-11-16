import { createStrictContext, useStrictContext } from "./react";

export type ConfirmationParams = {
  title?: string;
  description?: string;
  closeText?: string;
  confirmText?: string;
};

export type GetConfirmation = (params: ConfirmationParams) => Promise<boolean>;

export type ConfirmationContext = {
  getConfirmation: GetConfirmation;
  closeConfirmation: () => void;
};

export const confirmationContext = createStrictContext<ConfirmationContext>();

export const useGetConfirmation = () => {
  const { getConfirmation } = useStrictContext(confirmationContext);

  return getConfirmation;
};
