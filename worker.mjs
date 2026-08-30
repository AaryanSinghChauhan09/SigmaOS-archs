import html from "./index.html";
import king from "./king.jpeg";
import queen from "./queen.jpeg";
import og from "./og.jpeg";

const IMAGES = { "/king.jpeg": king, "/queen.jpeg": queen, "/og.jpeg": og };

export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/") {
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
        },
      });
    }

    const image = IMAGES[url.pathname];
    if (image) {
      return new Response(image, {
        headers: {
          "content-type": "image/jpeg",
          "cache-control": "public, max-age=86400",
        },
      });
    }

    return Response.redirect(url.origin, 302);
  },
};
