"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { isAppPublic } from "@/lib/visibility";

/**
 * Crisp live chat. Same website ID as the two Shopify apps, so visitor
 * chats land in the same inbox as in-app conversations.
 *
 * Configured after hydration (not via next/script) to keep the widget's
 * ~100kb off the critical path - it has no bearing on LCP.
 */
const CRISP_WEBSITE_ID = "a0912d38-696d-4fb3-9a53-92e0ac6ad02c";

/** Long enough that the visitor is reading rather than still landing. */
const GREETING_DELAY_MS = 10_000;

const GREETING = isAppPublic("order-editing")
  ? "Hi 👋 Anything we can help with? Ask us about order editing, subscriptions, or getting set up on Shopify."
  : "Hi 👋 Anything we can help with? Ask us about subscriptions, product bundles, or getting set up on Shopify.";

/**
 * Shown once per tab - sessionStorage, not localStorage, so a visitor who
 * comes back next week is greeted again but one browsing five pages today
 * is not. Client-side nav keeps this component mounted, but a hard reload
 * remounts it, hence the flag rather than a ref.
 */
const GREETED_KEY = "appfox:crisp-greeted";

export function CrispChat() {
  useEffect(() => {
    Crisp.configure(CRISP_WEBSITE_ID);

    if (sessionStorage.getItem(GREETED_KEY)) return;

    let timer: ReturnType<typeof setTimeout>;

    // Wait for the session so unreadCount() reflects real history: showText()
    // injects the message client-side only (it never reaches the inbox), so
    // without this guard it could land on top of an operator's live reply.
    Crisp.session.onLoaded(() => {
      timer = setTimeout(() => {
        if (Crisp.chat.isChatOpened() || Crisp.chat.unreadCount() > 0) return;

        Crisp.message.showText(GREETING);
        sessionStorage.setItem(GREETED_KEY, "1");
      }, GREETING_DELAY_MS);
    });

    return () => {
      clearTimeout(timer);
      Crisp.session.offLoaded();
    };
  }, []);

  return null;
}
