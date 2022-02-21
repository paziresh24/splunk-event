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
    };
  },
};
