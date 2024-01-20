type Options = Omit<Partial<Request>, "body"> & {
  query?: Record<string, any>;
} & {
  body?: Record<string, any>;
};

export type FetcherResponse<T = unknown> = {
  code: number;
  status: string;
  message?: string;
  data: T;
};

export async function fetcher<T = unknown>(
  path: string,
  options?: Options
): Promise<FetcherResponse<T>> {
  const headers = new Headers(options?.headers);
  const query = new URLSearchParams(options?.query);

  const body = options?.body ? JSON.stringify(options?.body) : undefined;

  if (body) {
    headers.set("Content-Type", "application/json");
  }

  headers.set("Cache-Control", "private max-age=3600");

  // Expires header for indicating when the response expires
  headers.set("Expires", new Date(Date.now() + 3600000).toUTCString());

  // Last-Modified header for indicating the last modification time
  headers.set("Last-Modified", new Date().toUTCString());

  const url = new URL(window.location.origin + path);
  const queryString = query.toString() ? `?${query.toString()}` : url.search;
  const response = await fetch(`${url.pathname}${queryString}`, {
    method: options?.method || "GET",
    credentials: "include",
    headers,
    body,
  });

  const result = hasContentOfType(response.headers, "json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const resultError = {
      ...result,
      code: response.status,
    };
    throw resultError;
  }

  return result;
}

/**
 * Check if content-type JSON
 */
function hasContentOfType(headers: Request["headers"], type: string) {
  return headers.get("content-type")?.includes(type) ?? false;
}
