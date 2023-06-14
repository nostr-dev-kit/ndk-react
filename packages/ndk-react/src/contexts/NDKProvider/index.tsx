import { createContext, useContext, PropsWithChildren } from "react";
import NDK, { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";
import { Profile } from "./Profile";
import { NDKInstance } from "./NDKInstance";

interface NDKContext {
  ndk: NDK;
  relayUrls: string[];
  loadNdk: (_: string[]) => void;
  getUser: (_: string) => NDKUser;
  getProfile: (_: string) => NDKUserProfile;
}

const NDKContext = createContext<NDKContext>({
  ndk: new NDK({}),
  relayUrls: [],
  loadNdk: (_: string[]) => {},
  getUser: (_: string) => {
    return NDKUser.prototype;
  },
  getProfile: (_: string) => {
    return {};
  },
});

const NDKProvider = ({ children }: PropsWithChildren<{}>) => {
  const { ndk, relayUrls, loadNdk } = NDKInstance();
  const { getUser, getProfile } = Profile(ndk!);

  if (ndk)
    return (
      <NDKContext.Provider
        value={{
          ndk,
          relayUrls,
          loadNdk,
          getUser: getUser,
          getProfile: getProfile,
        }}
      >
        {children}
      </NDKContext.Provider>
    );
};

const useNDK = () => {
  const context = useContext(NDKContext);
  if (context === undefined) {
    throw new Error("import NDKProvider to use useNDK");
  }
  return context;
};

export { NDKProvider, useNDK };
