import axios from "axios";

interface CreateSplunkTypes {
  baseUrl: string;
  token: string;
  constant?: object;
}

interface SendEventSplunkTypes {
  group: string;
  type: string;
  event: object;
}

interface SendBatchEventSplunkTypes {
  group: string;
  type: string;
  events: object[];
}

export const splunk = {
  create: ({ baseUrl, token, constant }: CreateSplunkTypes) => {
    return {
      sendEvent: ({ group, type, event }: SendEventSplunkTypes) => {
        return axios.post(
          `${baseUrl}/services/collector`,
          {
            sourcetype: "_json",
            event: {
              event_group: group,
              event_type: type,
              ...constant,
              ...event,
            },
          },
          {
            headers: {
              Authorization: `Splunk ${token}`,
            },
          }
        );
      },
      sendBatchEvent: ({ group, type, events }: SendBatchEventSplunkTypes) => {
        return axios.post(
          `${baseUrl}/services/collector`,
          events.map((event) => ({
            sourcetype: "_json",
            event: {
              event_group: group,
              event_type: type,
              ...constant,
              ...event,
            },
          })),
          {
            headers: {
              Authorization: `Splunk ${token}`,
            },
          }
        );
      },
    };
  },
};
