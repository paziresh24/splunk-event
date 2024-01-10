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
      sendEvent: async ({ group, type, event }: SendEventSplunkTypes) => {
        const response = await fetch(`${baseUrl}/services/collector`, {
          method: "POST",
          headers: {
            Authorization: `Splunk ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourcetype: "_json",
            event: {
              event_group: group,
              event_type: type,
              ...constant,
              ...event,
            },
          }),
        });
        return response.json();
      },
      sendBatchEvent: async ({ group, type, events }: SendBatchEventSplunkTypes) => {
        const response = await fetch(`${baseUrl}/services/collector`, {
          method: "POST",
          headers: {
            Authorization: `Splunk ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            events.map((event) => ({
              sourcetype: "_json",
              event: {
                event_group: group,
                event_type: type,
                ...constant,
                ...event,
              },
            }))
          ),
        });
        return response.json();
      },
    };
  },
};
