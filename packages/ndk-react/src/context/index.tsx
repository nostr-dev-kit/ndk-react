import { PropsWithChildren, createContext, useContext } from "react";
import NDK, {
  NDKEvent,
  NDKFilter,
  NDKNip07Signer,
  NDKNip46Signer,
  NDKPrivateKeySigner,
} from "@nostr-dev-kit/ndk";
import NDKInstance from "./instance";
import { _loginWithNip07, _loginWithNip46, _loginWithSecret } from "./signers";

interface NDKContext {
  ndk: NDK | undefined;
  signer: NDKPrivateKeySigner | NDKNip46Signer | NDKNip07Signer | undefined;
  fetchEvents: (filter: NDKFilter) => Promise<NDKEvent[]>;
  loginWithNip46: (
    npub: string,
    sk?: string
  ) => Promise<
    | undefined
    | {
        npub: string;
        sk: string | undefined;
        token: string;
        remoteSigner: NDKNip46Signer;
        localSigner: NDKPrivateKeySigner;
      }
  >;
  loginWithSecret: (skOrNsec: string) => Promise<
    | undefined
    | {
        npub: string;
        sk: string;
        signer: NDKPrivateKeySigner;
      }
  >;
  loginWithNip07: () => Promise<
    | undefined
    | {
        npub: string;
        signer: NDKNip07Signer;
      }
  >;
  signPublishEvent: (
    event: NDKEvent,
    params?:
      | {
          repost: boolean;
          publish: boolean;
        }
      | undefined
  ) => Promise<undefined | NDKEvent>;
}

const NDKContext = createContext<NDKContext>({
  ndk: undefined,
  signer: undefined,
  fetchEvents: (_: NDKFilter) => Promise.resolve([]),
  loginWithNip46: (_: string, __?: string) => Promise.resolve(undefined),
  loginWithSecret: (_: string) => Promise.resolve(undefined),
  loginWithNip07: () => Promise.resolve(undefined),
  signPublishEvent: (_: NDKEvent, __?: {}) => Promise.resolve(undefined),
});

const NDKProvider = ({
  children,
  relayUrls,
}: PropsWithChildren<{
  relayUrls: string[];
}>) => {
  const { ndk, signer, setSigner, fetchEvents, signPublishEvent } =
    NDKInstance(relayUrls);

  async function loginWithNip46(npub: string, sk?: string) {
    if (ndk === undefined) return undefined;
    const res = await _loginWithNip46(ndk, npub, sk);
    if (res) {
      await setSigner(res.remoteSigner);
      return res;
    }
  }

  async function loginWithSecret(skOrNsec: string) {
    const res = await _loginWithSecret(skOrNsec);
    if (res) {
      const { signer } = res;
      await setSigner(signer);
      return res;
    }
  }

  async function loginWithNip07() {
    const res = await _loginWithNip07();
    if (res) {
      const { signer } = res;
      await setSigner(signer);
      return res;
    }
  }

  return (
    <NDKContext.Provider
      value={{
        ndk,
        signer,
        fetchEvents,
        loginWithNip07,
        loginWithNip46,
        loginWithSecret,
        signPublishEvent,
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
