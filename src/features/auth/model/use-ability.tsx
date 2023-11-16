import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { subject } from "@casl/ability";
import { useMemo } from "react";
import { Ability, abilityFactory } from "./ability-factory";
import { useAppSelector } from "@/shared/lib/redux";
import { sessionStore } from "@/entities/session";

const abilityContext = createStrictContext<Ability>();

export const AbilityProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const session = useAppSelector(sessionStore.selectors.selectSession);

  const ability = useMemo(() => {
    return abilityFactory(session);
  }, [session]);

  return (
    <abilityContext.Provider value={ability}>
      {children}
    </abilityContext.Provider>
  );
};

export const useAbility = () => {
  return useStrictContext(abilityContext);
};
export { subject };
