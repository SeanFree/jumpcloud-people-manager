import { IncomingHttpStatusHeader } from "http2";

export default interface DispatchError {
  message: string;
  status: IncomingHttpStatusHeader;
}
