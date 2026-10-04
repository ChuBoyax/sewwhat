import { useEffect, useState } from "react";

/* Tiny hash router: works on Herd, Vite and any static host with no server config. */
const read = () => {
  const h = window.location.hash.replace(/^#/, "");
  return h.startsWith("/") ? h.replace(/\/+$/, "") || "/" : "/";
};

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function Link({ to, children, ...props }) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  );
}
