const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !url.pathname.split("/").pop()?.includes(".")) {
      const fallbackUrl = new URL(
        url.pathname === "/" ? "/index.html" : `${url.pathname.replace(/\/$/, "")}.html`,
        url,
      );
      response = await env.ASSETS.fetch(new Request(fallbackUrl, request));
    }

    return response;
  },
};

export default worker;
