import { useEffect, useRef, useState } from "react";
import NDK, {
  NDKEvent,
  NDKFilter,
  NDKNip07Signer,
  NDKNip46Signer,
  NDKPrivateKeySigner,
} from "@nostr-dev-kit/ndk";

export default function NDKInstance(explicitRelayUrls: string[]) {
  const [ndk, _setNDK] = useState<NDK | undefined>(undefined);
  const [signer, _setSigner] = useState<
    NDKPrivateKeySigner | NDKNip46Signer | NDKNip07Signer | undefined
  >(undefined);
  const loaded = useRef(false);

  useEffect(() => {
    async function load() {
      if (ndk === undefined && loaded.current === false) {
        loaded.current = true;
        await loadNdk(explicitRelayUrls);
      }
    }
    load();
  }, []);

  async function loadNdk(
    explicitRelayUrls: string[],
    signer?: NDKPrivateKeySigner | NDKNip46Signer | NDKNip07Signer
  ) {
    const ndkInstance = new NDK({ explicitRelayUrls, signer });

    if (signer) {
      _setSigner(signer);
    }

    try {
      await ndkInstance.connect();
      _setNDK(ndkInstance);
    } catch (error) {
      console.error("ERROR loading NDK NDKInstance", error);
    }
  }

  async function setSigner(
    signer: NDKPrivateKeySigner | NDKNip46Signer | NDKNip07Signer
  ) {
    loadNdk(explicitRelayUrls, signer);
  }

  async function fetchEvents(filter: NDKFilter): Promise<NDKEvent[]> {
    if (ndk === undefined) return [];
    let events = Array.from(await ndk.fetchEvents(filter));
    return events;
  }

  async function fetchEventsEOSE(filter: NDKFilter): Promise<NDKEvent[]> {
    if (ndk === undefined) return [];

    return new Promise((resolve) => {
      const events: Map<string, NDKEvent> = new Map();

      const relaySetSubscription = ndk.subscribe(filter, {
        closeOnEose: true,
      });

      relaySetSubscription.on("event", (event: NDKEvent) => {
        event.ndk = ndk;
        events.set(event.tagId(), event);
      });

      relaySetSubscription.on("eose", () => {
        setTimeout(() => resolve(Array.from(new Set(events.values()))), 3000);
      });
    });
  }

  async function signPublishEvent(event: NDKEvent, repost: boolean = false) {
    if (ndk === undefined) return;
    event.ndk = ndk;
    if (repost) {
      await event.repost();
    } else {
      await event.sign();
      await event.publish();
    }
    return event;
  }

  return {
    ndk,
    signer,
    loadNdk,
    setSigner,
    fetchEvents,
    fetchEventsEOSE,
    signPublishEvent,
  };
}
