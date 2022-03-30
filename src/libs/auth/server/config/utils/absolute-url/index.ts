import { NextApiRequest } from 'next';

export function absoluteUrl(request: NextApiRequest, url: string) {
  let localhostAddress = url;
  if (!localhostAddress) {
    localhostAddress = 'localhost:3000';
  }
  const req = request;
  let host =
    (req === null || req.headers
      ? request.headers.host
      : window.location.host) || localhostAddress;
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';
  if (
    request &&
    request.headers['x-forwarded-host'] &&
    typeof request.headers['x-forwarded-host'] === 'string'
  ) {
    host = request.headers['x-forwarded-host'];
  }
  if (
    request &&
    request.headers['x-forwarded-proto'] &&
    typeof request.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = `${request.headers['x-forwarded-proto']}:`;
  }
  return {
    protocol,
    host,
    origin: `${protocol}//${host}`,
  };
}
