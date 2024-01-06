export function generateBaseUrl(
  { host, port }: { host: string; port?: number },
  path: string,
) {
  let protocol = "https";

  // Check if the host is localhost or starts with 127.0.0
  if (host === "localhost" || /^127\.0\.0\./.test(host)) {
    protocol = "http";
  }

  // Check if the port is provided
  const portString = port ? `:${port}` : "";

  return new URL(path, `${protocol}://${host}${portString}`);
}
