import { useEffect, useState } from "react";
import NDK from "@nostr-dev-kit/ndk";
import { RELAYS } from "src/constants/relays";

export const NDKInstance = () => {
  const [ndk, setNDK] = useState<NDK | undefined>(undefined);
  const [relayUrls, setRelayUrls] = useState<string[]>(RELAYS);

  useEffect(() => {
    loadNdk(RELAYS);
  }, []);

  async function loadNdk(explicitRelayUrls: string[]) {
    const ndkInstance = new NDK({ explicitRelayUrls });

    try {
      await ndkInstance.connect();
    } catch (error) {
      console.error("ERROR loading NDK NDKInstance", error);
    }

    setNDK(ndkInstance);
    setRelayUrls(explicitRelayUrls);
  }

  return {
    ndk,
    relayUrls,
    loadNdk,
  };
};
